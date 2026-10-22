import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Loader2,
  Trash2,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Compass,
  Cpu,
  GraduationCap,
  Scale,
  Zap,
  BookOpen,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Language, translations } from "../data/translations";
import { MADHHAB_CHRONOLOGY, MadhhabCategory } from "../types";

export type ChatbotRole = "scholar" | "tutor" | "comparative" | "quick";
export type GeminiModelType = "gemini-3.8-flash" | "gemini-3.1-flash-lite" | "gemini-4-argon";

export interface ChatMessageItem {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  modelUsed?: string;
  sources?: Array<{ title: string; url: string; questionNo?: string }>;
}

interface ChatbotViewProps {
  onBackToHome: () => void;
  language: Language;
  selectedSources: MadhhabCategory[];
  onSourcesChange: (sources: MadhhabCategory[]) => void;
}

const ROLES_META: Record<
  ChatbotRole,
  {
    nameBn: string;
    nameEn: string;
    nameAr: string;
    nameUr: string;
    descBn: string;
    descEn: string;
    icon: typeof GraduationCap;
    color: string;
  }
> = {
  scholar: {
    nameBn: "প্রধান মুফতী ও ফিকহ গবেষক",
    nameEn: "Senior Mufti & Fiqh Scholar",
    nameAr: "مفتي وباحث فقهي معتمد",
    nameUr: "سینئر مفتی و فقہی محقق",
    descBn: "প্রামাণ্য দলিল, হাদীস ও কিতাবের আলোকে গভীর ফতোয়া ভিত্তিক বিশ্লেষণ",
    descEn: "Rigorous scholarly rulings with Quran, Sunnah & classical texts",
    icon: GraduationCap,
    color: "emerald",
  },
  tutor: {
    nameBn: "ইসলামিক শিক্ষা ও আদব শিক্ষক",
    nameEn: "Islamic Knowledge & Adab Tutor",
    nameAr: "معلم وموجه إسلامي",
    nameUr: "اسلامی تعلیم و آداب کا استاد",
    descBn: "দৈনন্দিন আমল, আদব ও জীবনঘনিষ্ঠ সহজ ও অনুপ্রেরণামূলক শিক্ষা",
    descEn: "Gentle, educational guidance for daily worship & character",
    icon: BookOpen,
    color: "blue",
  },
  comparative: {
    nameBn: "তুলনামূলক মাযহাব গবেষক",
    nameEn: "Comparative Madhhab Analyst",
    nameAr: "مقارن المذاهب الفقهية",
    nameUr: "تقابلی فقہی تجزیہ نگار",
    descBn: "চার মাযহাবের ইখতিলাফ ও প্রমাণের ভিত্তি সম্বলিত নিরপেক্ষ তুলনামূলক আলোচনা",
    descEn: "Explains differences across 4 Sunni schools with their respective Usul",
    icon: Scale,
    color: "purple",
  },
  quick: {
    nameBn: "দ্রুত মাসআলা সহকারী",
    nameEn: "Fast Mas'ala Advisor",
    nameAr: "مستشار المسائل السريعة",
    nameUr: "فوری مسائل کا مشیر",
    descBn: "সংক্ষিপ্ত ও সরাসরি হালাল/হারাম/জায়েজ হুকুম ও প্রধান শর্ত",
    descEn: "Rapid, direct 1-2 sentence rulings for immediate clarity",
    icon: Zap,
    color: "amber",
  },
};

const MODELS_META: Record<
  GeminiModelType,
  { label: string; badge: string; descBn: string; descEn: string }
> = {
  "gemini-3.8-flash": {
    label: "Gemini 3.8 Flash",
    badge: "ভারসাম্যপূর্ণ (General)",
    descBn: "সাধারণ ফতোয়া ও আলোচনার জন্য সেরা ও নিখুঁত",
    descEn: "Optimal for general Q&A with deep reasoning & speed",
  },
  "gemini-3.1-flash-lite": {
    label: "Gemini 3.1 Flash-Lite",
    badge: "দ্রুততম (Fast)",
    descBn: "তাৎক্ষণিক ও দ্রুত মাসআলা জানার জন্য উপযোগী",
    descEn: "High-throughput and ultra-fast for quick inquiries",
  },
  "gemini-4-argon": {
    label: "Gemini 4 Argon",
    badge: "গভীর গবেষণা (Complex)",
    descBn: "জটিল ও তুলনামূলক ফিকহী গবেষণা এবং বিস্তারিত দলিলের জন্য",
    descEn: "Maximum reasoning depth for complex jurisprudential topics",
  },
};

