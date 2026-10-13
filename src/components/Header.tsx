import React from "react";
import { BookOpen, ShieldCheck, History, Globe, ExternalLink, Heart, Info } from "lucide-react";
import { ThemeToggle, ThemeMode } from "./ThemeToggle";
import { translations, Language } from "../data/translations";

interface HeaderProps {
  language: Language;
  resolvedLanguage: "bn" | "en";
  onLanguageChange: (lang: Language) => void;
  historyCount: number;
  onOpenHistory: () => void;
  onHomeClick?: (e: React.MouseEvent) => void;
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  onThemeChange: (theme: ThemeMode) => void;
  currentView?: "home" | "support" | "about";
  onSupportClick?: () => void;
  onAboutClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  resolvedLanguage,
  onLanguageChange,
  historyCount,
  onOpenHistory,
  onHomeClick,
  theme,
  resolvedTheme,
  onThemeChange,
  currentView = "home",
  onSupportClick,
  onAboutClick,
}) => {
  const t = translations[resolvedLanguage];

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 dark:bg-black/95 backdrop-blur-md text-stone-100 border-b border-stone-800 dark:border-stone-850 shadow-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          {/* Logo icon (Home redirect) */}
          <a
            href="/"
            onClick={onHomeClick}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-700/90 border border-blue-500/30 flex items-center justify-center text-blue-100 shadow-inner hover:bg-blue-600 active:scale-95 transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            title={t.homeTitle}
          >
            <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-200" />
          </a>

          <div className="min-w-0 flex items-center gap-2">
            {/* Brand title (Home redirect) - Guaranteed never truncated */}
            <a
              href="/"
              onClick={onHomeClick}
              className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-white hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded whitespace-nowrap"
              title={t.homeTitle}
            >
              IslamQA <span className="text-blue-400 font-semibold">{t.appSubtitle}</span>
            </a>

            {/* Source Link (redirects to islamqa.info) - Shown on sm and larger */}
            <a
              href="https://islamqa.info"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800/50 hover:bg-blue-900 hover:border-blue-600 hover:text-blue-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer shrink-0"
              title="islamqa.info"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{t.sourceBadge}</span>
              <ExternalLink className="w-2.5 h-2.5 text-blue-400/80" />
            </a>
          </div>
        </div>

        {/* Action Controls - Compact on mobile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Theme Mode Activation Button (System, Light, Dark) */}
          <ThemeToggle
            theme={theme}
            resolvedTheme={resolvedTheme}
            onThemeChange={onThemeChange}
          />

          {/* Language selector - Auto, বাংলা, English (Arabic removed per user request) */}
          <div className="relative flex items-center bg-stone-800/90 hover:bg-stone-750 border border-stone-700/70 rounded-lg px-1.5 sm:px-2 h-8 sm:h-9 text-xs transition-colors shrink-0">
            <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0 mr-1" />
            <select
              value={language}
              onChange={(e) =>
                onLanguageChange(e.target.value as Language)
              }
              aria-label="Select preferred language"
              className="bg-transparent text-stone-200 text-[11px] sm:text-xs font-medium focus:outline-none cursor-pointer pr-0.5"
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
            </select>
          </div>

          {/* History button */}
          <button
            id="history-toggle-btn"
            onClick={onOpenHistory}
            className="relative flex items-center justify-center h-8 w-8 sm:w-auto sm:h-9 sm:px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 text-xs font-medium transition-all border border-stone-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer shrink-0"
            title={t.historyTitle}
            aria-label={t.historyTitle}
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300" />
            <span className="hidden sm:inline sm:ml-1.5">{t.historyBtn}</span>
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:static sm:ml-1.5 min-w-[15px] h-3.5 sm:h-4 px-1 rounded-full bg-blue-600 text-[9px] sm:text-[10px] text-white font-bold flex items-center justify-center leading-none shadow-xs">
                {historyCount}
              </span>
            )}
          </button>

          {/* About Us Button */}
          {onAboutClick && (
            <button
              onClick={onAboutClick}
              className={`flex items-center justify-center gap-1.5 h-8 sm:h-9 px-2 sm:px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs border ${
                currentView === "about"
                  ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                  : "bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white border-stone-700/60"
              }`}
              title={t.aboutTitle}
              aria-label={t.aboutBtn}
            >
              <Info className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${currentView === "about" ? "text-white" : "text-blue-400"}`} />
              <span className="hidden sm:inline">{t.aboutBtn}</span>
            </button>
          )}

          {/* Support Us Button */}
          {onSupportClick && (
            <button
              onClick={onSupportClick}
              className={`flex items-center justify-center gap-1.5 h-8 sm:h-9 px-2 sm:px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs border ${
                currentView === "support"
                  ? "bg-pink-600 text-white border-pink-500 shadow-sm"
                  : "bg-pink-500/15 hover:bg-pink-500/25 active:scale-95 text-pink-300 hover:text-pink-100 border-pink-500/30"
              }`}
              title={t.supportTitle}
              aria-label={t.supportBtn}
            >
              <Heart
                className={`w-3.5 h-3.5 shrink-0 ${
                  currentView === "support"
                    ? "fill-white text-white"
                    : "fill-pink-400 text-pink-400"
                }`}
              />
              <span className="hidden sm:inline">{t.supportBtn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
