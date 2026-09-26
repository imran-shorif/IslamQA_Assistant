import React, { useState } from "react";
import { Sparkles, CheckCircle2, XCircle, ChevronDown, ChevronUp, Zap, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export const ComparisonBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ScrollReveal animation="fade-up" delay={100} className="mb-5 sm:mb-6">
      <section className="bg-stone-900/60 dark:bg-stone-900/80 border border-stone-800 dark:border-stone-800/90 rounded-2xl p-3.5 sm:p-5 text-stone-200 shadow-sm backdrop-blur-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 shadow-inner">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-stone-100">
                  সাধারণ সার্চ বনাম ইসলামকিউএ এআই
                </h3>
                <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-900/70 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  Context-Aware
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed max-w-2xl">
                ওয়েব সার্চের বড় ফতোয়ার দীর্ঘ স্তূপ পড়ার বদলে, আপনার সুনির্দিষ্ট প্রশ্নের সারসংক্ষেপ, হুকুম ও সরাসরি ফতোয়া রেফারেন্স পেয়ে যান মুহূর্তেই।
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="min-h-[38px] px-3 py-1.5 text-xs text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-750 active:scale-95 rounded-xl border border-stone-700/60 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "সংক্ষেপ" : "পার্থক্য দেখুন"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-stone-400" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-300">
            {/* Default Search limitation */}
            <div className="bg-stone-950/60 border border-rose-950/50 rounded-xl p-3.5 text-stone-300">
              <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2.5">
                <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>সাধারণ সার্চ ইঞ্জিন (Traditional Search)</span>
              </div>
              <ul className="space-y-2 text-stone-400 leading-relaxed text-[11px] sm:text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>প্রাসঙ্গিক কীওয়ার্ডে সার্চ দিলে শত শত দীর্ঘ আর্টিকেল ও বড় ফতোয়ার লিঙ্ক এনে দেয়।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>সরাসরি নির্দিষ্ট সিদ্ধান্ত বা 'জায়েজ/না-জায়েজ' হুকুম আলাদা করে চিহ্নিত করে না।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>নিজের বাস্তব পরিস্থিতির সাথে উত্তর মেলাতে ঘণ্টার পর ঘণ্টা দীর্ঘ লেখা খুঁজতে হয়।</span>
                </li>
              </ul>
            </div>

            {/* Our AI model advantages */}
            <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-3.5 text-stone-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>ইসলামকিউএ এআই সহকারী (Synthesized Q&A)</span>
              </div>
              <ul className="space-y-2 text-stone-300 leading-relaxed text-[11px] sm:text-xs">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>আপনার প্রশ্নের প্রেক্ষাপট বুঝে প্রথমেই <strong>মূল হুকুম ও সারসংক্ষেপ</strong> তুলে ধরে।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>একক নির্ভরযোগ্য সোর্স:</strong> সম্পূর্ণভাবে <span className="text-emerald-300 font-medium">islamqa.info</span> এর ফতোয়া থেকে তথ্য সংকলন করে।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>উত্তরের শেষে প্রতিটি তথ্যের পক্ষে আসল ফতোয়ার লাইভ লিঙ্ক ও নম্বর যুক্ত থাকে।</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
};
