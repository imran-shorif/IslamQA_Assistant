import React from "react";
import { BookOpen, ShieldCheck, History, Globe, ExternalLink } from "lucide-react";
import { ThemeToggle, ThemeMode } from "./ThemeToggle";

interface HeaderProps {
  language: "auto" | "bn" | "en" | "ar";
  onLanguageChange: (lang: "auto" | "bn" | "en" | "ar") => void;
  historyCount: number;
  onOpenHistory: () => void;
  onHomeClick?: (e: React.MouseEvent) => void;
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  historyCount,
  onOpenHistory,
  onHomeClick,
  theme,
  resolvedTheme,
  onThemeChange,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 dark:bg-black/95 backdrop-blur-md text-stone-100 border-b border-stone-800 dark:border-stone-850 shadow-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Logo icon (Home redirect) */}
          <a
            href="/"
            onClick={onHomeClick}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center text-emerald-100 shadow-inner hover:bg-emerald-600 active:scale-95 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="মূল পাতায় ফিরে যান (Go to Home)"
          >
            <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-300" />
          </a>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {/* Brand title (Home redirect) */}
              <a
                href="/"
                onClick={onHomeClick}
                className="font-bold text-base sm:text-lg tracking-tight text-white hover:text-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded truncate"
                title="মূল পাতায় ফিরে যান (Go to Home)"
              >
                IslamQA <span className="text-emerald-400 font-semibold">Assistant</span>
              </a>

              {/* Source Link (redirects to islamqa.info) */}
              <a
                href="https://islamqa.info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900 hover:border-emerald-600 hover:text-emerald-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer shrink-0"
                title="ইসলামকিউএ ওয়েবসাইট ভিজিট করুন (islamqa.info)"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Source: islamqa.info</span>
                <ExternalLink className="w-2.5 h-2.5 text-emerald-400/80" />
              </a>
            </div>
            <p className="text-[11px] text-stone-400 hidden md:block truncate">
              বিশুদ্ধ ইসলামিক ফতোয়া ও গবেষণালব্ধ সমাধান
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Theme Mode Activation Button (System, Light, Dark) */}
          <ThemeToggle
            theme={theme}
            resolvedTheme={resolvedTheme}
            onThemeChange={onThemeChange}
          />

          {/* Language selector */}
          <div className="relative flex items-center bg-stone-800/90 hover:bg-stone-750 border border-stone-700/70 rounded-lg px-2 py-1.5 min-h-[38px] text-xs transition-colors">
            <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
            <select
              value={language}
              onChange={(e) =>
                onLanguageChange(e.target.value as "auto" | "bn" | "en" | "ar")
              }
              aria-label="Select preferred language"
              className="bg-transparent text-stone-200 text-xs font-medium focus:outline-none cursor-pointer pr-1 max-w-[65px] sm:max-w-none"
            >
              <option value="auto" className="bg-stone-900 text-stone-200">
                Auto
              </option>
              <option value="bn" className="bg-stone-900 text-stone-200">
                বাংলা
              </option>
              <option value="en" className="bg-stone-900 text-stone-200">
                English
              </option>
              <option value="ar" className="bg-stone-900 text-stone-200">
                العربية
              </option>
            </select>
          </div>

          {/* History button */}
          <button
            id="history-toggle-btn"
            onClick={onOpenHistory}
            className="flex items-center justify-center gap-1.5 min-h-[38px] min-w-[38px] px-2.5 sm:px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs font-medium transition-all border border-stone-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
            title="পূর্ববর্তী প্রশ্ন ও ফতোয়া (History)"
            aria-label="Past Queries History"
          >
            <History className="w-4 h-4 text-stone-300" />
            <span className="hidden sm:inline">ইতিহাস</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-[10px] text-white font-bold leading-none">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
