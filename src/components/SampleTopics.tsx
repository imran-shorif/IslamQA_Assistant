import React, { useState } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { SAMPLE_QUESTIONS, CATEGORIES } from "../data/sampleQuestions";

interface SampleTopicsProps {
  onSelectQuestion: (questionText: string) => void;
  isLoading: boolean;
}

export const SampleTopics: React.FC<SampleTopicsProps> = ({
  onSelectQuestion,
  isLoading,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

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

  return (
    <section className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700">
          <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>প্রয়োজনীয় ফতোয়া ও সচরাচর জিজ্ঞাস্য</span>
        </div>
        <span className="text-[11px] text-stone-400 hidden xs:inline">ক্লিক করে প্রশ্ন করুন</span>
      </div>

      {/* Category Pills - Smooth Touch Scrolling */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar touch-pan-x">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 ${
              activeCategory === cat.id
                ? "bg-emerald-800 text-white shadow-xs font-semibold"
                : "bg-white hover:bg-stone-100 text-stone-600 border border-stone-200"
            }`}
          >
            {cat.labelBn}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 mt-2.5">
        {filteredQuestions.map((item) => (
          <button
            key={item.id}
            disabled={isLoading}
            onClick={() => onSelectQuestion(item.questionBn || item.question)}
            className="text-left bg-white hover:bg-emerald-50/70 active:bg-emerald-50/90 active:scale-[0.99] border border-stone-200/90 hover:border-emerald-300 rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md mb-1.5">
                {item.tag}
              </span>
              <p className="text-xs sm:text-sm font-medium text-stone-800 group-hover:text-emerald-950 line-clamp-2 leading-snug">
                {item.questionBn}
              </p>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
              <span className="group-hover:underline">উত্তর অনুসন্ধান করুন</span>
              <Sparkles className="w-3 h-3 text-emerald-600" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
