import React, { useRef, useEffect } from "react";
import { Search, Sparkles, CornerDownLeft, Loader2, X } from "lucide-react";

interface QuestionInputProps {
  question: string;
  onChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  onClear: () => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  onChange,
  onSubmit,
  isLoading,
  onClear,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-300/80 dark:border-stone-800 focus-within:border-emerald-600 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all p-3 sm:p-4"
    >
      {/* Input Row */}
      <div className="flex items-start gap-2.5">
        <div className="pt-2 text-stone-400 dark:text-stone-500 shrink-0">
          <Search className="w-5 h-5 text-emerald-700/80 dark:text-emerald-400" />
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            id="islamic-question-input"
            value={question}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="আপনার ইসলামিক প্রশ্নটি লিখুন (যেমন: রোজা রাখা অবস্থায় ইনজেকশন নিলে কি রোজা ভাঙ্গে?)..."
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
            শুধুমাত্র <strong className="text-stone-700 dark:text-stone-200 font-semibold">islamqa.info</strong> এর ফতোয়া থেকে উত্তর ও রেফারেন্স দেওয়া হবে
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          {question.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={onClear}
              className="min-h-[42px] px-3 rounded-xl text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 dark:active:bg-stone-700 transition-colors text-xs font-medium flex items-center gap-1 cursor-pointer"
              title="প্রশ্ন মুছুন (Clear)"
            >
              <X className="w-4 h-4" />
              <span>মুছুন</span>
            </button>
          )}

          <button
            type="submit"
            id="submit-question-btn"
            disabled={!question.trim() || isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 active:bg-emerald-900 active:scale-[0.98] text-white font-medium text-sm transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>অনুসন্ধান হচ্ছে...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>উত্তর খুঁজুন</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-emerald-200/80 hidden sm:inline ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