const STARTER_QUESTIONS: Record<Language, string[]> = {
  bn: [
    "রোজা অবস্থায় ইনজেকশন বা স্যালাইন নিলে কি রোজা ভাঙ্গে?",
    "ভ্রমণে কত কিলোমিটার গেলে নামায কসর করতে হয়?",
    "শেয়ার বাজারে বিনিয়োগ করার শরয়ী বিধান কী?",
    "নামাযে সূরা ফাতিহার পর কোন সূরা পড়লে ভালো?",
  ],
  en: [
    "Does taking an injection break one's fast?",
    "At what travel distance does Qasr (shortening prayer) apply?",
    "What are the Islamic conditions for investing in stocks?",
    "Can you explain the rulings of Zakat on jewelry?",
  ],
  ar: [
    "هل الحقن الوريدية تفسد الصوم؟",
    "ما هي المسافة المعتبرة لقصر الصلاة في السفر؟",
    "ما حكم الاستثمار في الأسهم وفق الضوابط الشرعية؟",
    "ما هي شروط وجوب الزكاة في الذهب المستعمل؟",
  ],
  ur: [
    "کیا روزے کی حالت میں انجیکشن لگانے سے روزہ ٹوٹ جاتا ہے؟",
    "سفر میں کتنے کلومیٹر کے فاصلے پر قصر نماز پڑھنی چاہیے؟",
    "اسٹاک مارکیٹ میں سرمایہ کاری کے شرعی احکام کیا ہیں؟",
    "زیورات پر زکوٰۃ کا کیا حکم ہے؟",
  ],
};

