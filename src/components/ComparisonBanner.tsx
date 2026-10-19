import React, { useState } from "react";
import { Sparkles, CheckCircle2, XCircle, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { translations, Language } from "../data/translations";

interface ComparisonBannerProps {
  language: Language;
}

export const ComparisonBanner: React.FC<ComparisonBannerProps> = ({ language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations[language] || translations.bn;

  return (
    <ScrollReveal animation="fade-up" delay={100} className="mb-3 sm:mb-5">
      <section className="bg-stone-900/70 dark:bg-stone-900/90 border border-stone-800 dark:border-stone-800/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-stone-200 shadow-xs backdrop-blur-xs transition-all">
        {/* Header Row: Compact on mobile so search bar is immediately accessible */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div
            className="flex items-center sm:items-start gap-2.5 min-w-0 cursor-pointer flex-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-base font-semibold text-stone-100 truncate sm:whitespace-normal">
                  {t.compTitle}
                </h3>
                <span className="text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 flex items-center gap-0.5 sm:gap-1 shrink-0">
                  <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                  <span>{t.compBadge}</span>
                </span>
              </div>

              {/* Description: 1-line clamped on mobile to save vertical space; fully visible when expanded or on desktop */}
              <p className={`text-[11px] sm:text-xs text-stone-400 mt-0.5 sm:mt-1 leading-relaxed max-w-2xl ${
                isExpanded ? "block" : "hidden sm:block line-clamp-1 sm:line-clamp-none"
              }`}>
                {t.compDesc}
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[32px] sm:min-h-[36px] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-stone-300 hover:text-white bg-stone-800/90 hover:bg-stone-750 active:scale-95 rounded-lg sm:rounded-xl border border-stone-700/60 transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 cursor-pointer shadow-xs"
            aria-expanded={isExpanded}
            title={isExpanded ? t.compCollapse : t.compExpand}
          >
            <span>{isExpanded ? t.compCollapse : t.compExpand}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            )}
          </button>
        </div>

        {/* Collapsible Details and Comparison Table */}
        {isExpanded && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-stone-800/80 animate-in fade-in duration-200">
            {/* Mobile-only visible full description if was hidden in collapsed state */}
            <p className="sm:hidden text-xs text-stone-300 mb-3 leading-relaxed bg-stone-950/40 p-2.5 rounded-lg border border-stone-800/60">
              {t.compDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              {/* Default Traditional Search limitation */}
              <div className="bg-stone-950/70 border border-rose-950/50 rounded-xl p-3 sm:p-3.5 text-stone-300">
                <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span className="text-xs sm:text-sm">{t.compTradTitle}</span>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-stone-400 leading-relaxed text-[11px] sm:text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{t.compTrad1}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{t.compTrad2}</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{t.compTrad3}</span>
                  </li>
                </ul>
              </div>

              {/* Our AI Synthesized Model Advantages */}
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3 sm:p-3.5 text-stone-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="text-xs sm:text-sm">{t.compAiTitle}</span>
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-stone-300 leading-relaxed text-[11px] sm:text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>
                      {t.compAi1Pre}
                      <strong className="text-emerald-300">{t.compAi1Bold}</strong>
                      {t.compAi1Post}
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>
                      <strong>{t.compAi2Pre}</strong>
                      <span className="text-emerald-300 font-medium">{t.compAi2Highlight}</span>
                      {t.compAi2Post}
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{t.compAi3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
};
