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
    <ScrollReveal animation="fade-up" delay={100} className="mb-5 sm:mb-6">
      <section className="bg-stone-900/60 dark:bg-stone-900/80 border border-stone-800 dark:border-stone-800/90 rounded-2xl p-3.5 sm:p-5 text-stone-200 shadow-sm backdrop-blur-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-inner">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-stone-100">
                  {t.compTitle}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  {t.compBadge}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-2xl">
                {t.compDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[38px] px-3 py-1.5 text-xs text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-750 active:scale-95 rounded-xl border border-stone-700/60 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? t.compCollapse : t.compExpand}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-stone-400" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-300">
            {/* Default Search limitation */}
            <div className="bg-stone-950/60 border border-rose-950/50 rounded-xl p-3.5 text-stone-300">
              <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2.5">
                <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{t.compTradTitle}</span>
              </div>
              <ul className="space-y-2 text-stone-400 leading-relaxed text-[11px] sm:text-xs">
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

            {/* Our AI model advantages */}
            <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-3.5 text-stone-300">
              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
                <span>{t.compAiTitle}</span>
              </div>
              <ul className="space-y-2 text-stone-300 leading-relaxed text-[11px] sm:text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>
                    {t.compAi1Pre}
                    <strong>{t.compAi1Bold}</strong>
                    {t.compAi1Post}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>
                    <strong>{t.compAi2Pre}</strong>
                    <span className="text-blue-300 font-medium">{t.compAi2Highlight}</span>
                    {t.compAi2Post}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold">✓</span>
                  <span>{t.compAi3}</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
};