export const ChatbotView: React.FC<ChatbotViewProps> = ({
  onBackToHome,
  language,
  selectedSources,
  onSourcesChange,
}) => {
  const t = translations[language] || translations.bn;
  const [selectedRole, setSelectedRole] = useState<ChatbotRole>("scholar");
  const [selectedModel, setSelectedModel] = useState<GeminiModelType>("gemini-3.8-flash");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Storage key for persistent chat session
  const STORAGE_KEY = "search_fatwa_chat_history";

  const getInitialMessages = (): ChatMessageItem[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Ignore sessionStorage error
    }

    const welcomeGreeting =
      language === "bn"
        ? `আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ! আমি **Search Fatwa AI চ্যাটবট**। আপনার যেকোনো ইসলামিক প্রশ্ন, মাসআলা বা ফিকহী জিজ্ঞাসা করুন। নির্বাচিত মাযহাব ও নির্ভরযোগ্য রেফারেন্সের আলোকে আমি ধাপে ধাপে আপনার সাথে কথা বলতে প্রস্তুত।`
        : language === "ar"
        ? `السلام عليكم ورحمة الله وبركاته! أنا مساعد **سيرش فتاوى الذكي**. تفضل بطرح أي سؤال شرعي أو فقهي، وسأجيبك بتوثيق مباشر مستنداً إلى مصادر المذهب المعتمد.`
        : language === "ur"
        ? `السلام علیکم ورحمۃ اللہ وبرکاتہ! میں **سرچ فتاویٰ اے آئی چیٹ بوٹ** ہوں۔ آپ اسلامی مسائل و احکام سے متعلق جو چاہیں پوچھ سکتے ہیں۔ میں تسلی بخش جواب فراہم کرنے کے لیے حاضر ہوں۔`
        : `Assalamu Alaikum wa Rahmatullah! I am the **Search Fatwa AI Chatbot**. Ask any Islamic question or fiqh inquiry, and I will assist you with multi-turn conversation grounded in verified sources.`;

    return [
      {
        id: "welcome-msg",
        role: "model",
        text: welcomeGreeting,
        timestamp: Date.now(),
        modelUsed: "gemini-3.8-flash",
      },
    ];
  };

  const [messages, setMessages] = useState<ChatMessageItem[]>(getInitialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Save messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      // Ignore quota error
    }
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputText]);

  const handleClearChat = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    const welcome = getInitialMessages();
    setMessages(welcome);
    setErrorMessage(null);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const raw = (textToSend || inputText).trim();
    if (!raw || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessageItem = {
      id: "usr-" + Date.now(),
      role: "user",
      text: raw,
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText("");
    setIsLoading(true);

    // Map conversation history for server multi-turn API
    const historyPayload = nextMessages.map((m) => ({
      role: m.role,
      text: m.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          model: selectedModel,
          role: selectedRole,
          sources: selectedSources,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get response from AI Chatbot");
      }

      const botMsg: ChatMessageItem = {
        id: data.id || "bot-" + Date.now(),
        role: "model",
        text: data.reply || "No answer received.",
        timestamp: data.timestamp || Date.now(),
        modelUsed: data.modelUsed || selectedModel,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const roleMeta = ROLES_META[selectedRole];
  const RoleIcon = roleMeta.icon;

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    return (
      <div className="space-y-2 leading-relaxed text-sm">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Headings
          if (trimmed.startsWith("### ")) {
            return (
              <h4 key={idx} className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base mt-3 mb-1 text-emerald-700 dark:text-emerald-400">
                {renderFormattedInline(trimmed.replace(/^###\s+/, ""))}
              </h4>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h3 key={idx} className="font-extrabold text-stone-900 dark:text-stone-100 text-base sm:text-lg mt-3 mb-1 border-b border-stone-200 dark:border-stone-800 pb-1">
                {renderFormattedInline(trimmed.replace(/^##\s+/, ""))}
              </h3>
            );
          }

          // Bullet list items
          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-stone-700 dark:text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <div className="flex-1">{renderFormattedInline(trimmed.replace(/^[-*]\s+/, ""))}</div>
              </div>
            );
          }

          // Numbered list items
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-stone-700 dark:text-stone-300">
                <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <div className="flex-1">{renderFormattedInline(numMatch[2])}</div>
              </div>
            );
          }

          // Blockquotes
          if (trimmed.startsWith("> ")) {
            return (
              <blockquote key={idx} className="border-l-4 border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20 px-3 py-1.5 rounded-r-lg italic text-stone-700 dark:text-stone-300 my-2">
                {renderFormattedInline(trimmed.replace(/^>\s+/, ""))}
              </blockquote>
            );
          }

          return (
            <p key={idx} className="text-stone-800 dark:text-stone-200">
              {renderFormattedInline(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderFormattedInline = (text: string) => {
    // Process markdown links [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(renderBoldItalic(text.substring(lastIdx, match.index)));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 font-semibold underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors inline-flex items-center gap-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline-block shrink-0 opacity-80" />
        </a>
      );
      lastIdx = linkRegex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(renderBoldItalic(text.substring(lastIdx)));
    }

    return parts;
  };

  const renderBoldItalic = (text: string) => {
    // Process **bold**
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, i) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-stone-900 dark:text-white">
            {bp.slice(2, -2)}
          </strong>
        );
      }
      return bp;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-5xl mx-auto w-full bg-stone-50 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-850 shadow-sm overflow-hidden animate-in fade-in duration-300">
      {/* Top Chat Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 p-3 sm:p-4 flex flex-col gap-2.5 shrink-0 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          {/* Back & Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onBackToHome}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 transition-all cursor-pointer shrink-0"
              title={t.aboutBackBtn}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Official Logo avatar */}
            <div className="relative shrink-0">
              <img
                src="/official-logo.jpg"
                alt="Search Fatwa"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-amber-500/50 object-cover shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white truncate">
                  Search Fatwa AI চ্যাটবট
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                  <span>Gemini Multi-Turn</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                {language === "en" ? roleMeta.nameEn : roleMeta.nameBn} · {MODELS_META[selectedModel].label}
              </p>
            </div>
          </div>

          {/* Right Action: Clear Chat session */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-stone-200 dark:border-stone-800 transition-all cursor-pointer shadow-2xs"
              title="নতুন চ্যাট শুরু করুন (Clear Session)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">নতুন চ্যাট</span>
            </button>
          </div>
        </div>

        {/* Controls Row: Role Selector & Model Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs">
          {/* Role Persona selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 shrink-0 flex items-center gap-1">
              <RoleIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>রোল:</span>
            </span>
            {(Object.keys(ROLES_META) as ChatbotRole[]).map((r) => {
              const meta = ROLES_META[r];
              const isSelected = selectedRole === r;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-2xs"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-750 border-stone-200 dark:border-stone-700"
                  }`}
                  title={meta.descBn}
                >
                  {language === "en" ? meta.nameEn : meta.nameBn}
                </button>
              );
            })}
          </div>

          {/* Model selector (gemini-3.8-flash, gemini-3.1-flash-lite, gemini-4-argon) */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 shrink-0 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">মডেল:</span>
            </span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as GeminiModelType)}
              className="bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {(Object.keys(MODELS_META) as GeminiModelType[]).map((m) => (
                <option key={m} value={m}>
                  {MODELS_META[m].label} ({MODELS_META[m].badge})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 max-w-3xl ${
                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Avatar */}
              {isUser ? (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              ) : (
                <div className="relative shrink-0 mt-1">
                  <img
                    src="/official-logo.jpg"
                    alt="Search Fatwa"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-amber-500/50 object-cover shadow-xs"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`group relative rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed transition-all shadow-xs ${
                  isUser
                    ? "bg-emerald-600 text-white rounded-tr-xs"
                    : "bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-100 border border-stone-200/90 dark:border-stone-800 rounded-tl-xs"
                }`}
              >
                {/* Assistant Metadata Badge */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-stone-100 dark:border-stone-800 text-[10px] text-stone-400">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{roleMeta.nameBn}</span>
                    </span>
                    {msg.modelUsed && (
                      <span className="font-mono bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[10px] text-stone-500">
                        {msg.modelUsed}
                      </span>
                    )}
                  </div>
                )}

                {/* Body Text */}
                <div className="break-words">
                  {isUser ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    renderMarkdown(msg.text)
                  )}
                </div>

                {/* Sources Card List for Assistant */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 space-y-1.5">
                    <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-emerald-500" />
                      <span>রেফারেন্স ও তথ্যসূত্র লিঙ্ক:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-stone-200 dark:border-stone-700 transition-colors"
                        >
                          <span className="truncate max-w-[180px]">{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy button for model messages */}
                {!isUser && (
                  <div className="mt-2 pt-1 flex items-center justify-end">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="inline-flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
                      title="কপি করুন"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500 font-semibold">কপি হয়েছে</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>কপি</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5 sm:gap-3.5 max-w-xl mr-auto">
            <div className="relative shrink-0 mt-1">
              <img
                src="/official-logo.jpg"
                alt="Search Fatwa"
                className="w-8 h-8 rounded-xl border border-amber-500/50 object-cover shadow-xs animate-pulse"
              />
            </div>
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
              <div className="text-xs text-stone-600 dark:text-stone-300">
                <span className="font-semibold text-stone-900 dark:text-white">চিন্তাভাবনা হচ্ছে...</span>{" "}
                <span className="text-stone-400">দলিল ও ফতোয়া বিশ্লেষণ করা হচ্ছে</span>
              </div>
            </div>
          </div>
        )}

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center justify-between gap-2">
            <span>{errorMessage}</span>
            <button
              onClick={() => handleSendMessage()}
              className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded font-semibold cursor-pointer shrink-0"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starter Chips when chat has few messages */}
      {messages.length <= 2 && (
        <div className="px-3 sm:px-4 py-2 border-t border-stone-100 dark:border-stone-850 bg-stone-50/60 dark:bg-stone-900/40 overflow-x-auto">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[11px] font-bold text-stone-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>সচরাচর প্রশ্ন:</span>
            </span>
            {(STARTER_QUESTIONS[language] || STARTER_QUESTIONS.bn).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-stone-200 dark:border-stone-700 transition-colors shadow-2xs cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box Footer */}
      <div className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 p-2.5 sm:p-3.5 shrink-0">
        <div className="flex items-end gap-2 bg-stone-50 dark:bg-stone-850 border border-stone-250 dark:border-stone-750 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl p-2 transition-all">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === "en"
                ? "Ask a follow-up or any Islamic question (Enter to send)..."
                : "আপনার ইসলামিক প্রশ্ন বা পূর্ববর্তী উত্তরের প্রেক্ষিতে কিছু জানতে চান লিখুন (Enter চাপুন)..."
            }
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent border-0 resize-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm leading-relaxed focus:outline-none focus:ring-0 p-1 min-h-[38px] max-h-[160px]"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
            title="বার্তা পাঠান"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Small Disclaimer footer */}
        <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 px-1">
          <span>
            {language === "en"
              ? "Multi-turn context preserved. Answers grounded in authorized portals."
              : "মাল্টি-টার্ন আলোচনা সক্রিয়। পূর্ববর্তী প্রসঙ্গের প্রেক্ষিতে উত্তর দেওয়া হবে।"}
          </span>
          <span className="hidden sm:inline">Shift + Enter দিয়ে নতুন লাইন</span>
        </div>
      </div>
    </div>
  );
};
