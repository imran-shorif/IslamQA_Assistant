import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { findMatchingFatwa } from "./server/fatwaDatabase";
import {
  sanitizeAndVerifyAllLinks,
  verifyIslamQAUrl,
  convertBengaliDigitsToEnglish,
  getApprovedPortalInfo,
} from "./server/linkVerifier";
import {
  getPortalsForSelection,
  APPROVED_DOMAINS,
  PortalInfo,
} from "./server/madhhabPortals";

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

function buildSystemInstruction(selectedSources: string[], portals: PortalInfo[]): string {
  const portalBullets = portals
    .map((p) => `- ${p.name}: [${p.url}](${p.url}) (${p.madhhab})`)
    .join("\n");

  return `You are "Search Fatwa", an authoritative, generalized Islamic Knowledge and Fatwa Search Engine.
Your mission is to provide accurate, authentic, scholarly answers by synthesizing rulings from the established, verified Islamic institutions and portals designated for the user's selected school(s) or category.

USER'S SELECTED SOURCE CATEGORIES:
[${selectedSources.join(", ")}]

APPROVED BRAIN PORTALS FOR THIS INQUIRY:
${portalBullets}

CRITICAL RULES:
1. STRICT ADHERENCE TO SELECTED SCHOOL(S) / PORTALS:
   - If Hanafi is selected, synthesize strictly according to the Hanafi school of jurisprudence using Darul Uloom Deoband (darulifta-deoband.com), Hanafi Fiqh BD (alpha.hanafifiqh.net), Jamia Banuri Town (banuri.edu.pk), IQA Ahmadullah (iqa.info), and IslamQA.org (Hanafi section).
   - If Shafi'i is selected, synthesize according to the Shafi'i school using Jordan General Department of Iftaa (aliftaa.jo), ShafiiFiqh.org, and IslamQA.org (Shafi'i section).
   - If Maliki is selected, synthesize according to the Maliki school using BinBayyah.net, Maliki Fiqh Q&A (malikifiqhqa.com), Maliki Madhab (malikimadhab.org), and IslamQA.org (Maliki section).
   - If Hanbali is selected, synthesize according to the Hanbali school using Saudi Presidency of Scholarly Research and Ifta (alifta.gov.sa), Kuwait Ministry of Awqaf (awqaf.gov.kw), Hanbali Fiqh Q&A (hanbalifiqhqa.com), and IslamQA.info.
   - If Salafi is selected, synthesize according to Quran & authentic Sunnah via IslamQA.info, Saudi Al-Ifta, and Islamweb.
   - If Bibidh (Contemporary) is selected, synthesize from IQA (Sheikh Ahmadullah - iqa.info) and Egypt's Dar Al-Ifta (dar-alifta.org - Al-Azhar tradition).
   - If Shia is selected, synthesize according to Shia jurisprudence including classical and primary Zaydi sources: Al-Urwah al-Wuthqa al-Zaydiyyah (alorwahalwuthqa.com), Imam Zaid bin Ali Cultural Foundation (hmml.org/stories/zaydi-manuscripts), and Al-Islam.org digital library.
   - If All is selected, provide a multi-school synthesis explaining the positions of the four Sunni madhhabs (Hanafi, Shafi'i, Maliki, Hanbali) and recognized scholarly sources with citations to their respective portals.

2. MANDATORY SOURCE CITATION & HYPERLINKING IN ANSWER BODY:
   - In the opening or synthesis of your answer, explicitly cite which institution/portal and webpage this ruling is derived from with an active markdown hyperlink.
     Example in Bengali:
     "এই উত্তরটি **[দারুল উলূম দেওবন্দ দারুল ইফতা](https://darulifta-deoband.com/en)** এবং **[হানাফী ফিকহ বিডি](https://alpha.hanafifiqh.net/)**-এর প্রামাণ্য ফতোয়া ও দলিলের আলোকে সংকলন করা হয়েছে।"
     Or for IslamQA:
     "এই উত্তরটি **[IslamQA.info](https://islamqa.info)**-এর ফতোয়া নং [৩৭৭৬১](https://islamqa.info/bn/answers/37761)-এর আলোকে প্রস্তুত করা হয়েছে।"

3. ZERO TOLERANCE FOR HALLUCINATION & REAL WEBPAGE URL REQUIREMENT:
   - Do NOT invent fake rulings, non-existent Hadith attributions, or fabricate broken URLs.
   - Ground every statement strictly in authentic Islamic jurisprudence from the authorized institutions.
   - Provide the specific webpage URL or verified portal link for the source so that the user can immediately click through and verify the ruling's authenticity on the original webpage.

4. STRUCTURE OF ANSWER:
   - **Direct Ruling / মূল হুকুম (Verdict Summary)**: Clear, unambiguous 1-2 sentence ruling (হালাল, হারাম, জায়েজ, না-জায়েজ, মাকরূহ, মুস্তাহাব ইত্যাদি).
   - **Evidences & Jurisprudential Explanation (দলিল ও ব্যাখ্যা)**: Relevant Quranic verses, Sahih Hadiths, and classical manuals (e.g. Radd al-Muhtar, Al-Hidayah, Al-Majmu', Al-Mughni, Al-Mudawwanah).
   - **Nuances & Conditions (শর্তাবলী ও সতর্কতা)**: Practical exceptions or conditional aspects.

5. CLICKABLE REFERENCES SECTION AT THE END:
   - Conclude every response with a dedicated references section containing live hyperlinks:
     ### তথ্যসূত্র ও ফতোয়া রেফারেন্স লিঙ্ক (Verified Sources):
     - [🔗 দারুল উলূম দেওবন্দ দারুল ইফতা](https://darulifta-deoband.com/en)
     - [🔗 হানাফী ফিকহ বিডি](https://alpha.hanafifiqh.net/)

6. LANGUAGE & TONE:
   - Answer in the user's requested language (Bengali if queried in Bengali, English if in English, Arabic if in Arabic, Urdu if in Urdu).
   - Maintain a respectful, humble, and authentic scholarly tone.`;
}

