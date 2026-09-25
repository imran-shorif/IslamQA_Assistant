import React, { useState } from "react";
import { Sparkles, CheckCircle2, XCircle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export const ComparisonBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-4 sm:p-5 mb-6 text-stone-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-stone-100 flex items-center gap-2">
              সাধারণ সার্চ বারের চেয়ে কেন এটি উত্তম?
              <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                Context-Aware & Hallucination-Free
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              islamqa.info এর হাজার হাজার ফতোয়ার ওপর ভিত্তি করে আপনার সুনির্দিষ্ট প্রশ্নের গোছানো, সংক্ষিপ্ত ও দলিলভিত্তিক সমাধান।
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 shrink-0 px-2 py-1 rounded-md hover:bg-stone-800 transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "সংক্ষেপ করুন" : "তুলনা দেখুন"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Default Search limitation */}
          <div className="bg-stone-950/70 border border-red-950/40 rounded-xl p-3.5 text-stone-300">
            <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
              <XCircle className="w-4 h-4" />
              <span>সাধারণ ওয়েব সার্চ বার (Traditional Search)</span>
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li>• প্রাসঙ্গিক শব্দে সার্চ দিলে কেবল আর্টিকেল ও বড় ফতোয়ার স্তূপ দেখায়।</li>
              <li>• নিজে থেকে কোনো নির্দিষ্ট সিদ্ধান্ত বা মূল হুকুম গুছিয়ে বলে না।</li>
              <li>• নিজের বাস্তব পরিস্থিতির সাথে মিলিয়ে উত্তর খুঁজে পেতে ঘণ্টার পর ঘণ্টা দীর্ঘ লেখা পড়তে হয়।</li>
            </ul>
          </div>

          {/* Our AI model advantages */}
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3.5 text-stone-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>ইসলামকিউএ এআই সহকারী (Synthesized Q&A)</span>
            </div>
            <ul className="space-y-1.5 text-stone-300">
              <li>• আপনার প্রশ্নের প্রেক্ষাপট ও শর্ত পুঙ্খানুপুঙ্খ বুঝে পয়েন্ট আকারে জবাব দেয়।</li>
              <li>• <strong className="text-white">একক সোর্স:</strong> সম্পূর্ণভাবে <span className="underline decoration-emerald-500">islamqa.info</span> এর ফতোয়া থেকে তথ্য নেয়; বাইরে থেকে কিছুই বানায় না।</li>
              <li>• উত্তরের শেষে সরাসরি আসল ফতোয়ার লিঙ্ক ও নম্বর রেফারেন্স হিসেবে যুক্ত থাকে।</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
