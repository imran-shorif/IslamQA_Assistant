import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ComparisonBanner } from "./components/ComparisonBanner";
import { QuestionInput } from "./components/QuestionInput";
import { AnswerCard } from "./components/AnswerCard";
import { SampleTopics } from "./components/SampleTopics";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { SupportPage } from "./components/SupportPage";
import { AboutPage } from "./components/AboutPage";
import { ReferencePage } from "./components/ReferencePage";
import { AuthModal } from "./components/AuthModal";
import { VisitorCounter } from "./components/VisitorCounter";
import { QnAResponse, ChatHistoryItem, MadhhabCategory } from "./types";
import { useTheme } from "./hooks/useTheme";
import { translations, Language } from "./data/translations";
import { useAuth } from "./context/AuthContext";
import {
  saveHistoryItemToFirestore,
  fetchUserHistoryFromFirestore,
  deleteHistoryItemFromFirestore,
  clearUserHistoryFromFirestore,
} from "./lib/firestoreHistory";
import {
  ShieldCheck,
  BookOpen,
  AlertCircle,
  Loader2,
  ArrowUp,
  MessageSquarePlus,
  Info,
  Heart,
} from "lucide-react";

const STORAGE_KEY = "islamqa_ai_history_v1";
const LANG_STORAGE_KEY = "islamqa_language_pref";
const PREV_LANG_STORAGE_KEY = "islamqa_prev_resolved_language";

