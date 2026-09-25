import React, { useState } from "react";
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
  AlertCircle,
} from "lucide-react";
import { QnAResponse } from "../types";
import { SourceCard } from "./SourceCard";

interface AnswerCardProps {
  data: QnAResponse;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");

  const formattedShareText = `প্রশ্ন: ${data.question}\n\nউত্তর (সূত্র: islamqa.info):\n${data.answer}\n\nতথ্যসূত্র:\n${data.sources.map((s) => s.url).join("\n")}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `IslamQA Ruling: ${data.question}`,
          text: formattedShareText,
          url: data.sources[0]?.url || "https://islamqa.info",
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <article
      id={`answer-${data.id}`}
      className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
    >
      {/* Question Header */}
      <div className="bg-stone-50 dark:bg-stone-850 border-b border-stone-200/80 dark:border-stone-800 px-4 sm:px-6 py-3.5 sm:py-4 transition-colors">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold tracking-wide text-emerald-800 dark:text-emerald-400 uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>অনুসন্ধানকৃত প্রশ্ন</span>
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
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border border-emerald-200/70 dark:border-emerald-800/70">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>islamqa.info ভিত্তিক সমাধান</span>
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
              {fontSize === "normal" ? "বড় ফন্ট" : "স্বাভাবিক"}
            </span>
          </button>

          {/* Share Button (Native Mobile Share) */}
          <button
            onClick={handleShare}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 text-stone-700 dark:text-stone-200 font-medium transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1 cursor-pointer"
            title="উত্তর শেয়ার করুন"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            <span className="text-[11px] sm:text-xs">শেয়ার</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 text-stone-700 dark:text-stone-200 font-medium transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1 cursor-pointer"
            title="সম্পূর্ণ উত্তর কপি করুন"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] sm:text-xs">কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                <span className="text-[11px] sm:text-xs">কপি</span>
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
                <h3 className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-400 mt-4 sm:mt-5 mb-2 flex items-center gap-2">
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
                <blockquote className="border-l-4 border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-r-xl p-3 sm:p-4 my-3 sm:my-4 text-stone-900 dark:text-stone-100 italic font-serif text-sm sm:text-base">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-200 font-semibold underline decoration-emerald-400 hover:decoration-emerald-700 decoration-1.5 underline-offset-2 break-all"
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

        {/* References Section */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-200 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>সরাসরি ইসলামকিউএ রেফারেন্স ও মূল লিঙ্ক (IslamQA Sources)</span>
            </h4>
            <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
              {data.sources.length > 0 ? `${data.sources.length} টি লাইভ ফতোয়া লিঙ্ক` : "ইসলামকিউএ ডাটাবেজ"}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 mb-3">
            নিচের যেকোনো কার্ডে ক্লিক করলে সরাসরি <strong className="text-emerald-700 dark:text-emerald-400 font-medium">islamqa.info</strong> মূল ওয়েবসাইটে গিয়ে সম্পূর্ণ ফতোয়া, মূল আরবী ইবারত ও বিস্তারিত দলিল দেখা যাবে:
          </p>

          {data.sources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {data.sources.map((src, idx) => (
                <SourceCard key={idx} source={src} index={idx} />
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">উত্তরে উল্লিখিত ফতোয়া সরাসরি islamqa.info পোর্টালে যাচাই করতে পারেন।</span>
              </div>
              <a
                href="https://islamqa.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 shrink-0"
              >
                <span>islamqa.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Scholarly Disclaimer */}
        <div className="mt-5 pt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-start gap-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-50/70 dark:bg-stone-850/60 p-3 rounded-xl leading-relaxed">
          <AlertCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-stone-700 dark:text-stone-300">সতর্কতা ও দায়মুক্তি:</strong> এই উত্তরটি সম্পূর্ণভাবে{" "}
            <a
              href="https://islamqa.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
            >
              islamqa.info
            </a>{" "}
            ওয়েবসাইটে প্রকাশিত ফতোয়ার সুনির্দিষ্ট রেফারেন্স ও তথ্যের ভিত্তিতে প্রস্তুত করা হয়েছে। জটিল পারিবারিক, ব্যক্তিগত বা বিচারিক বিষয়ে প্রয়োজনে বিজ্ঞ স্থানীয় আলেমের পরামর্শ নিন।
          </p>
        </div>
      </div>
    </article>
  );
};
