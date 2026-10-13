import React, { useState } from "react";
import {
  Heart,
  Copy,
  Check,
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Server,
  Code2,
  Users,
  Gift,
} from "lucide-react";

interface SupportPageProps {
  onBackToHome: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBackToHome }) => {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const bkashNumber = "+880 1728-245120";
  const rawNumber = "+8801728245120";
  const reference = "fatwa-finder";

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(rawNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(reference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-in fade-in duration-300">
      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-medium transition-all mb-6 cursor-pointer shadow-xs active:scale-98"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>মূল পাতায় ফিরে যান</span>
      </button>

      {/* Main Support Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-500/30 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          <span>আমাদের সাপোর্ট করুন • Support Us</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-snug">
          আমাদের কার্যক্রমে আপনার <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-blue-400">সহযোগিতা ও সমর্থন</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mx-auto">
          আমাদের কার্যক্রমকে এগিয়ে নিতে এবং আমাদের টিমকে সাপোর্ট করতে বিকাশে ডোনেট করুন। সেন্ড মানি (পার্সোনাল) +880 1728-245120. Reference: fatwa-finder
        </p>
      </div>

      {/* Primary Donation Card */}
      <div className="bg-white dark:bg-stone-900 border-2 border-pink-200 dark:border-pink-900/60 rounded-3xl p-5 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* bKash Header Badge */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E2136E] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white">
                  bKash (বিকাশ)
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#E2136E]/10 text-[#E2136E] dark:text-pink-300 border border-[#E2136E]/20">
                  Personal
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                সেন্ড মানি (Send Money - পার্সোনাল অ্যাকাউন্ট)
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full font-medium border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            যাচাইকৃত অ্যাকাউন্ট
          </span>
        </div>

        {/* Number Box with One-Click Copy */}
        <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-750 rounded-2xl p-4 sm:p-5 mb-4 transition-colors">
          <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-1.5 flex items-center justify-between">
            <span>বিকাশ পার্সোনাল নম্বর (bKash Number):</span>
            <span className="text-[11px] text-stone-400 dark:text-stone-500">বাংলাদেশ (+880)</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 dark:text-white tracking-wider">
              {bkashNumber}
            </div>

            <button
              onClick={handleCopyNumber}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs active:scale-95 ${
                copiedNumber
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-[#E2136E] hover:bg-[#c2105e] text-white"
              }`}
              title="বিকাশ নম্বর কপি করুন"
            >
              {copiedNumber ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>নম্বর কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>নম্বর কপি করুন</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Reference Box */}
        <div className="bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-750 rounded-2xl p-3.5 sm:p-4 mb-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 block">
                রেফারেন্স (Reference):
              </span>
              <span className="font-mono font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                {reference}
              </span>
            </div>

            <button
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-200/80 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 text-xs font-medium transition-all cursor-pointer self-start sm:self-center"
              title="রেফারেন্স কপি করুন"
            >
              {copiedRef ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>রেফারেন্স কপি</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* How to Send Instructions */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>যেভাবে ডোনেট করবেন:</span>
          </h3>

          <ol className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed list-decimal pl-4">
            <li>
              আপনার <strong>bKash App</strong> ওপেন করুন অথবা ডায়াল করুন <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded font-mono text-xs">*247#</code>
            </li>
            <li>
              <strong>Send Money</strong> (সেন্ড মানি) অপশনটি নির্বাচন করুন।
            </li>
            <li>
              প্রাপকের নম্বরে পেস্ট করুন: <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{bkashNumber}</span>
            </li>
            <li>
              আপনার সামর্থ্য অনুযায়ী যেকোনো পরিমাণ অর্থ উল্লেখ করুন।
            </li>
            <li>
              রেফারেন্স হিসেবে লিখুন: <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{reference}</span>
            </li>
            <li>
              আপনার বিকাশ পিন দিয়ে সেন্ড মানি সফলভাবে সম্পন্ন করুন।
            </li>
          </ol>
        </div>
      </div>

      {/* Why Support Section */}
      <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 mb-8">
        <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30" />
          <span>আপনার অনুদান কেন গুরুত্বপূর্ণ?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
          <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5">
              <Gift className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-1">
              ডেভেলপারদের সময়ের মূল্য প্রদান
            </h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              যারা তাদের মূল্যবান সময় দিয়ে সাইটটির উন্নতির পিছনে কাজ করছেন, তাদেরকে উৎসাহ দেয়া এবং একে অপরকে উপহার দেয়ার সংস্কৃতি চালু রাখা।
            </p>
          </div>

          <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
              <Code2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-1">
              এআই ও ডাটাবেজ মডেল
            </h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              সরাসরি islamqa.info থেকে তথ্য নিয়ে বিশুদ্ধ ও ভেরিফায়েড উত্তর সাজাতে এআই টুলের খরচ।
            </p>
          </div>

          <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-1">
              বিনামূল্যে সবার জন্য উন্মুক্ত
            </h4>
            <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
              কোনো প্রকার বিজ্ঞাপন ছাড়া সকল মুসলিম ভাই-বোনের জন্য সেবাটি ফ্রি রাখা।
            </p>
          </div>
        </div>

        <p className="text-xs text-stone-500 dark:text-stone-400 mt-5 text-center italic">
          "আল্লাহর সন্তুষ্টি ও দ্বীনি জ্ঞান প্রসারে আপনার সামান্য সহযোগিতাও আমাদের জন্য অনেক মূল্যবান। জাযাকুমুল্লাহু খাইরান।"
        </p>
      </div>

      {/* Return to Home CTA */}
      <div className="text-center">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ইসলামিক প্রশ্নোত্তর পেজে ফিরে যান</span>
        </button>
      </div>
    </div>
  );
};