export default function App() {
  const { currentUser } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [currentView, setCurrentView] = useState<"home" | "support" | "about" | "reference">(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === "#about" || path === "/about") return "about";
      if (hash === "#support" || path === "/support") return "support";
      if (hash === "#reference" || path === "/reference") return "reference";
    }
    return "home";
  });
  const [question, setQuestion] = useState("");
  const [selectedSources, setSelectedSources] = useState<MadhhabCategory[]>(["all"]);

  // Language setting: bn | en | ar | ur
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (saved === "bn" || saved === "en" || saved === "ar" || saved === "ur") {
        return saved;
      }
    }
    return "bn"; // Default base language is Bengali
  });

  // Keep document language and direction (RTL for Arabic and Urdu) in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" || language === "ur" ? "rtl" : "ltr";
    }
  }, [language]);

  const resolvedLanguage: Language = language;

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (e) {
      console.warn("Could not save language to localStorage:", e);
    }
  };

  const t = translations[language] || translations.bn;

  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<QnAResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | "forgot">("login");

  // Sync hash/URL with currentView
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === "#about" || path === "/about") {
        setCurrentView("about");
      } else if (hash === "#support" || path === "/support") {
        setCurrentView("support");
      } else if (hash === "#reference" || path === "/reference") {
        setCurrentView("reference");
      } else {
        setCurrentView("home");
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Initial load history from localStorage
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

  // Sync history with Firestore when user logs in
  useEffect(() => {
    let isCancelled = false;
    async function syncFirestoreHistory() {
      if (!currentUser) return;
      try {
        const cloudItems = await fetchUserHistoryFromFirestore(currentUser.uid);
        if (isCancelled) return;

        if (cloudItems && cloudItems.length > 0) {
          setHistory((prev) => {
            const map = new Map<string, ChatHistoryItem>();
            cloudItems.forEach((ci) => map.set(ci.id, ci));
            prev.forEach((pi) => {
              if (!map.has(pi.id)) {
                map.set(pi.id, pi);
                // Also persist unsynced local search to cloud
                saveHistoryItemToFirestore(currentUser.uid, pi, resolvedLanguage).catch(() => {});
              }
            });
            const merged = Array.from(map.values())
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 50);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        } else {
          // Cloud empty; back-populate from current local history
          history.forEach((h) => {
            saveHistoryItemToFirestore(currentUser.uid, h, resolvedLanguage).catch(() => {});
          });
        }
      } catch (err) {
        console.warn("Could not sync history with Firestore:", err);
      }
    }

    syncFirestoreHistory();
    return () => {
      isCancelled = true;
    };
  }, [currentUser]);

  // Listen to window scroll to show/hide FAB
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save history to localStorage and Firestore
  const saveToHistory = (item: ChatHistoryItem) => {
    try {
      const updated = [item, ...history.filter((h) => h.question !== item.question)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (currentUser) {
        saveHistoryItemToFirestore(currentUser.uid, item, resolvedLanguage).catch((e) => {
          console.warn("Could not save history to Firestore:", e);
        });
      }
    } catch (e) {
      console.warn("Could not save to history:", e);
    }
  };

  const handleClearHistory = () => {
    const ids = history.map((h) => h.id);
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (currentUser && ids.length > 0) {
        clearUserHistoryFromFirestore(currentUser.uid, ids).catch(() => {});
      }
    } catch (e) {
      console.warn("Could not clear history:", e);
    }
  };

  const handleDeleteItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (currentUser) {
        deleteHistoryItemFromFirestore(currentUser.uid, id).catch(() => {});
      }
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
          language: resolvedLanguage,
          sources: selectedSources,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        let defaultErr = "ফতোয়া প্রক্রিয়া করতে সমস্যা হয়েছে।";
        if (language === "en") defaultErr = "Failed to process query.";
        else if (language === "ar") defaultErr = "فشل في معالجة الاستفسار.";
        else if (language === "ur") defaultErr = "فتویٰ حاصل کرنے میں دشواری پیش آئی۔";
        throw new Error(data.error || defaultErr);
      }

      const responseObj: QnAResponse = {
        id: data.id || "ans-" + Date.now(),
        question: data.question || q,
        answer:
          data.answer ||
          (language === "en"
            ? "No answer found."
            : language === "ar"
            ? "لم يتم العثور على إجابة."
            : language === "ur"
            ? "کوئی جواب نہیں مل سکا۔"
            : "কোনো উত্তর পাওয়া যায়নি।"),
        sources: data.sources || [],
        timestamp: data.timestamp || Date.now(),
        model: data.model || "gemini-3.8-flash (Search Fatwa Engine)",
        selectedSources: data.selectedSources || selectedSources,
      };

      setCurrentResponse(responseObj);

      // Save to history
      saveToHistory({
        id: responseObj.id,
        question: responseObj.question,
        answer: responseObj.answer,
        sources: responseObj.sources,
        timestamp: responseObj.timestamp,
        selectedSources: responseObj.selectedSources,
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
      let defaultConnectionErr = "দুঃখিত, সংযোগে ত্রুটি দেখা দিয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
      if (language === "en") defaultConnectionErr = "Sorry, connection error occurred. Please try again later.";
      else if (language === "ar") defaultConnectionErr = "عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.";
      else if (language === "ur") defaultConnectionErr = "معذرت، رابطہ منقطع ہو گیا۔ کچھ دیر بعد دوبارہ کوشش کریں۔";

      setErrorMessage(err.message || defaultConnectionErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetHome = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentView("home");
    window.history.pushState(null, "", "/");
    setCurrentResponse(null);
    setQuestion("");
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToSupport = () => {
    setCurrentView("support");
    window.history.pushState(null, "", "#support");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToAbout = () => {
    setCurrentView("about");
    window.history.pushState(null, "", "#about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToReference = () => {
    setCurrentView("reference");
    window.history.pushState(null, "", "#reference");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectSample = (sampleQuestion: string) => {
    setQuestion(sampleQuestion);
    handleAskQuestion(sampleQuestion);
  };

  const handleNewQuestion = () => {
    setQuestion("");
    setCurrentResponse(null);
    setErrorMessage(null);
    const inputElement = document.getElementById("islamic-question-input");
    if (inputElement) {
      inputElement.focus();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTop = () => {
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

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-emerald-100 dark:selection:bg-emerald-950 selection:text-emerald-900 dark:selection:text-emerald-200 transition-colors duration-200">
      {/* Top Header */}
      <Header
        language={language}
        resolvedLanguage={resolvedLanguage}
        onLanguageChange={handleLanguageChange}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onHomeClick={handleResetHome}
        theme={theme}
        resolvedTheme={resolvedTheme}
        onThemeChange={setTheme}
        currentView={currentView}
        onSupportClick={handleNavigateToSupport}
        onAboutClick={handleNavigateToAbout}
        onReferenceClick={handleNavigateToReference}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-2.5 sm:px-6 py-2.5 sm:py-8 flex flex-col">
        {currentView === "about" ? (
          <AboutPage
            onBackToHome={handleResetHome}
            onNavigateToSupport={handleNavigateToSupport}
            language={resolvedLanguage}
          />
        ) : currentView === "support" ? (
          <SupportPage
            onBackToHome={handleResetHome}
            language={resolvedLanguage}
          />
        ) : currentView === "reference" ? (
          <ReferencePage
            onBackToHome={handleResetHome}
            language={resolvedLanguage}
          />
        ) : (
          <>
            {/* Hero Section - Compact on mobile so search input is right at the top */}
            <section className="text-center max-w-3xl mx-auto mb-2 sm:mb-6 px-1">
              {/* Official Brand Emblem */}
              <div className="flex items-center justify-center mb-2">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500/40 via-emerald-500/25 to-amber-500/40 blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="/official-logo.jpg"
                    alt="Search Fatwa Official Logo"
                    className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl shadow-md border-2 border-amber-400/60 object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-1.5 sm:mb-3.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 text-[10px] sm:text-xs font-semibold leading-snug">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{t.heroBadge}</span>
                </div>
                <VisitorCounter language={resolvedLanguage} variant="hero" />
              </div>

              <h1 className="text-xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight sm:leading-snug">
                {t.heroHeading1} <br className="hidden sm:inline" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  {t.heroHeadingHighlight}
                </span>
              </h1>

              <p className="mt-1 sm:mt-2 text-[11px] sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto line-clamp-2 sm:line-clamp-none">
                {t.heroDescPre}
                <strong className="text-stone-800 dark:text-stone-100 font-semibold">
                  {t.heroDescBold}
                </strong>
                {t.heroDescPost}
              </p>
            </section>

            {/* Comparison Feature Banner */}
            <ComparisonBanner language={resolvedLanguage} />

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
                language={resolvedLanguage}
                selectedSources={selectedSources}
                onSourcesChange={setSelectedSources}
              />
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="my-6 p-6 sm:p-8 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-850 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 animate-spin"></div>
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 absolute inset-0 m-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-stone-850 dark:text-stone-100">
                  {t.loadingTitle}
                </h3>
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 mt-2 max-w-md min-h-[40px] flex items-center justify-center transition-all duration-300">
                  {t.loadingSteps[loadingStep]}
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="my-5 p-4 sm:p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-850 rounded-2xl flex items-start gap-3.5 text-red-850 dark:text-red-200 shadow-xs">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
                    {t.errorTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-red-750 dark:text-red-300 mt-0.5 leading-relaxed">
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => handleAskQuestion()}
                    className="mt-3 text-xs font-semibold text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-900 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.errorRetry}
                  </button>
                </div>
              </div>
            )}

            {/* Answer Display */}
            {currentResponse && !isLoading && (
              <div className="mb-8">
                <AnswerCard
                  data={currentResponse}
                  language={resolvedLanguage}
                />
              </div>
            )}

            {/* Sample Suggested Topics */}
            {!currentResponse && !isLoading && (
              <div className="mt-2 mb-8">
                <SampleTopics
                  onSelectQuestion={handleSelectSample}
                  isLoading={isLoading}
                  language={resolvedLanguage}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        {/* Floating "New Question" FAB */}
        {currentResponse && !isLoading && (
          <button
            onClick={scrollToInput}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all text-xs sm:text-sm font-semibold cursor-pointer border border-blue-500/40"
            title={t.floatingNewQuestion}
            aria-label={t.floatingNewQuestion}
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span className="hidden sm:inline">{t.floatingNewQuestion}</span>
          </button>
        )}

        {/* Scroll To Top FAB */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-stone-850 hover:bg-stone-750 text-stone-200 hover:text-white shadow-lg active:scale-95 transition-all flex items-center justify-center border border-stone-700/60 cursor-pointer"
            title={t.floatingScrollTop}
            aria-label={t.floatingScrollTop}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-850 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xs py-5 px-4 text-center text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="leading-relaxed">
            <span className="font-semibold text-stone-600 dark:text-stone-300 mr-1">{t.aiDisclaimerTitle}</span>
            {t.aiDisclaimerText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-stone-400 dark:text-stone-500">
            <button
              onClick={handleNavigateToAbout}
              className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
              title={t.aboutTitle}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{t.aboutBtn}</span>
            </button>
            <span>•</span>
            <button
              onClick={handleNavigateToReference}
              className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline font-medium cursor-pointer"
              title={t.referenceTitle}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.referenceBtn}</span>
            </button>
            <span>•</span>
            <button
              onClick={handleNavigateToSupport}
              className="inline-flex items-center gap-1.5 text-pink-500 hover:text-pink-400 transition-colors font-semibold cursor-pointer"
              title={t.supportTitle}
            >
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>{t.supportBtn}</span>
            </button>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <img
                src="/official-logo.jpg"
                alt="Search Fatwa"
                className="w-4 h-4 rounded-sm border border-amber-500/40 object-cover inline-block"
              />
              <span>Search Fatwa · {resolvedLanguage === "en" ? "Universal Islamic Knowledge Platform" : "সার্বজনীন ইসলামিক ফতোয়া ও জ্ঞান প্ল্যাটফর্ম"}</span>
            </span>
          </div>

          <div className="pt-1 flex items-center justify-center">
            <VisitorCounter language={resolvedLanguage} variant="footer" />
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
            model: "Search Fatwa Knowledge Engine",
          });
          setQuestion(item.question);
        }}
        onClearHistory={handleClearHistory}
        onDeleteItem={handleDeleteItem}
        language={resolvedLanguage}
        onOpenAuthModal={() => {
          setAuthModalMode("login");
          setIsAuthModalOpen(true);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={resolvedLanguage}
        initialMode={authModalMode}
      />
    </div>
  );
}
