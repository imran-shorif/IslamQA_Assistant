import React from "react";
import { Users, Clock, MapPin, Activity } from "lucide-react";
import { translations, Language } from "../data/translations";
import { useVisitorStats } from "../lib/visitorCounter";
import { useUserCity, useUserLocalTime } from "../lib/geoUtils";

interface VisitorCounterProps {
  language: Language;
  variant?: "hero" | "footer";
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  language,
  variant = "hero",
}) => {
  const { totalVisitors, liveCount, formattedTotal, formattedLive, isLoading } =
    useVisitorStats(language);
  const { city } = useUserCity(language);
  const { formattedTime } = useUserLocalTime(language);
  const t = translations[language] || translations.bn;

  const defaultTotalNum =
    language === "bn" ? "১" : language === "ar" ? "١" : language === "ur" ? "۱" : "1";

  // Footer Variant: Ultra-compact, elegant unified footer badge
  if (variant === "footer") {
    return (
      <div
        className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-1 rounded-full bg-stone-100/90 dark:bg-stone-800/80 border border-stone-250 dark:border-stone-700/60 text-[11px] text-stone-600 dark:text-stone-300 shadow-2xs transition-all"
        title={t.visitorCountTitle}
      >
        {/* Live Active */}
        <div className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
            {formattedLive}
          </span>
          <span className="text-stone-500 dark:text-stone-400">
            {t.visitorCountLive}
          </span>
        </div>

        <span className="text-stone-300 dark:text-stone-600">•</span>

        {/* Lifetime Visitors */}
        <div className="inline-flex items-center gap-1">
          <Users className="w-3 h-3 text-blue-500 dark:text-blue-400 shrink-0" />
          <span className="text-stone-500 dark:text-stone-400">
            {t.visitorLifetimeLabel}:
          </span>
          {isLoading ? (
            <span className="inline-block w-8 h-2.5 bg-stone-300 dark:bg-stone-700 animate-pulse rounded"></span>
          ) : (
            <span className="font-bold text-stone-800 dark:text-stone-100 font-mono">
              {formattedTotal || defaultTotalNum}{" "}
              <span className="font-sans font-normal text-[10px] text-stone-500 dark:text-stone-400">
                {t.visitorCountSuffix}
              </span>
            </span>
          )}
        </div>

        <span className="text-stone-300 dark:text-stone-600">•</span>

        {/* City & Live Clock */}
        <div className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-300 font-mono">
          <MapPin className="w-3 h-3 text-rose-500 dark:text-rose-400 shrink-0" />
          <span className="font-sans font-medium text-stone-700 dark:text-stone-200">
            {city}
          </span>
          <Clock className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0 ml-0.5" />
          <span className="text-[10px] tracking-tight">{formattedTime}</span>
        </div>
      </div>
    );
  }

  // Hero Variant: Prominent, beautifully segmented live metrics badges
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-2 select-none">
      {/* 1. Live Online Visitor Pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-250 dark:border-emerald-800/80 text-[11px] sm:text-xs text-emerald-800 dark:text-emerald-300 shadow-2xs transition-all hover:border-emerald-400/70"
        title={t.visitorLiveSuffix}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="font-medium text-emerald-700 dark:text-emerald-300">
          {t.visitorCountLive}:
        </span>
        <span className="font-bold font-mono tracking-tight text-emerald-900 dark:text-emerald-100">
          {formattedLive}{" "}
          <span className="font-sans font-normal text-[10px] sm:text-[11px] opacity-90">
            {t.visitorCountSuffix}
          </span>
        </span>
      </div>

      {/* 2. Lifetime Total Visitors Pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-[11px] sm:text-xs text-stone-700 dark:text-stone-300 shadow-2xs transition-all hover:border-blue-400/60 dark:hover:border-blue-500/60"
        title={t.visitorCountTitle}
      >
        <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="font-medium text-stone-600 dark:text-stone-400">
          {t.visitorLifetimeLabel}:
        </span>

        {isLoading ? (
          <span className="inline-block w-10 h-3 bg-stone-200 dark:bg-stone-800 animate-pulse rounded"></span>
        ) : (
          <span className="font-bold text-stone-900 dark:text-white font-mono tracking-tight">
            {formattedTotal || defaultTotalNum}{" "}
            <span className="font-sans font-normal text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400">
              {t.visitorCountSuffix}
            </span>
          </span>
        )}
      </div>

      {/* 3. User's City and Live Local Clock Pill */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-[11px] sm:text-xs text-amber-900 dark:text-amber-200 shadow-2xs transition-all hover:border-amber-400/60"
        title={`${t.visitorCityLabel} & ${t.visitorLocalTimeLabel}`}
      >
        <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
        <span className="font-semibold text-stone-800 dark:text-stone-100">
          {city}
        </span>

        <span className="text-amber-400/80 dark:text-amber-600/80">•</span>

        <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
        <span className="font-mono font-medium tracking-tight text-amber-900 dark:text-amber-200">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};
