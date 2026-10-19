import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Copy,
  Check,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  Share2,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Smartphone,
} from "lucide-react";
import {
  WhatsAppIcon,
  FacebookIcon,
  XTwitterIcon,
  TelegramIcon,
} from "./SocialIcons";
import { QnAResponse } from "../types";
import { SourceCard } from "./SourceCard";
import { translations, Language } from "../data/translations";

interface AnswerCardProps {
  data: QnAResponse;
  language?: Language;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({ data, language = "bn" }) => {
  const [copied, setCopied] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[language] || translations.bn;

  // Close share popover menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };
    if (isShareMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShareMenuOpen]);

  // Clean text preparation
  const cleanSummary = data.answer
    .replace(/###?\s+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/_{1,2}/g, "")
    .trim();

  const shortSummary = cleanSummary.length > 260
    ? cleanSummary.slice(0, 257) + "..."
    : cleanSummary;

  const sourceUrl = data.sources[0]?.url || "https://islamqa.info";
  const appUrl = typeof window !== "undefined" ? window.location.href : "https://islamqa.info";

  const getShareLabels = () => {
    if (language === "ar") {
      return {
        q: "السؤال",
        a: "الجواب (ملخص فتوى الإسلام سؤال وجواب)",
        ref: "مراجع وروابط الفتاوى المباشرة",
        title: `فتوى إسلامية: ${data.question}`,
      };
    }
    if (language === "ur") {
      return {
        q: "سوال",
        a: "جواب (خلاصہ اسلام سوال و جواب)",
        ref: "مستند فتاویٰ لنکس و حوالہ جات",
        title: `اسلامی فتویٰ: ${data.question}`,
      };
    }
    if (language === "en") {
      return {
        q: "Question",
        a: "Answer (IslamQA Summary)",
        ref: "Verified IslamQA References",
        title: `Islamic Fatwa: ${data.question}`,
      };
    }
    return {
      q: "প্রশ্ন",
      a: "উত্তর (ইসলামকিউএ সারসংক্ষেপ)",
      ref: "সরাসরি ফতোয়া রেফারেন্স",
      title: `ইসলামিক ফতোয়া: ${data.question}`,
    };
  };

  const labels = getShareLabels();

  const formattedShareText = `${labels.q}: ${data.question}\n\n${labels.a}:\n${cleanSummary}\n\n${labels.ref}:\n${data.sources.map((s) => s.url).join("\n") || sourceUrl}\n\nSearch Fatwa: ${appUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setIsShareMenuOpen(false);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareWhatsApp = () => {
    const waText = `*${labels.q}:* ${data.question}\n\n*${labels.a}:* ${shortSummary}\n\n*${labels.ref}:* ${sourceUrl}\n\n*Search Fatwa:* ${appUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
  };

  const handleShareFacebook = () => {
    const quoteText = `${labels.q}: ${data.question}\n\n${shortSummary}`;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sourceUrl)}&quote=${encodeURIComponent(quoteText)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
  };

