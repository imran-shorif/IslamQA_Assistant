import React, { useState } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { SAMPLE_QUESTIONS, CATEGORIES, SampleQuestion } from "../data/sampleQuestions";

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
    <div className="mt-5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>প্রয়োজনীয় ফতোয়া ও সচরাচর জিজ্ঞাস্য (Sample Questions)</span>
        </div>
        <span className="text-[11px] text-stone-400">ক্লিক করে প্রশ্ন করুন</span>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white hover:bg-stone-100 text-stone-600 border border-stone-200"
            }`}
          >
            {cat.labelBn}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-2.5">
        {filteredQuestions.map((item) => (
          <button
            key={item.id}
            disabled={isLoading}
            onClick={() => onSelectQuestion(item.questionBn || item.question)}
            className="text-left bg-white hover:bg-emerald-50/70 border border-stone-200/90 hover:border-emerald-300 rounded-xl p-3 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md mb-1.5">
                {item.tag}
              </span>
              <p className="text-xs sm:text-sm font-medium text-stone-800 group-hover:text-emerald-950 line-clamp-2">
                {item.questionBn}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span>উত্তর জানুন</span>
              <Sparkles className="w-3 h-3 text-emerald-600" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
