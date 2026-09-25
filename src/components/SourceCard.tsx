import React from "react";
import { ExternalLink, ShieldCheck, Globe } from "lucide-react";
import { IslamQASource } from "../types";

interface SourceCardProps {
  source: IslamQASource;
  index: number;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  const isIslamQADomain = source.url.includes("islamqa.info");

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`islamqa.info-তে মূল ফতোয়া খুলুন: ${source.title || source.url}`}
      className="group block bg-white hover:bg-emerald-50/40 active:bg-emerald-50 active:scale-[0.99] border border-stone-200 hover:border-emerald-400 rounded-xl p-3 sm:p-3.5 transition-all shadow-xs hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          {source.questionNo ? (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 group-hover:border-emerald-300 group-hover:bg-emerald-100/70 group-hover:text-emerald-900 transition-colors shrink-0">
              ফতোয়া #{source.questionNo}
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600 shrink-0">
              IslamQA বিধান
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-emerald-700 text-xs font-semibold group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0 bg-emerald-50 group-hover:bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200/60">
          <span>মূল ফতোয়া দেখুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      <h4 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-emerald-900 mt-2 line-clamp-2 leading-snug">
        {source.title || `IslamQA Fatwa Article ${source.questionNo || ""}`}
      </h4>

      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 text-[11px] text-stone-500">
        <span className="truncate flex-1 font-mono text-[10px] text-emerald-700/80 group-hover:text-emerald-700 group-hover:underline flex items-center gap-1">
          <Globe className="w-3 h-3 shrink-0 text-emerald-600" />
          <span className="truncate">{source.url}</span>
        </span>
        {isIslamQADomain && (
          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium shrink-0 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>যাচাইকৃত লিংক</span>
          </span>
        )}
      </div>
    </a>
  );
};
