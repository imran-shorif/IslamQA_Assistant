import React from "react";
import { BookOpen, ShieldCheck, History, Globe, ExternalLink } from "lucide-react";

interface HeaderProps {
  language: "auto" | "bn" | "en" | "ar";
  onLanguageChange: (lang: "auto" | "bn" | "en" | "ar") => void;
  historyCount: number;
  onOpenHistory: () => void;
  onHomeClick?: (e: React.MouseEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  historyCount,
  onOpenHistory,
  onHomeClick,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Logo icon (Home redirect) */}
          <a
            href="/"
            onClick={onHomeClick}
            className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/30 flex items-center justify-center text-emerald-100 shadow-inner hover:bg-emerald-600 transition-all hover:scale-105 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title="মূল পাতায় ফিরে যান (Go to Home)"
          >
            <BookOpen className="w-5 h-5 text-emerald-300" />
          </a>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Brand title (Home redirect) */}
              <a
                href="/"
                onClick={onHomeClick}
                className="font-bold text-lg tracking-tight text-white hover:text-emerald-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                title="মূল পাতায় ফিরে যান (Go to Home)"
              >
                IslamQA <span className="text-emerald-400 font-semibold">Assistant</span>
              </a>

              {/* Source Link (redirects to islamqa.info) */}
              <a
                href="https://islamqa.info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900 hover:border-emerald-600 hover:text-emerald-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
                title="ইসলামকিউএ ওয়েবসাইট ভিজিট করুন (islamqa.info)"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Source: islamqa.info</span>
                <ExternalLink className="w-2.5 h-2.5 text-emerald-400/80" />
              </a>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              বিশুদ্ধ ইসলামিক ফতোয়া ও গবেষণালব্ধ সমাধান (Shaykh Muhammad Saalih al-Munajjid)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center gap-1 bg-stone-800/90 border border-stone-700/70 rounded-lg px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={language}
              onChange={(e) =>
                onLanguageChange(e.target.value as "auto" | "bn" | "en" | "ar")
              }
              aria-label="Select preferred language"
              className="bg-transparent text-stone-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="auto" className="bg-stone-900 text-stone-200">
                Auto-Detect / স্বয়ংক্রিয়
              </option>
              <option value="bn" className="bg-stone-900 text-stone-200">
                বাংলা (Bengali)
              </option>
              <option value="en" className="bg-stone-900 text-stone-200">
                English
              </option>
              <option value="ar" className="bg-stone-900 text-stone-200">
                العربية (Arabic)
              </option>
            </select>
          </div>

          {/* History button */}
          <button
            id="history-toggle-btn"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors border border-stone-700/60"
            title="Past Queries History"
          >
            <History className="w-4 h-4 text-stone-300" />
            <span className="hidden sm:inline">পূর্ববর্তী প্রশ্ন</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-emerald-600 text-[10px] text-white font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