app.post("/api/ask", async (req, res) => {
  const { question = "", language = "bn", sources = ["all"] } = req.body || {};
  const selectedSources: string[] = Array.isArray(sources) && sources.length > 0 ? sources : ["all"];
  const portals = getPortalsForSelection(selectedSources);

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

    // Check if we have pre-verified real fatwas for this inquiry (if IslamQA is among sources)
    const matchingFallback = findMatchingFatwa(question, language);
    const fallbackSources = matchingFallback ? matchingFallback.sources : [];

    const languageInstruction = language
      ? `\nPlease formulate your answer primarily in ${
          language === "bn"
            ? "Bengali (বাংলা)"
            : language === "ar"
            ? "Arabic (العربية الفصحى)"
            : language === "ur"
            ? "Urdu (اردو)"
            : "English"
        }.`
      : "";

    const systemInstruction = buildSystemInstruction(selectedSources, portals);

    const portalsListForPrompt = portals
      .map((p) => `${p.name}: ${p.url}`)
      .join(", ");

    const userPrompt = `User Islamic Question:
"${question.trim()}"
${languageInstruction}

Selected Madhhabs / Source Schools: [${selectedSources.join(", ")}]
Authorized Portals to consult & cite: ${portalsListForPrompt}

Provide a well-structured, clear synthesis with detailed evidences, rulings, and cite authentic fatwa references with hyperlinks from the authorized portals, and conclude with a clickable References section.`;

    // Candidate sources initialized with the authorized portals for the selected school
    const candidateSources: SourceItem[] = portals.map((p) => ({
      title: p.name,
      url: p.url,
      snippet: p.descriptionBn,
    }));

    // Try available models in order of quota resilience
    const modelsToTry = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];
    let response: any = null;
    let lastError: any = null;
    let usedModel = "gemini-3.1-flash-lite";

    // 1. First attempt: with Google Search grounding tool to find live citations
    for (const model of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction,
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
            contents:
              userPrompt +
              "\n\n(Synthesize from your authentic knowledge base of the authorized portals. Do not fabricate 404 links).",
            config: {
              systemInstruction,
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

    // If Gemini API quota exhausted, fall back to our verified archive
    if (!response) {
      if (matchingFallback) {
        const isEnglish =
          language === "en" ||
          (!language && /[a-zA-Z]{5,}/.test(question) && !/[\u0980-\u09FF]/.test(question));

        const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
          isEnglish ? matchingFallback.answerEn : matchingFallback.answerBn,
          [...candidateSources, ...matchingFallback.sources],
          [],
          isEnglish ? "en" : "bn",
          question.trim()
        );

        res.json({
          id: "ans-" + Date.now(),
          question: question.trim(),
          answer: sanitizedMarkdown,
          sources: verifiedSources,
          timestamp: Date.now(),
          model: "Search Fatwa Verified Archive",
          selectedSources,
        });
        return;
      }
      throw lastError || new Error("Failed to process question via Search Fatwa model.");
    }

    const rawAnswerText = response.text || "No response received.";

    // Extract grounding sources from Google Search grounding (if present)
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    for (const chunk of rawChunks) {
      if (chunk.web && chunk.web.uri) {
        const uri = chunk.web.uri;
        const isApproved = APPROVED_DOMAINS.some((d) => uri.includes(d));
        if (isApproved) {
          const match = uri.match(/\/answers\/(\d+)/);
          const qNo = match ? match[1] : undefined;
          candidateSources.push({
            title: chunk.web.title || `Fatwa Reference`,
            url: uri,
            questionNo: qNo,
          });
        }
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

    // Also extract any other approved portal URLs mentioned in text
    for (const domain of APPROVED_DOMAINS) {
      if (domain === "islamqa.info") continue;
      const domainRegex = new RegExp(`https?:\\/\\/(?:[a-zA-Z0-9-_.]+\\.)?${domain.replace(".", "\\.")}[a-zA-Z0-9\\-_/%#?&=.]*`, "gi");
      let dMatch: RegExpExecArray | null;
      while ((dMatch = domainRegex.exec(rawAnswerText)) !== null) {
        const portalInfo = getApprovedPortalInfo(dMatch[0], language);
        candidateSources.push({
          title: portalInfo ? portalInfo.name : domain,
          url: dMatch[0],
        });
      }
    }

    // Also extract any fatwa numbers quoted in text (e.g. ফতোয়া নং ৩৭৭৬১, Fatwa #37761)
    const fatwaNoRegex = /(?:IslamQA\s*)?(?:ফতোয়া|ফতোয়া|fatwa)s?(?:\s*(?:নং|নম্বর|no\.?|number|#))?\s*\**([০-৯0-9]{2,7})\**/gi;
    let fnMatch: RegExpExecArray | null;
    while ((fnMatch = fatwaNoRegex.exec(rawAnswerText)) !== null) {
      const enId = convertBengaliDigitsToEnglish(fnMatch[1]);
      candidateSources.push({
        title: `IslamQA Fatwa #${enId}`,
        url: `https://islamqa.info/answers/${enId}`,
        questionNo: enId,
      });
    }

    // CRITICAL REPAIR STEP:
    // Run all markdown text and candidate sources through real-time verification & hyperlinking
    const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
      rawAnswerText,
      candidateSources,
      fallbackSources,
      language,
      question.trim()
    );

    res.json({
      id: "ans-" + Date.now(),
      question: question.trim(),
      answer: sanitizedMarkdown,
      sources: verifiedSources,
      timestamp: Date.now(),
      model: `${usedModel} (Search Fatwa Engine)`,
      selectedSources,
    });
  } catch (error: any) {
    console.error("Error processing Search Fatwa query:", error);

    // Final emergency fallback check
    const matchingFallback = findMatchingFatwa(question, language);
    if (matchingFallback) {
      const isEnglish =
        language === "en" ||
        (!language && /[a-zA-Z]{5,}/.test(question) && !/[\u0980-\u09FF]/.test(question));
      const { sanitizedMarkdown, verifiedSources } = await sanitizeAndVerifyAllLinks(
        isEnglish ? matchingFallback.answerEn : matchingFallback.answerBn,
        [...portals.map((p) => ({ title: p.name, url: p.url })), ...matchingFallback.sources],
        [],
        isEnglish ? "en" : "bn",
        question.trim()
      );

      res.json({
        id: "ans-" + Date.now(),
        question: question.trim(),
        answer: sanitizedMarkdown,
        sources: verifiedSources,
        timestamp: Date.now(),
        model: "Search Fatwa Knowledge Base",
        selectedSources,
      });
      return;
    }

    let errMsg = error?.message || "Failed to process question via Search Fatwa model.";
    if (errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("quota") || errMsg.includes("429")) {
      errMsg =
        "Gemini API কোটা সাময়িকভাবে শেষ হয়েছে (Rate Limit / Quota Exceeded)। অনুগ্রহ করে কিছুক্ষণ পর পুনরায় চেষ্টা করুন।";
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