  const handleShareTelegram = () => {
    const tgText = `${labels.q}: ${data.question}\n\n${labels.a}: ${shortSummary}`;
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(sourceUrl)}&text=${encodeURIComponent(tgText)}`;
    window.open(tgUrl, "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
  };

  const handleShareX = () => {
    const tweetText = `${labels.q}: ${data.question}\n\n${labels.a}: ${shortSummary.slice(0, 130)}...`;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(sourceUrl)}`;
    window.open(xUrl, "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: labels.title,
          text: formattedShareText,
          url: sourceUrl,
        });
        setIsShareMenuOpen(false);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <article
      id={`answer-${data.id}`}
      className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
    >
      {/* Question Header */}
      <div className="bg-stone-50 dark:bg-stone-850 border-b border-stone-200/80 dark:border-stone-800 px-4 sm:px-6 py-3.5 sm:py-4 transition-colors">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>{t.ansQueriedQuestion}</span>
          </span>
          <span className="text-[11px] text-stone-400 dark:text-stone-500">
            {new Date(data.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <h2 className="text-base sm:text-xl font-bold text-stone-900 dark:text-white leading-snug break-words">
          {data.question}
        </h2>
      </div>

      {/* Answer Body Header Controls */}
      <div className="px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 transition-colors">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium border border-emerald-200/70 dark:border-emerald-800/70">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {data.selectedSources && data.selectedSources.length > 0 && !data.selectedSources.includes("all")
                ? `উৎস / মাযহাব: ${data.selectedSources.join(", ")}`
                : "Search Fatwa যাচাইকৃত সমাধান"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === "normal" ? "large" : "normal")}
            className="min-h-[38px] px-2.5 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors flex items-center gap-1 cursor-pointer"
            title="Toggle Text Size"
            aria-label="Toggle Text Size"
          >
            {fontSize === "normal" ? (
              <ZoomIn className="w-4 h-4" />
            ) : (
              <ZoomOut className="w-4 h-4" />
            )}
            <span className="text-[11px] hidden sm:inline">
              {fontSize === "normal" ? t.ansLargeFont : t.ansNormalFont}
            </span>
          </button>

          {/* Share Button with Social Popover Menu */}
          <div className="relative inline-block" ref={shareMenuRef}>
            <button
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              aria-expanded={isShareMenuOpen}
              aria-haspopup="true"
              className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg transition-all border flex items-center gap-1.5 cursor-pointer ${
                isShareMenuOpen
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 text-stone-700 dark:text-stone-200 font-medium border-stone-200 dark:border-stone-700"
              }`}
              title={t.ansShareDropdownTitle}
              aria-label={t.ansShareDropdownTitle}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">{t.ansShare}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isShareMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Social Share Popover Dropdown */}
            {isShareMenuOpen && (
              <div
                role="menu"
                aria-orientation="vertical"
                className="absolute right-0 mt-1.5 w-60 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-750 shadow-xl z-40 p-2 text-stone-800 dark:text-stone-100 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
              >
                <div className="px-2.5 py-1.5 border-b border-stone-100 dark:border-stone-800 text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                  {t.ansShareDropdownTitle}
                </div>

                <div className="py-1 space-y-0.5 text-xs">
                  {/* WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span className="font-medium">WhatsApp</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={handleShareFacebook}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-stone-700 dark:text-stone-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#1877F2] shrink-0" />
                    <span className="font-medium">Facebook</span>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={handleShareTelegram}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 text-stone-700 dark:text-stone-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer text-left"
                  >
                    <TelegramIcon className="w-4 h-4 text-[#229ED9] shrink-0" />
                    <span className="font-medium">Telegram</span>
                  </button>

                  {/* X / Twitter */}
                  <button
                    onClick={handleShareX}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <XTwitterIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-medium">X (Twitter)</span>
                  </button>

                  {/* Native Device Share Sheet */}
                  {hasNativeShare && (
                    <button
                      onClick={handleNativeShare}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer text-left border-t border-stone-100 dark:border-stone-800 mt-1 pt-1.5"
                    >
                      <Smartphone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="font-medium">{t.ansDeviceShare}</span>
                    </button>
                  )}

                  {/* Copy Link / Text */}
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer text-left border-t border-stone-100 dark:border-stone-800 mt-1 pt-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{t.ansCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                        <span>{t.ansCopyFullAnswer}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Copy Button */}
          <button
            onClick={handleCopy}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 text-stone-700 dark:text-stone-200 font-medium transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1 cursor-pointer"
            title={t.ansCopyFullAnswer}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-700 dark:text-blue-400 font-semibold text-[11px] sm:text-xs">{t.ansCopySuccess}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                <span className="text-[11px] sm:text-xs">{t.ansCopyBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Content */}
      <div className="p-4 sm:p-7">
        <div
          className={`prose max-w-none text-stone-800 dark:text-stone-200 leading-relaxed font-sans ${
            fontSize === "large"
              ? "text-base sm:text-lg leading-loose"
              : "text-[15px] sm:text-base leading-relaxed"
          }`}
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mt-5 mb-2.5 pb-2 border-b border-stone-200 dark:border-stone-800">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-400 mt-4 sm:mt-5 mb-2 flex items-center gap-2">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 mt-3 sm:mt-4 mb-1.5">
                  {children}
                </h4>
              ),
              p: ({ children }) => <p className="mb-3.5 text-stone-800 dark:text-stone-200 leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-3.5 space-y-1.5 text-stone-800 dark:text-stone-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-3.5 space-y-1.5 text-stone-800 dark:text-stone-200">
                  {children}
                </ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 rounded-r-xl p-3 sm:p-4 my-3 sm:my-4 text-stone-900 dark:text-stone-100 italic font-serif text-sm sm:text-base">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-semibold underline decoration-blue-400 hover:decoration-blue-700 decoration-1.5 underline-offset-2 break-all"
                  >
                    <span>{children}</span>
                    <ExternalLink className="w-3 h-3 inline-block ml-0.5 shrink-0 opacity-80" />
                  </a>
                );
              },
              strong: ({ children }) => (
                <strong className="font-semibold text-stone-900 dark:text-stone-100">{children}</strong>
              ),
            }}
          >
            {data.answer}
          </Markdown>
        </div>

        {/* In-Card Social Sharing Section */}
        <section aria-label="Social Share" className="mt-6 pt-5 pb-1 border-t border-stone-200/90 dark:border-stone-800">
          <div className="bg-stone-50/80 dark:bg-stone-850/60 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-3.5 sm:p-4.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>{t.ansShareBoxTitle}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                      {t.ansSadqahBadge}
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {t.ansShareBoxDesc}
                  </p>
                </div>
              </div>

              {hasNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto shrink-0"
                  title={t.ansDeviceShare}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.ansDeviceShare}</span>
                </button>
              )}
            </div>

            {/* Quick 1-Click Platform Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {/* WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 active:scale-95 text-[#128C7E] dark:text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <span>WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={handleShareFacebook}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 active:scale-95 text-[#1877F2] dark:text-blue-400 border border-[#1877F2]/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4 fill-[#1877F2] shrink-0" />
                <span>Facebook</span>
              </button>

              {/* Telegram */}
              <button
                onClick={handleShareTelegram}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 active:scale-95 text-[#229ED9] dark:text-sky-400 border border-[#229ED9]/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Telegram"
              >
                <TelegramIcon className="w-4 h-4 fill-[#229ED9] shrink-0" />
                <span>Telegram</span>
              </button>

              {/* X / Twitter */}
              <button
                onClick={handleShareX}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-stone-200/70 hover:bg-stone-300/80 active:scale-95 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="X / Twitter"
              >
                <XTwitterIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>X / Twitter</span>
              </button>

              {/* Copy Button in Grid */}
              <button
                onClick={handleCopy}
                className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 border ${
                  copied
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-200 border-stone-300 dark:border-stone-700"
                }`}
                title={t.ansCopyFullAnswer}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>{t.ansCopySuccess}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{t.ansCopyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* References Section */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{t.ansDirectSourcesTitle}</span>
            </h4>
            <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
              {data.sources.length > 0 ? t.ansLiveLinksCount(data.sources.length) : t.ansDatabaseLabel}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 mb-3">
            {t.ansSourcesIntro}
          </p>

          {data.sources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {data.sources.map((src, idx) => (
                <SourceCard key={idx} source={src} index={idx} language={language} />
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">{t.ansFallbackNotice}</span>
              </div>
              <a
                href="https://islamqa.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 shrink-0"
              >
                <span>islamqa.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
