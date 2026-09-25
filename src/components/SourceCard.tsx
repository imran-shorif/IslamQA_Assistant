import React, { useState } from "react";
import { ExternalLink, ShieldCheck, Globe, Copy, Check } from "lucide-react";
import { IslamQASource } from "../types";

interface SourceCardProps {
  source: IslamQASource;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  const [copied, setCopied] = useState(false);
  const isIslamQADomain = source.url.includes("islamqa.info");

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(source.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    window.open(source.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group bg-white dark:bg-stone-900 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/40 active:bg-emerald-50/70 dark:active:bg-emerald-950/70 border-2 border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-4 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
      title={`ক্লিক করে ইসলামকিউএ (islamqa.info) মূল পেজ খুলুন: ${source.title || source.url}`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-6 h-6 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
              {index + 1}
            </span>
            {source.questionNo ? (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/90 dark:border-emerald-800/80 shrink-0">
                ফতোয়া নং #{source.questionNo}
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shrink-0">
                IslamQA বিধান
              </span>
            )}
          </div>

          {isIslamQADomain && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>যাচাইকৃত মূল লিংক</span>
            </span>
          )}
        </div>

        {/* Fatwa Title */}
        <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-3">
          {source.title || `IslamQA Fatwa Article ${source.questionNo || ""}`}
        </h4>
      </div>

      {/* URL Display and Action Buttons */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2.5">
        {/* Full Clickable Hyperlink */}
        <div className="flex items-center justify-between gap-2 bg-stone-50 dark:bg-stone-850 group-hover:bg-white dark:group-hover:bg-stone-800 rounded-lg p-2 border border-stone-200/70 dark:border-stone-750 transition-colors">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 min-w-0 text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 hover:underline font-mono text-[11px] sm:text-xs font-medium truncate"
            title={source.url}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="truncate">{source.url}</span>
          </a>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors cursor-pointer"
            title="লিঙ্ক কপি করুন"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-1">
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>কপি</span>
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            )}
          </button>
        </div>

        {/* Primary CTA Button */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span className="text-[11px] text-stone-400 dark:text-stone-500 font-medium hidden xs:inline">
            islamqa.info
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-full xs:w-auto ml-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:scale-98 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
          >
            <span>মূল ফতোয়া পড়ুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
