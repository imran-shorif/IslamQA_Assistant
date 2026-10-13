import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Search,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Layers,
  Heart,
  HelpCircle,
} from "lucide-react";

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToSupport?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigateToSupport,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </button>

        {onNavigateToSupport && (
          <button
            onClick={onNavigateToSupport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/25 text-xs font-semibold transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>সাপোর্ট করুন</span>
          </button>
        )}
      </div>

      {/* Hero Header */}
      <section className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>আমাদের লক্ষ্য ও প্রেক্ষাপট • About IslamQA Assistant</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-snug sm:leading-tight">
          কেন এবং কীভাবে তৈরি হলো <br />
          <span className="text-blue-600 dark:text-blue-400">
            ইসলামকিউএ এআই সহকারী?
          </span>
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
          দ্বীনি মাসআলা ও জীবনঘনিষ্ঠ ইসলামিক জিজ্ঞাসার উত্তর যেন ইন্টারনেটের ভুল তথ্যে বিভ্রান্ত না হয়, সেজন্য নির্ভরযোগ্য ইসলামকিউএ (islamqa.info) ভিত্তিক এই বিশেষ উদ্যোগ।
        </p>
      </section>

      {/* Featured Quote / Direct Message Box */}
      <section className="mb-10 p-5 sm:p-7 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border-2 border-blue-200/80 dark:border-blue-800/60 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200">
            <h2 className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-300 mb-1">
              আমাদের মূল কথা ও উদ্দেশ্য:
            </h2>
            <p className="italic text-stone-700 dark:text-stone-300 border-l-4 border-blue-500 pl-4 py-1">
              “অনলাইনে ইসলামিক বিভিন্ন প্রশ্ন-উত্তর খোঁজার ক্ষেত্রে চ্যাটজিপিটি/জেমিনি ইত্যাদিতে প্রশ্ন করলে অনেকসময় উত্তরের সাথে অতিরিক্ত/আন-ট্রাস্টেড তথ্য চলে আসে বা রেফারেন্স ছাড়া কুরআনের আয়াত/হাদিস বানিয়ে দেয়, এরকম সমস্যা মাঝে মধ্যে আমরা ফেইস করি। একারণে শুধুমাত্র <strong className="text-blue-700 dark:text-blue-400 not-italic font-semibold">islamqa.info</strong> এই সাইটকে বেইজ ধরে একটা মডেল বানিয়েছি (এখনও প্রাথমিক পর্যায়ে আছে)। এখানে প্রশ্ন করলে এই মডেল শুধুমাত্র ইসলামQA থেকেই উত্তর দেয় এবং তার সাথে রেফারেন্সও অ্যাড করে দেয় যে, ইসলামQA এর কোথা থেকে এই উত্তর দিলো।”
            </p>
            <p className="italic text-stone-700 dark:text-stone-300 border-l-4 border-blue-500 pl-4 py-1">
              “প্রশ্ন আসতে পারে উক্ত সাইটে গিয়ে সার্চ বারে গিয়ে ঐ প্রশ্ন টাইপ করলেই তো চলে, কিন্তু আমাদের এই মডেল আসলে একটু স্মার্ট। সার্চ বারে যেখানে প্রশ্ন করলে রিলেভেন্ট উত্তরের স্ট্যাক আসে, সেখানে আমাদের এই মডেল উক্ত প্রম্পটকে অ্যাসেস করে কনটেক্সট অনুযায়ী তার প্রশ্নের উত্তরের একটা সামারি দেয় ইউজারকে। প্রশ্নের উত্তরের জন্য সংশ্লিষ্ট সব পেজ ভিজিট করে সবগুলোর একটা গোছানো সামারি পেয়ে যাবেন রেফারেন্স সহ এখানে।”
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: The Core Problem */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            সাধারণ জেনারেটিভ এআই-এর সীমাবদ্ধতা
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="text-rose-600 dark:text-rose-400 font-bold text-sm mb-2 flex items-center gap-1.5">
              <span>✕</span>
              <span>মনগড়া তথ্য ও অনির্ভরযোগ্য দলিল (Hallucination)</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              ChatGPT বা Gemini এর মতো সার্বজনীন এআই মডেলগুলো ইন্টারনেটের কোটি কোটি মিশ্র উৎস থেকে তথ্য নেয়। ফলে ইসলামিক ফতোয়া জানতে চাইলে অনেক সময় অসত্য ব্যাখ্যা, ভুল রেফারেন্স বা অনির্ভরযোগ্য সনদ উপস্থাপন করে ফেলতে পারে।
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="text-rose-600 dark:text-rose-400 font-bold text-sm mb-2 flex items-center gap-1.5">
              <span>✕</span>
              <span>নির্দিষ্ট আলেম বা প্রাতিষ্ঠানিক জবাবদিহিতার অভাব</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              ইসলামের বিধান কুরআন-সুন্নাহ ও বিজ্ঞ ফকীহদের ইজতিহাদের ওপর প্রতিষ্ঠিত। অজ্ঞাত বা অপরীক্ষিত এআই প্রম্পট থেকে সরাসরি ইবাদত ও হালাল-হারামের সিদ্ধান্ত নেওয়া দ্বীনি দৃষ্টিতে অত্যন্ত ঝুঁকিপূর্ণ।
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: How IslamQA Assistant Solves It */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            আমাদের সমাধান: একক নির্ভরযোগ্য ভিত্তিমূল (islamqa.info)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                ১
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                শুধুমাত্র ইসলামকিউএ ডাটা
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                মডেলটিকে স্ট্রিক্টলি সীমাবদ্ধ রাখা হয়েছে শায়খ মুহাম্মদ সালিহ আল-মুনাজ্জিদ (হাফি.) পরিচালিত <strong>islamqa.info</strong> পোর্টালের ভেরিফায়েড ফতোয়ার মধ্যে।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>বাইরের কোনো উৎস নয়</span>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                ২
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                লাইভ রেফারেন্স ও লিঙ্ক
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                প্রতিটি উত্তরের স্বপক্ষে ইসলামকিউএ এর নির্দিষ্ট ফতোয়া নম্বর এবং সরাসরি মূল আরবী ও অনুবাদের লাইভ ওয়েবলিঙ্ক সংযুক্ত থাকে।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>১০০% যাচাইযোগ্য সূত্র</span>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                ৩
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1.5">
                প্রাথমিক পর্যায়ের সততা
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                টুলটি এখনো প্রাথমিক (Active Development) পর্যায়ে রয়েছে। আমরা প্রতিনিয়ত এর অ্যালগরিদম ও সারসংক্ষেপ নির্ভুল করার জন্য কাজ করছি।
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 font-medium flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>সতত পরিবর্তনশীল ও উন্নত</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why not just search on islamqa.info? */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Layers className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
            সাইটের সাধারণ সার্চ বারের চেয়ে কেন এটি আলাদা ও স্মার্ট?
          </h2>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Traditional Search */}
            <div className="space-y-3 p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-750">
              <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300 font-bold text-sm">
                <Search className="w-4 h-4 text-stone-500" />
                <span>ট্রেডিশনাল সার্চ বার (Traditional Search Bar)</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>প্রশ্ন লিখলে বড় বড় ফতোয়ার <strong>দীর্ঘ তালিকা বা স্ট্যাক</strong> এনে দেয়।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>প্রতিটি দীর্ঘ পেজে ঢুকে নিজের নির্দিষ্ট পরিস্থিতির সাথে মিল আছে কি না তা ঘণ্টার পর ঘণ্টা খুঁজে বের করতে হয়।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-stone-400 font-bold">•</span>
                  <span>কখনো কখনো একই বিষয়ে একাধিক ফতোয়া থাকলে সেগুলোর সমন্বিত সারমর্ম সহজে মেলে না।</span>
                </li>
              </ul>
            </div>

            {/* Our Model */}
            <div className="space-y-3 p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>আমাদের স্মার্ট মডেল (Context-Aware Synthesizer)</span>
              </div>
              <ul className="text-xs sm:text-[13px] text-stone-700 dark:text-stone-300 space-y-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>ইউজারের প্রম্পটকে নিখুঁতভাবে <strong>অ্যাসেস করে কনটেক্সট বুঝে নেয়</strong>।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>প্রশ্নের সাথে সংশ্লিষ্ট সব পেজ স্বয়ংক্রিয়ভাবে ভিজিট করে মূল <strong>হুকুম ও সারসংক্ষেপ</strong> তুলে ধরে।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>সব উত্তরের নিচে প্রাসঙ্গিক সবকয়টি ফতোয়ার রেফারেন্স ও লাইভ লিঙ্ক একসাথে গুছিয়ে দেয়।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Scholarly Guidance & Ethical Reminder */}
      <section className="mb-10 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>আমাদের বিনম্র নিবেদন ও ডিসক্লেইমার:</span>
        </h3>
        <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-400 leading-relaxed">
          এই অ্যাসিস্ট্যান্টটি মূলত সাধারণ জ্ঞানার্জন ও ইসলামিক তথ্যে দ্রুত পৌঁছানোর সুবিধার জন্য তৈরি। এটি কোনো নতুন ফতোয়া প্রদান করে না কিংবা সরাসরি মুফতি বা বিজ্ঞ আলেমের বিকল্প নয়। আপনার ব্যক্তিগত জটিল পারিবারিক, অর্থনৈতিক বা ফৌজদারি স্পর্শকাতর মাসআলায় সবসময় স্থানীয় বিজ্ঞ ও নির্ভরযোগ্য আলেমে দ্বীনের সাথে সরাসরি পরামর্শ করার অনুরোধ করা হচ্ছে।
        </p>
      </section>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-stone-200/80 dark:border-stone-800">
        <button
          onClick={onBackToHome}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রশ্নোত্তর পাতায় ফিরে যান</span>
        </button>

        {onNavigateToSupport && (
          <button
            onClick={onNavigateToSupport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-98 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all border border-stone-200 dark:border-stone-700 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500/20" />
            <span>আমাদের সাপোর্ট করুন (bKash)</span>
          </button>
        )}
      </div>
    </div>
  );
};
