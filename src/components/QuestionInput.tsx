import React, { useRef, useEffect } from "react";
import {
  Search,
  Sparkles,
  CornerDownLeft,
  Loader2,
  X,
  Shuffle,
  Compass,
  Check,
} from "lucide-react";
import { getRandomIslamicQuestion } from "../data/sampleQuestions";
import { translations, Language } from "../data/translations";
import {
  MADHHAB_CHRONOLOGY,
  MadhhabCategory,
} from "../types";

interface QuestionInputProps {
  question: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  onClear: () => void;
  language: Language;
  selectedSources: MadhhabCategory[];
  onSourcesChange: (sources: MadhhabCategory[]) => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  onChange,
  onSubmit,
  isLoading,
  onClear,
  language,
  selectedSources,
  onSourcesChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = translations[language] || translations.bn;

  // Auto-resize textarea based on input content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [question]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (question.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleGenerateRandom = () => {
    const randomQ = getRandomIslamicQuestion(question, language);
    onChange(randomQ);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  const toggleSource = (id: MadhhabCategory) => {
    if (id === "all") {
      onSourcesChange(["all"]);
      return;
    }

    let next: MadhhabCategory[] = selectedSources.filter((s) => s !== "all");
    if (next.includes(id)) {
      next = next.filter((s) => s !== id);
      if (next.length === 0) {
        next = ["all"];
      }
    } else {
      next.push(id);
    }
    onSourcesChange(next);
  };

  const getSchoolName = (school: (typeof MADHHAB_CHRONOLOGY)[number]) => {
    switch (language) {
      case "en":
        return school.nameEn;
      case "ar":
        return school.nameAr;
      case "ur":
        return school.nameUr;
      default:
        return school.nameBn;
    }
  };



  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-300/80 dark:border-stone-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all p-3 sm:p-4"
    >
      {/* Source / Madhhab School Selector - Exact requested chronology */}
      <div className="mb-3.5 pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <label className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.sourcePrompt}</span>
          </label>
          <span className="text-[11px] text-stone-400 dark:text-stone-500">
            {t.sourcePromptHelp}
          </span>
        </div>

        {/* Chronological Source Buttons: all, hanafi, shafeyi, maliki, hanbali, salafi, shia */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {MADHHAB_CHRONOLOGY.map((school) => {
            const isSelected = selectedSources.includes(school.id);
            return (
              <button
                type="button"
                key={school.id}
                onClick={() => toggleSource(school.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border active:scale-95 ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700"
                }`}
                title={
                  school.isBrainActive
                    ? `${school.nameBn} - সক্রিয় ব্রেন (Search Fatwa Brain)`
                    : `${school.nameBn}`
                }
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{getSchoolName(school)}</span>
                {school.isBrainActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-white" : "bg-emerald-500"
                    }`}
                    title="Search Fatwa Brain"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>



      {/* Input Row */}
      <div className="flex items-start gap-2.5">
        <div className="pt-2 text-stone-400 dark:text-stone-500 shrink-0">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            id="islamic-question-input"
            value={question}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            rows={2}
            disabled={isLoading}
            className="w-full bg-transparent border-0 resize-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 text-base leading-relaxed focus:ring-0 focus:outline-none p-0 min-h-[52px]"
          />
        </div>
      </div>

      {/* Action / Toolbar Footer */}
      <div className="mt-2 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 inline-block"></span>
          <span className="truncate">
            {t.inputFooterNotice}
          </span>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 w-full sm:w-auto shrink-0">
          {question.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={onClear}
              className="min-h-[42px] px-3 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer shrink-0"
              title={t.inputClear}
            >
              <X className="w-4 h-4" />
              <span>{t.inputClear}</span>
            </button>
          )}

          {/* Random Question Generator Button */}
          <button
            type="button"
            id="random-question-btn"
            onClick={handleGenerateRandom}
            disabled={isLoading}
            title={t.inputRandom}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-stone-750 active:bg-stone-200 dark:active:bg-stone-700 active:scale-[0.98] text-stone-700 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-300 border border-stone-250 dark:border-stone-700 font-medium text-xs sm:text-sm transition-all shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{t.inputRandom}</span>
          </button>

          <button
            type="submit"
            id="submit-question-btn"
            disabled={!question.trim() || isLoading}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:bg-emerald-800 active:scale-[0.98] text-white font-medium text-xs sm:text-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{t.inputSearching}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{t.inputSubmit}</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-emerald-200/80 hidden sm:inline ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
