import React from "react";
import { ExternalLink, BookmarkCheck, ShieldCheck } from "lucide-react";
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
      className="group block bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-300 rounded-xl p-3.5 transition-all shadow-xs hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          {source.questionNo ? (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 group-hover:border-emerald-200 group-hover:bg-emerald-100/60 transition-colors">
              Fatwa #{source.questionNo}
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600">
              IslamQA Ruling
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-emerald-700 text-xs font-medium group-hover:translate-x-0.5 transition-transform">
          <span>মূল ফতোয়া পড়ুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      <h4 className="text-sm font-semibold text-stone-900 group-hover:text-emerald-950 mt-2 line-clamp-2">
        {source.title || `IslamQA Fatwa Article ${source.questionNo || ""}`}
      </h4>

      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
        <span className="truncate max-w-[260px] sm:max-w-[340px] font-mono text-[10px] text-stone-400">
          {source.url}
        </span>
        {isIslamQADomain && (
          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium shrink-0">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            যাচাইকৃত সোর্স
          </span>
        )}
      </div>
    </a>
  );
};
