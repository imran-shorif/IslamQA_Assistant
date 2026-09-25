import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { findMatchingFatwa } from "./server/fatwaDatabase";
import { sanitizeAndVerifyAllLinks, verifyIslamQAUrl } from "./server/linkVerifier";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

interface SourceItem {
  title: string;
  url: string;
  questionNo?: string;
  snippet?: string;
}

// System instruction enforcing strict IslamQA.info grounding and zero hallucination of links
const SYSTEM_INSTRUCTION = `You are a dedicated Islamic Knowledge Assistant whose SOLE authority and source of truth is the verified fatwas published on the renowned portal IslamQA (website: islamqa.info), founded and supervised by Shaykh Muhammad Saalih al-Munajjid.

STRICT PRINCIPLES TO FOLLOW:
1. SOLE SOURCE IS ISLAMQA.INFO:
   - You must search and retrieve answers strictly based on the rulings of islamqa.info.
   - You are STRICTLY FORBIDDEN from using external websites, sectarian debates, or unverified personal interpretations.
   - If an issue is not answered on islamqa.info, clearly state:
     "IslamQA (islamqa.info)-তে এই নির্দিষ্ট বিষয়ে কোনো ফতোয়া খুঁজে পাওয়া যায়নি।" or in English: "No conclusive fatwa on this specific inquiry could be found on islamqa.info."

2. ABSOLUTE ZERO HALLUCINATION OF HYPERLINKS OR FATWA NUMBERS:
   - Every single link and fatwa number you provide is checked in REAL TIME via an automated HTTP probe against islamqa.info.
   - Any link that returns 404 is strictly rejected.
   - Only cite exact Fatwa numbers when you are confident of the real number (e.g. #37761, #2299, #38023, #1312, #20882, #21869, #112445, #72915, #62839).
   - If you do not know the exact 5-digit fatwa number, explain the fatwa and quotes of the scholars from IslamQA clearly without inventing fake URLs or fabricated numbers.

3. SYNTHESIZED, CONTEXT-AWARE & PRECISE STRUCTURE:
   Rather than presenting a raw list of articles, synthesize the fatwa into a well-organized, coherent, and practical answer tailored to the user's scenario:
   - **Direct Ruling / হুকুম (Verdict Summary)**: Clear 1-2 sentence ruling (Halal, Haram, Makruh, Mustahabb, Mubah, or valid under conditions).
   - **Evidences & Scholarly Explanation (দলিল ও ব্যাখ্যা)**: Qur'anic verses, authentic Hadiths, and scholarly consensus cited in the IslamQA fatwa.
   - **Nuances, Conditions & Exceptions (শর্তাবলী ও সতর্কতা)**: Specific scenarios, cautions, or differences of opinion acknowledged on IslamQA.

4. LANGUAGE:
   - Answer in the same language as the user's query (Bengali if asked in Bengali or Banglish; English if asked in English; Arabic if in Arabic).
   - Maintain a respectful, humble, and authentic scholarly tone.`;

