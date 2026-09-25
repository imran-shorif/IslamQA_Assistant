import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ComparisonBanner } from "./components/ComparisonBanner";
import { QuestionInput } from "./components/QuestionInput";
import { AnswerCard } from "./components/AnswerCard";
import { SampleTopics } from "./components/SampleTopics";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { QnAResponse, ChatHistoryItem } from "./types";
import { useTheme } from "./hooks/useTheme";
import {
  ShieldCheck,
  BookOpen,
  AlertCircle,
  Loader2,
  ArrowUp,
  MessageSquarePlus,
  Info,
} from "lucide-react";

const STORAGE_KEY = "islamqa_ai_history_v1";

export default function App() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState<"auto" | "bn" | "en" | "ar">("auto");
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QnAResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Listen to window scroll to show/hide FAB
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save history to localStorage
  const saveToHistory = (item: ChatHistoryItem) => {
    try {
      const updated = [item, ...history.filter((h) => h.question !== item.question)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to history:", e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear history:", e);
    }
  };

  const handleDeleteItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not delete history item:", e);
    }
  };

  // Rotating loading status messages
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 3);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAskQuestion = async (customQuestion?: string) => {
    const q = (customQuestion || question).trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: q,
          language,
        }),
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

      // Scroll to answer smoothly
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

  const handleResetHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentResponse(null);
    setQuestion("");
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToInput = () => {
    const inputElement = document.getElementById("islamic-question-input");
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: "smooth", block: "center" });
      inputElement.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const loadingMessages = [
    "১. ইসলামকিউএ (islamqa.info) ডাটাবেজ থেকে সংশ্লিষ্ট ফতোয়া অনুসন্ধান করা হচ্ছে...",
    "২. প্রশ্নটির প্রাসঙ্গিকতা ও শর্তাবলী কুরআন-সুন্নাহর দলিলের সাথে মেলানো হচ্ছে...",
    "৩. আপনার পরিস্থিতির সাথে সামঞ্জস্য রেখে সুনির্দিষ্ট সমাধান সাজানো হচ্ছে...",
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-200">
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onHomeClick={handleResetHome}
        theme={theme}
        resolvedTheme={resolvedTheme}
        onThemeChange={setTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 px-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 text-[11px] sm:text-xs font-semibold mb-3 leading-snug">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>১০০% ইসলামকিউএ (islamqa.info) ওয়েবসাইটের তথ্যের ওপর ভিত্তি করে নির্মিত</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight sm:leading-snug">
            ইসলামিক জিজ্ঞাসা ও ফতোয়া <br className="hidden sm:inline" />
            <span className="text-emerald-700 dark:text-emerald-400">
              যাচাইকৃত সমাধান
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
            আপনার দৈনন্দিন জীবনের যে কোনো ইসলামিক প্রশ্ন করুন। মডেলটি{" "}
            <strong className="text-stone-800 dark:text-stone-100 font-semibold">islamqa.info</strong>{" "}
            এর নির্ভরযোগ্য ফতোয়া থেকে আপনার প্রেক্ষাপট বুঝে গোছানো উত্তর ও সরাসরি রেফারেন্স লিঙ্ক প্রদান করবে।
          </p>
        </section>

        {/* Comparison Feature Banner */}
        <ComparisonBanner />

        {/* Question Input Area */}
        <div className="mb-5 sm:mb-6">
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
          <div className="bg-white dark:bg-stone-900 border border-emerald-200/90 dark:border-emerald-800/70 rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-3.5">
              <Loader2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400 animate-spin" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100 mb-2">
              বিশুদ্ধ সমাধান প্রস্তুত হচ্ছে...
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium max-w-md mx-auto min-h-[22px] transition-all leading-relaxed">
              {loadingMessages[loadingStep]}
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === loadingStep
                      ? "w-8 bg-emerald-600 dark:bg-emerald-500"
                      : idx < loadingStep
                      ? "w-4 bg-emerald-300 dark:bg-emerald-800"
                      : "w-2 bg-stone-200 dark:bg-stone-800"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 text-red-900 dark:text-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-red-800 dark:text-red-300">দুঃখিত, সমস্যা হয়েছে</h4>
              <p className="mt-0.5 text-red-700 dark:text-red-300/90 leading-relaxed">{errorMessage}</p>
              <button
                onClick={() => handleAskQuestion()}
                className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 transition-colors cursor-pointer"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          </div>
        )}

        {/* Active Answer Card */}
        {currentResponse && !isLoading && (
          <div className="mb-6 sm:mb-8">
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

        {/* AI Disclaimer Banner - Displayed on all pages/states at the bottom of content right before footer */}
        <section aria-label="AI Disclaimer" className="mt-8 sm:mt-12 pt-5 border-t border-stone-200/80 dark:border-stone-800">
          <div className="bg-stone-100/70 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 sm:p-4 text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 flex items-start gap-2.5 sm:gap-3 leading-relaxed shadow-xs">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-stone-900 dark:text-stone-100">AI Disclaimer:</strong> This tool is intended for educational and informational purposes only. Its responses are based on content from IslamQA.info and should not be treated as a personal fatwa or a substitute for qualified scholarly guidance. For complex or sensitive matters, please consult a qualified Islamic scholar.
            </p>
          </div>
        </section>
      </main>

      {/* Floating Action Button for Mobile Users when scrolled */}
      {showScrollTop && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            onClick={scrollToInput}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-95 text-white font-medium text-xs shadow-lg transition-all border border-emerald-600/40 cursor-pointer"
            title="নতুন প্রশ্ন লিখুন"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>নতুন প্রশ্ন</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full bg-stone-900/90 dark:bg-stone-800/95 hover:bg-stone-900 dark:hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white flex items-center justify-center shadow-lg transition-all border border-stone-700 cursor-pointer"
            title="পৃষ্ঠার শীর্ষে যান"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-black text-stone-400 dark:text-stone-500 border-t border-stone-800 dark:border-stone-850 py-6 mt-10 sm:mt-12 text-xs pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-stone-300 dark:text-stone-400">
            <a
              href="/"
              onClick={handleResetHome}
              className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition-colors font-semibold group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1 -mx-1"
              title="মূল পাতায় ফিরে যান (Go to Home)"
            >
              <BookOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>IslamQA Assistant</span>
            </a>
            <span>—</span>
            <span className="text-stone-400 dark:text-stone-500">
              Developed by{" "}
              <a
                href="https://www.facebook.com/imran.shorif.shuvo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 dark:text-stone-300 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors font-medium underline sm:no-underline hover:underline"
              >
                Imran Shorif Shuvo
              </a>{" "}
              & Sabbir Ahmed
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-stone-400 dark:text-stone-500 text-[11px]">
            <a
              href="https://islamqa.info"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors underline sm:no-underline"
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
