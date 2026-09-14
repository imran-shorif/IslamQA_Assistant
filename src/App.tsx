import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ComparisonBanner } from "./components/ComparisonBanner";
import { QuestionInput } from "./components/QuestionInput";
import { AnswerCard } from "./components/AnswerCard";
import { SampleTopics } from "./components/SampleTopics";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { QnAResponse, ChatHistoryItem } from "./types";
import {
  ShieldCheck,
  Sparkles,
  BookOpen,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const STORAGE_KEY = "islamqa_ai_history_v1";

export default function App() {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState<"auto" | "bn" | "en" | "ar">("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QnAResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load history from localStorage:", e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (item: ChatHistoryItem) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== item.id && h.question !== item.question);
      const updated = [item, ...filtered].slice(0, 30);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to persist history:", e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear history:", e);
    }
  };

  const handleDeleteItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to delete item:", e);
      }
      return updated;
    });
  };

  // Cycling loading steps for transparent user feedback
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAskQuestion = async (explicitQuestion?: string) => {
    const q = (explicitQuestion || question).trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    if (explicitQuestion) {
      setQuestion(explicitQuestion);
    }

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, language }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "ফতোয়া প্রক্রিয়া করতে সমস্যা হয়েছে।");
      }

      const responseObj: QnAResponse = {
        id: data.id || "ans-" + Date.now(),
        question: data.question || q,
        answer: data.answer || "কোনো উত্তর পাওয়া যায়নি।",
        sources: data.sources || [],
        timestamp: data.timestamp || Date.now(),
        model: data.model || "gemini-3.8-flash (grounded in islamqa.info)",
      };

      setCurrentResponse(responseObj);

      // Save to history
      saveToHistory({
        id: responseObj.id,
        question: responseObj.question,
        answer: responseObj.answer,
        sources: responseObj.sources,
        timestamp: responseObj.timestamp,
      });

      // Scroll to answer
      setTimeout(() => {
        const el = document.getElementById(`answer-${responseObj.id}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Ask question error:", err);
      setErrorMessage(
        err.message || "দুঃখিত, সংযোগে ত্রুটি দেখা দিয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadingMessages = [
    "১. ইসলামকিউএ (islamqa.info) ডাটাবেজ থেকে সংশ্লিষ্ট ফতোয়া অনুসন্ধান করা হচ্ছে...",
    "২. প্রশ্নটির প্রাসঙ্গিকতা ও শর্তাবলী কুরআন-সুন্নাহর দলিলের সাথে মেলানো হচ্ছে...",
    "৩. আপনার পরিস্থিতির সাথে সামঞ্জস্য রেখে সুনির্দিষ্ট সমাধান সাজানো হচ্ছে...",
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>১০০% ইসলামকিউএ (islamqa.info) তথ্যের ওপর প্রতিষ্ঠিত</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight sm:leading-snug">
            ইসলামিক জিজ্ঞাসা ও ফতোয়া <br className="hidden sm:inline" />
            <span className="text-emerald-700 underline decoration-emerald-400 decoration-wavy underline-offset-4">
              যাচাইকৃত সমাধান
            </span>
          </h1>

          <p className="mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            আপনার দৈনন্দিন জীবনের যে কোনো ইসলামিক প্রশ্ন করুন। মডেলটি{" "}
            <strong className="text-stone-800 font-semibold">islamqa.info</strong>{" "}
            এর নির্ভরযোগ্য ফতোয়া থেকে আপনার প্রেক্ষাপট বুঝে গোছানো উত্তর ও সরাসরি রেফারেন্স লিঙ্ক প্রদান করবে।
          </p>
        </section>

        {/* Comparison Feature Banner */}
        <ComparisonBanner />

        {/* Sticky/Prominent Input Area */}
        <div className="sticky top-18 z-20 mb-6 drop-shadow-sm">
          <QuestionInput
            question={question}
            onChange={setQuestion}
            onSubmit={(e) => {
              if (e) e.preventDefault();
              handleAskQuestion();
            }}
            isLoading={isLoading}
            onClear={() => setQuestion("")}
          />
        </div>

        {/* Loading State with scholarly steps */}
        {isLoading && (
          <div className="bg-white border border-emerald-200/90 rounded-2xl p-6 sm:p-8 mb-8 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-6 h-6 text-emerald-700 animate-spin" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-800 mb-2">
              বিশুদ্ধ সমাধান প্রস্তুত হচ্ছে...
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 font-medium max-w-md mx-auto min-h-[22px] transition-all">
              {loadingMessages[loadingStep]}
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === loadingStep
                      ? "w-8 bg-emerald-600"
                      : idx < loadingStep
                      ? "w-4 bg-emerald-300"
                      : "w-2 bg-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 mb-6 text-red-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-red-800">দুঃখিত, সমস্যা হয়েছে</h4>
              <p className="mt-0.5 text-red-700">{errorMessage}</p>
              <button
                onClick={() => handleAskQuestion()}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          </div>
        )}

        {/* Active Answer Card */}
        {currentResponse && !isLoading && (
          <div className="mb-8">
            <AnswerCard data={currentResponse} />
          </div>
        )}

        {/* Sample Topics & Questions */}
        <SampleTopics
          onSelectQuestion={(qText) => {
            setQuestion(qText);
            handleAskQuestion(qText);
          }}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-6 mt-12 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">IslamQA Assistant</span>
            <span>—</span>
            <span>Grounded exclusively in islamqa.info</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <a
              href="https://islamqa.info"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Visit islamqa.info ↗
            </a>
            <span>•</span>
            <span>Supervised by Shaykh Muhammad Saalih al-Munajjid</span>
          </div>
        </div>
      </footer>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={(item) => {
          setCurrentResponse({
            id: item.id,
            question: item.question,
            answer: item.answer,
            sources: item.sources,
            timestamp: item.timestamp,
            model: "gemini-3.8-flash (grounded in islamqa.info)",
          });
          setQuestion(item.question);
        }}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}
