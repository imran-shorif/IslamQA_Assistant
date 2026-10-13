import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Search,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Layers,
  Heart,
  HelpCircle,
} from "lucide-react";
import { translations } from "../data/translations";

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToSupport?: () => void;
  language?: "bn" | "en";
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigateToSupport,
  language = "bn",
}) => {
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.aboutBackBtn}</span>
        </button>

        {onNavigateToSupport && (
          <button
            onClick={onNavigateToSupport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/25 text-xs font-semibold transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>{t.aboutSupportBtn}</span>
          </button>
        )}
      </div>

      {/* Hero Header */}
      <section className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>{t.aboutBadge}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-snug sm:leading-tight">
          {t.aboutHeroTitle1} <br />
          <span className="text-blue-600 dark:text-blue-400">
            {t.aboutHeroTitleHighlight}
          </span>
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
          {t.aboutHeroDesc}
        </p>
      </section>

      {/* Featured Quote / Direct Message Box */}
      <section className="mb-10 p-5 sm:p-7 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border-2 border-blue-200/80 dark:border-blue-800/60 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-300 mb-1">
              {t.aboutQuoteTitle}
            </h2>
            <p className="italic text-stone-700 dark:text-stone-300 border-l-4 border-blue-500 pl-4 py-1">
              {t.aboutQuoteP1}
            </p>
            <p className="italic text-stone-700 dark:text-stone-300 border-l-4 border-blue-500 pl-4 py-1">
              {t.aboutQuoteP2}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: The Core Problem */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            {t.aboutProblemHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="text-rose-600 dark:text-rose-400 font-bold text-sm mb-2 flex items-center gap-1.5">
              <span>✕</span>
              <span>{t.aboutProb1Title}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.aboutProb1Desc}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="text-rose-600 dark:text-rose-400 font-bold text-sm mb-2 flex items-center gap-1.5">
              <span>✕</span>
              <span>{t.aboutProb2Title}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.aboutProb2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: How IslamQA Assistant Solves It */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            {t.aboutSolutionHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                {t.aboutSol1Title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.aboutSol1Desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.aboutSol1Badge}</span>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                {t.aboutSol2Title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.aboutSol2Desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.aboutSol2Badge}</span>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                {t.aboutSol3Title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.aboutSol3Desc}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>{t.aboutSol3Badge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why not just search on islamqa.info? */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            {t.aboutWhyDiffHeading}
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Traditional Search */}
            <div className="space-y-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-750">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-bold text-sm">
                <Search className="w-4 h-4 text-stone-500" />
                <span>{t.aboutWhyTradTitle}</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>{t.aboutWhyTrad1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>{t.aboutWhyTrad2}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>{t.aboutWhyTrad3}</span>
                </li>
              </ul>
            </div>

            {/* Our Model */}
            <div className="space-y-3 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t.aboutWhySmartTitle}</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>{t.aboutWhySmart1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>{t.aboutWhySmart2}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>{t.aboutWhySmart3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Scholarly Guidance & Ethical Reminder */}
      <section className="mb-10 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{t.aboutDisclaimerTitle}</span>
        </h3>
        <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
          {t.aboutDisclaimerDesc}
        </p>
      </section>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-stone-200/80 dark:border-stone-800">
        <button
          onClick={onBackToHome}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.aboutBackToQnaBtn}</span>
        </button>

        {onNavigateToSupport && (
          <button
            onClick={onNavigateToSupport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-98 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all border border-stone-200 dark:border-stone-700 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
            <span>{t.aboutSupportBkashBtn}</span>
          </button>
        )}
      </div>
    </div>
  );
};
