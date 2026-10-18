import React, { useState } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { SAMPLE_QUESTIONS, CATEGORIES } from "../data/sampleQuestions";
import { translations, Language } from "../data/translations";

interface SampleTopicsProps {
  onSelectQuestion: (questionText: string) => void;
  isLoading: boolean;
  language: Language;
}

export const SampleTopics: React.FC<SampleTopicsProps> = ({
  onSelectQuestion,
  isLoading,
  language,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const t = translations[language] || translations.bn;

  const filteredQuestions =
    activeCategory === "all"
      ? SAMPLE_QUESTIONS
      : SAMPLE_QUESTIONS.filter((q) => {
          if (activeCategory === "salah") return q.category.includes("Salah");
          if (activeCategory === "sawm") return q.category.includes("Sawm");
          if (activeCategory === "finance") return q.category.includes("Transactions");
          if (activeCategory === "taharah") return q.category.includes("Taharah");
          if (activeCategory === "family") return q.category.includes("Marriage") || q.category.includes("Family");
          return true;
        });

  const getCategoryLabel = (cat: typeof CATEGORIES[0]) => {
    if (language === "ar") return cat.labelAr;
    if (language === "ur") return cat.labelUr;
    if (language === "en") return cat.labelEn;
    return cat.labelBn;
  };

  return (
    <section className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">
          <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t.topicsHeading}</span>
        </div>
        <span className="text-[11px] text-stone-400 dark:text-stone-500 hidden xs:inline">
          {t.topicsSubtitle}
        </span>
      </div>

      {/* Category Pills - Smooth Touch Scrolling */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar touch-pan-x">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 ${
              activeCategory === cat.id
                ? "bg-emerald-600 dark:bg-emerald-600 text-white shadow-xs font-semibold"
                : "bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 mt-2.5">
        {filteredQuestions.map((item) => {
          const displayText =
            language === "ar"
              ? (item.questionAr || item.question)
              : language === "ur"
              ? (item.questionUr || item.question)
              : language === "en"
              ? item.question
              : (item.questionBn || item.question);

          const displayTag =
            language === "ar"
              ? (item.tagAr || item.tagEn)
              : language === "ur"
              ? (item.tagUr || item.tagEn)
              : language === "en"
              ? item.tagEn
              : item.tag;

          return (
            <button
              key={item.id}
              disabled={isLoading}
              onClick={() => onSelectQuestion(displayText)}
              className="text-start bg-white dark:bg-stone-900 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 active:bg-blue-50/90 dark:active:bg-blue-950/60 active:scale-[0.99] border border-stone-200/90 dark:border-stone-800 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[10px] font-semibold text-blue-800 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/80 px-2 py-0.5 rounded-md mb-1.5 border border-blue-200/50 dark:border-blue-800/50">
                  {displayTag}
                </span>
                <p className="text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 group-hover:text-blue-950 dark:group-hover:text-blue-300 line-clamp-2 leading-snug">
                  {displayText}
                </p>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                <span className="group-hover:underline">{t.topicsSearchCta}</span>
                <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
