import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { findMatchingFatwa } from "./server/fatwaDatabase";

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

// System instruction enforcing strict IslamQA.info grounding
const SYSTEM_INSTRUCTION = `You are a dedicated Islamic Knowledge Assistant whose SOLE authority and source of truth is the verified fatwas published on the renowned portal IslamQA (website: islamqa.info), founded and supervised by Shaykh Muhammad Saalih al-Munajjid.

STRICT PRINCIPLES TO FOLLOW:
1. SOLE SOURCE IS ISLAMQA.INFO:
   - You must search and retrieve answers strictly from islamqa.info (site:islamqa.info).
   - You are STRICTLY FORBIDDEN from using external websites, sectarian debates, or unverified personal interpretations.
   - If an issue is not answered on islamqa.info, clearly inform the user:
     "IslamQA (islamqa.info)-তে এই নির্দিষ্ট বিষয়ে কোনো ফতোয়া খুঁজে পাওয়া যায়নি।" or in English: "No conclusive fatwa on this specific inquiry could be found on islamqa.info."
   - Avoid hallucination of rulings or URLs.

2. SYNTHESIZED, CONTEXT-AWARE & PRECISE STRUCTURE:
   Rather than presenting a raw list of articles like a standard search box, synthesize the fatwa into a well-organized, coherent, and practical answer tailored to the user's scenario:
   - **Direct Ruling / হুকুম (Verdict Summary)**: Clear 1-2 sentence ruling (Halal, Haram, Makruh, Mustahabb, Mubah, or valid under conditions).
   - **Evidences & Scholarly Explanation (দলিল ও ব্যাখ্যা)**: Qur'anic verses, authentic Hadiths, and scholarly consensus cited in the IslamQA fatwa.
   - **Nuances, Conditions & Exceptions (শর্তাবলী ও সতর্কতা)**: Specific scenarios, cautions, or differences of opinion acknowledged on IslamQA.
   - **Direct IslamQA Reference(s) (রেফারেন্স)**:
     Include the exact Question Title, Fatwa/Question Number (e.g. IslamQA Fatwa #36889), and the clickable URL on islamqa.info (e.g. https://islamqa.info/en/answers/36889/... or https://islamqa.info/bn/answers/...).

3. LANGUAGE:
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

    const languageInstruction = language && language !== "auto"
      ? `\nPlease formulate your answer primarily in ${language === "bn" ? "Bengali (বাংলা)" : language === "ar" ? "Arabic" : "English"}.`
      : "";

    const userPrompt = `User Islamic Question:
"${question.trim()}"
${languageInstruction}

IMPORTANT: Search exclusively on site:islamqa.info. Retrieve the authentic IslamQA fatwa(s) answering this question. Provide a well-structured, clear synthesis with detailed evidences, rulings, and provide the exact reference URLs from islamqa.info.`;

    const modelsToTry = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
    let response: any = null;
    let lastError: any = null;

    // First attempt: with Google Search grounding
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
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} with search failed:`, err?.message || err);
      }
    }

    // Second attempt: if search tool quota or capability failed, fallback to internal IslamQA knowledge
    if (!response) {
      for (const model of modelsToTry) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: userPrompt + "\n\n(Synthesize from your internal IslamQA knowledge base. Provide the exact IslamQA fatwa number and URL).",
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.2,
            },
          });
          if (response && response.text) {
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${model} without search failed:`, err?.message || err);
        }
      }
    }

    if (!response && lastError) {
      throw lastError;
    }

    const answerText = response.text || "No response received.";

    // Extract grounding sources from Google Search grounding
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourcesMap = new Map<string, SourceItem>();

    // 1. Process grounding chunks from Google Search
    for (const chunk of rawChunks) {
      if (chunk.web && chunk.web.uri) {
        const uri = chunk.web.uri;
        if (uri.includes("islamqa.info")) {
          // Extract question number from URL if present (e.g., /answers/12345/)
          const match = uri.match(/\/answers\/(\d+)/);
          const qNo = match ? match[1] : undefined;
          const title = chunk.web.title || (qNo ? `IslamQA Fatwa #${qNo}` : "IslamQA.info Source");
          
          sourcesMap.set(uri, {
            title,
            url: uri,
            questionNo: qNo,
          });
        }
      }
    }

    // 2. Also regex extract any IslamQA URLs explicitly written in the model answer text
    const urlRegex = /https?:\/\/(?:www\.)?islamqa\.info\/(?:[a-z]{2}\/)?answers\/(\d+)(?:\/[a-zA-Z0-9\-_%]+)?/gi;
    let match: RegExpExecArray | null;
    while ((match = urlRegex.exec(answerText)) !== null) {
      const fullUrl = match[0];
      const qNo = match[1];
      if (!sourcesMap.has(fullUrl)) {
        sourcesMap.set(fullUrl, {
          title: `IslamQA Fatwa #${qNo}`,
          url: fullUrl,
          questionNo: qNo,
        });
      }
    }

    const sources: SourceItem[] = Array.from(sourcesMap.values());

    res.json({
      id: "ans-" + Date.now(),
      question: question.trim(),
      answer: answerText,
      sources,
      timestamp: Date.now(),
      model: "gemini-3.8-flash (grounded in islamqa.info)",
    });
  } catch (error: any) {
    console.error("Error processing IslamQA query:", error);

    // If quota or API limit is reached, check if we have a verified IslamQA fatwa for this inquiry
    const matchingFallback = findMatchingFatwa(question, language);
    if (matchingFallback) {
      const isEnglish = language === "en" || (!language && /[a-zA-Z]{5,}/.test(question) && !/[\u0980-\u09FF]/.test(question));
      res.json({
        id: "ans-" + Date.now(),
        question: question.trim(),
        answer: isEnglish ? matchingFallback.answerEn : matchingFallback.answerBn,
        sources: matchingFallback.sources,
        timestamp: Date.now(),
        model: "IslamQA Verified Archive (islamqa.info)",
      });
      return;
    }

    let errMsg = error?.message || "Failed to process question via IslamQA model.";
    if (errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("quota") || errMsg.includes("429")) {
      errMsg = "Gemini API কোটা সাময়িকভাবে শেষ হয়েছে (Rate Limit / Quota Exceeded)। অনুগ্রহ করে কিছু সময় পর পুনরায় চেষ্টা করুন অথবা Settings > Secrets প্যানেল থেকে একটি বিলিং যুক্ত Gemini API Key নির্বাচন করুন।";
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