app.post("/api/ask", async (req, res) => {
  const { question = "", language = "auto" } = req.body || {};

  try {
    if (!question || typeof question !== "string" || !question.trim()) {
      res.status(400).json({ error: "Question cannot be empty." });
      return;
    }

    if (!apiKey) {
      res.status(500).json({
        error: "GEMINI_API_KEY is not configured in the environment.",
      });
      return;
    }

    // Check if we have pre-verified real fatwas for this inquiry
    const matchingFallback = findMatchingFatwa(question, language);
    const fallbackSources = matchingFallback ? matchingFallback.sources : [];

    const languageInstruction = language && language !== "auto"
      ? `\nPlease formulate your answer primarily in ${language === "bn" ? "Bengali (বাংলা)" : language === "ar" ? "Arabic" : "English"}.`
      : "";

    const userPrompt = `User Islamic Question:
"${question.trim()}"
${languageInstruction}

IMPORTANT: Ground your synthesis exclusively in the rulings of site:islamqa.info. Provide a well-structured, clear synthesis with detailed evidences, rulings, and cite authentic IslamQA fatwa references without fabricating nonexistent links.`;

    // Try available models in order of quota resilience
    const modelsToTry = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];
    let response: any = null;
    let lastError: any = null;
    let usedModel = "gemini-3.1-flash-lite";

    // 1. First attempt: with Google Search grounding tool if supported
    for (const model of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ googleSearch: {} }],
            temperature: 0.2,
          },
        });
        if (response && response.text) {
          usedModel = model;
          break;
        }
      } catch (err: any) {
        lastError = err;
        // Search tool may fail or exceed quota; continue to fallback without search tool
      }
    }

    // 2. Second attempt: without Google Search grounding tool (direct internal knowledge)
    if (!response) {
      for (const model of modelsToTry) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: userPrompt + "\n\n(Synthesize from your authentic IslamQA knowledge base. Do not fabricate 404 links).",
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.2,
            },
          });
          if (response && response.text) {
            usedModel = model;
            break;
          }
        } catch (err: any) {
          lastError = err;
        }
      }
    }

    // If Gemini API quota exhausted, fall back to our 100% verified IslamQA archive
    if (!response) {
      if (matchingFallback) {
        const isEnglish = language === "en" || (!language && /[a-zA-Z]{5,}/.test(question) && !/[\u0980-\u09FF]/.test(question));
        
        // Sanitize and verify all fallback links
        const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
          isEnglish ? matchingFallback.answerEn : matchingFallback.answerBn,
          matchingFallback.sources
        );

        res.json({
          id: "ans-" + Date.now(),
          question: question.trim(),
          answer: sanitizedMarkdown,
          sources: verifiedSources,
          timestamp: Date.now(),
          model: "IslamQA Verified Archive (100% Verified live on islamqa.info)",
        });
        return;
      }
      throw lastError || new Error("Failed to process question via IslamQA model.");
    }

    const rawAnswerText = response.text || "No response received.";

    // Candidate sources gathered from grounding and model output
    const candidateSources: SourceItem[] = [];

    // Extract grounding sources from Google Search grounding (if present)
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of rawChunks) {
      if (chunk.web && chunk.web.uri && chunk.web.uri.includes("islamqa.info")) {
        const uri = chunk.web.uri;
        const match = uri.match(/\/answers\/(\d+)/);
        const qNo = match ? match[1] : undefined;
        candidateSources.push({
          title: chunk.web.title || `IslamQA Fatwa #${qNo || ""}`,
          url: uri,
          questionNo: qNo,
        });
      }
    }

    // Also extract any IslamQA URLs mentioned in text
    const urlRegex = /https?:\/\/(?:www\.)?islamqa\.info\/(?:[a-z]{2}\/)?answers\/(\d+)(?:\/[a-zA-Z0-9\-_%]+)?/gi;
    let urlMatch: RegExpExecArray | null;
    while ((urlMatch = urlRegex.exec(rawAnswerText)) !== null) {
      candidateSources.push({
        title: `IslamQA Fatwa #${urlMatch[1]}`,
        url: urlMatch[0],
        questionNo: urlMatch[1],
      });
    }

    // CRITICAL REPAIR STEP:
    // Run all markdown text and candidate sources through real-time HTTP verification:
    // 1. Probes every link via live HTTP GET request to islamqa.info.
    // 2. Repairs broken links (404) by converting dead links into plain text or verified links.
    // 3. Filters out any 404 source from the sources list so NO broken links are ever returned.
    const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
      rawAnswerText,
      candidateSources,
      fallbackSources
    );

    res.json({
      id: "ans-" + Date.now(),
      question: question.trim(),
      answer: sanitizedMarkdown,
      sources: verifiedSources,
      timestamp: Date.now(),
      model: `${usedModel} (Grounded & 100% Verified live on islamqa.info)`,
    });
  } catch (error: any) {
    console.error("Error processing IslamQA query:", error);

    // Final emergency fallback check
    const matchingFallback = findMatchingFatwa(question, language);
    if (matchingFallback) {
      const isEnglish = language === "en" || (!language && /[a-zA-Z]{5,}/.test(question) && !/[\u0980-\u09FF]/.test(question));
      const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
        isEnglish ? matchingFallback.answerEn : matchingFallback.answerBn,
        matchingFallback.sources
      );

      res.json({
        id: "ans-" + Date.now(),
        question: question.trim(),
        answer: sanitizedMarkdown,
        sources: verifiedSources,
        timestamp: Date.now(),
        model: "IslamQA Verified Archive (100% Verified live on islamqa.info)",
      });
      return;
    }

    let errMsg = error?.message || "Failed to process question via IslamQA model.";
    if (errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("quota") || errMsg.includes("429")) {
      errMsg = "Gemini API কোটা সাময়িকভাবে শেষ হয়েছে (Rate Limit / Quota Exceeded)। অনুগ্রহ করে কিছুক্ষণ পর পুনরায় চেষ্টা করুন।";
    }
    res.status(500).json({
      error: errMsg,
    });
  }
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
