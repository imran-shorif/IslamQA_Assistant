import React from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Compass,
  Database,
  Layers,
  Sparkles,
} from "lucide-react";
import { translations, Language } from "../data/translations";
import { MADHHAB_CHRONOLOGY, MadhhabCategory } from "../types";

interface ReferencePageProps {
  onBackToHome: () => void;
  language?: Language;
}

export const ReferencePage: React.FC<ReferencePageProps> = ({
  onBackToHome,
  language = "bn",
}) => {
  const t = translations[language] || translations.bn;

  const getMadhabName = (item: (typeof MADHHAB_CHRONOLOGY)[number]) => {
    switch (language) {
      case "en":
        return item.nameEn;
      case "ar":
        return item.nameAr;
      case "ur":
        return item.nameUr;
      default:
        return item.nameBn;
    }
  };

  const getUpcomingNote = (item: (typeof MADHHAB_CHRONOLOGY)[number]) => {
    switch (language) {
      case "en":
        return item.upcomingNoteEn;
      case "ar":
        return item.upcomingNoteAr;
      case "ur":
        return item.upcomingNoteUr;
      default:
        return item.upcomingNoteBn;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.aboutBackBtn}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 text-xs font-semibold">
          <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{language === "en" ? "Knowledge Architecture" : language === "ar" ? "هندسة المراجع" : language === "ur" ? "علمی مراجع" : "রেফারেন্স ও সোর্স ব্রেন"}</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2.5">
          <Compass className="w-4 h-4" />
          <span>
            {language === "en"
              ? "Multi-Source Islamic Knowledge Engine"
              : language === "ar"
              ? "محرك الفتاوى متعدد المدارس والمصادر"
              : language === "ur"
              ? "کثیر المصادر اسلامی سرچ انجن"
              : "সার্বজনীন ইসলামিক জ্ঞান ও গবেষণা প্ল্যাটফর্ম"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight mb-3">
          {language === "en"
            ? "Search Fatwa Knowledge Brain & References"
            : language === "ar"
            ? "مراجع ومصادر سيرش فتاوى المعتمدة"
            : language === "ur"
            ? "سرچ فتاویٰ کے مستند علمی مراجع و مصادر"
            : "Search Fatwa রেফারেন্স ও সোর্স ব্রেন"}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {language === "en"
            ? "Search Fatwa is built to be a generalized, multi-school Islamic research platform. Instead of relying on a single perspective, it routes your inquiries to verified, authentic fatwa databases tailored to each madhhab and tradition."
            : language === "ar"
            ? "تم تصميم سيرش فتاوى كمنصة إسلامية شاملة لا تقتصر على جهة واحدة، بل تهدف إلى ربط كل مذهب بمصادره وقواعد بياناته الفقهية المعتمدة لتحقيق دقة علمية متكاملة."
            : language === "ur"
            ? "سرچ فتاویٰ کو ایک جامع و غیر جانبدار پلیٹ فارم بنایا گیا ہے۔ یہ کسی ایک ویب سائٹ تک محدود رہنے کے بجائے ہر مکتبہ فکر کو اس کے اپنے مستند اور معتبر فتاویٰ ڈیٹا بیس سے جوڑتا ہے۔"
            : "সার্চ ফতোয়াকে একটি সার্বজনীন ও স্বয়ংসম্পূর্ণ ইসলামিক গবেষণা প্ল্যাটফর্ম হিসেবে প্রস্তুত করা হচ্ছে। এটি কোনো একক সাইটের ওপর নির্ভরশীল নয়; বরং প্রতিটি মাযহাব ও মতাদর্শের জন্য তাদের নিজস্ব প্রতিষ্ঠিত ও নির্ভরযোগ্য ফতোয়া পোর্টালকে সরাসরি ব্রেন হিসেবে সংযুক্ত করা হচ্ছে।"}
        </p>
      </header>

      {/* Information Notice */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-stone-700 dark:text-stone-300">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
              {language === "en"
                ? "Current Active Brains & Planned Integrations"
                : language === "ar"
                ? "المصادر المفعلة حالياً والمصادر قيد الإضافة"
                : language === "ur"
                ? "موجودہ فعال مراجع اور زیرِ تکمیل پورٹلز"
                : "বর্তমান সক্রিয় ব্রেন ও ভবিষ্যৎ সংযোজন রূপরেখা"}
            </h3>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {language === "en"
                ? "Currently, 'All', 'Hanbali', and 'Salafi' inquiries are synthesized directly from islamqa.info (supervised by Sheikh Muhammad Saalih al-Munajjid). Dedicated authentic portals for Hanafi, Shafi'i, Maliki, and Shia traditions will be connected in upcoming iterations."
                : language === "ar"
                ? "حالياً يتم استقاء فتاوى 'جميع المصادر' و'المذهب الحنبلي' و'السلفي' مباشرة من موقع الإسلام سؤال وجواب (islamqa.info). وسيتم ربط المواقع المعتمدة للمذاهب الحنفي والشافعي والمالكي والشيعي في التحديثات القادمة."
                : language === "ur"
                ? "فی الوقت 'تمام مصادر'، 'حنبلی' اور 'سلفی' کے سوالات کے جوابات براہِ راست islamqa.info سے حاصل کیے جا رہے ہیں۔ حنفی، شافعی، مالکی اور شیعہ کے معتبر ویب پورٹلز اگلی اپڈیٹ میں جوڑے جا رہے ہیں۔"
                : "বর্তমানে 'All (সকল)', 'হাম্বলী' ও 'সালাফী' ক্যাটাগরির জন্য islamqa.info সাইটের তাহকীক ও ফতোয়া ডাটাবেজ সক্রিয় রয়েছে। হানাফী, শাফেয়ী, মালিকী ও শিয়া ক্যাটাগরির জন্য ডেডিকেটেড নির্ভরযোগ্য পোর্টালসমূহ পরবর্তী আপডেটে সরাসরি যুক্ত করা হচ্ছে।"}
            </p>
          </div>
        </div>
      </div>

      {/* Category Chronology Matrix */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {language === "en"
              ? "Chronological School & Source Breakdown"
              : language === "ar"
              ? "ترتيب المصادر والمدارس الفقهية"
              : language === "ur"
              ? "مکاتب فکر اور مراجع کی ترتیب"
              : "মাযহাব ও উৎসসমূহের তালিকা (Chronological Order)"}
          </h2>
          <span className="text-xs text-stone-400 dark:text-stone-500">
            {MADHHAB_CHRONOLOGY.length} {language === "en" ? "Categories" : "ক্যাটাগরি"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {MADHHAB_CHRONOLOGY.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                item.isBrainActive
                  ? "bg-white dark:bg-stone-900 border-emerald-500/30 dark:border-emerald-500/20 shadow-xs hover:border-emerald-500/50"
                  : "bg-stone-50/70 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800/80 opacity-90"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      item.isBrainActive
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                    }`}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-stone-900 dark:text-white text-base">
                        {getMadhabName(item)}
                      </h3>

                      {item.isBrainActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/70 px-2.5 py-0.5 rounded-md border border-emerald-300/40 dark:border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>{language === "en" ? "Active Brain" : language === "ar" ? "مصدر مفعل" : language === "ur" ? "فعال ماخذ" : "সক্রিয় ব্রেন"}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/70 px-2.5 py-0.5 rounded-md border border-amber-300/40 dark:border-amber-800/40">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{language === "en" ? "Adding in Next Update" : language === "ar" ? "يُضاف في التحديث القادم" : language === "ur" ? "اگلی اپڈیٹ میں شامل ہوگا" : "পরবর্তী আপডেটে যুক্ত হবে"}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      {getUpcomingNote(item)}
                    </p>
                  </div>
                </div>

                {/* Right side connection info */}
                <div className="sm:text-right shrink-0 pl-10 sm:pl-0">
                  {item.isBrainActive && item.activeBrainUrl ? (
                    <a
                      href={item.activeBrainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-700/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{item.activeBrainName}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  ) : (
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-medium italic">
                      {language === "en" ? "Sources pending input" : language === "ar" ? "بانتظار ربط المصدر" : language === "ur" ? "سورس زیرِ التواء" : "সাইট লিঙ্ক প্রস্তুত হচ্ছে"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestion Section */}
      <footer className="mt-10 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
        <Sparkles className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
        <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1">
          {language === "en"
            ? "Have recommendations for authentic online fatwa portals?"
            : language === "ar"
            ? "هل تقترح مواقع موثوقة لإضافتها لمذهب معين؟"
            : language === "ur"
            ? "کیا آپ کے پاس کسی مخصوص مکتبہ فکر کی معتبر ویب سائٹ کی تجویز ہے؟"
            : "কোনো মাযহাবের জন্য নির্ভরযোগ্য ফতোয়া ওয়েবসাইটের প্রস্তাব আছে?"}
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 max-w-lg mx-auto mb-4">
          {language === "en"
            ? "We are actively integrating verified portals for Hanafi, Shafi'i, Maliki, and Shia research to make Search Fatwa truly universal."
            : language === "ar"
            ? "نحن نرحب باقتراحات المواقع الرسمية والمعتمدة لكافة المدارس الفقهية لجعل المنصة مرجعاً شاملاً لجميع المسلمين."
            : language === "ur"
            ? "ہم تمام مکاتب فکر کے مصدقہ فتاویٰ پورٹلز کو سرچ فتاویٰ سے جوڑنے کے لیے کوشاں ہیں۔"
            : "হানাফী, শাফেয়ী, মালিকী ও শিয়া সহ সকল ঘরানার স্বীকৃত অনলাইন ফতোয়া ডাটাবেজ সংযুক্ত করার কাজ চলমান রয়েছে।"}
        </p>
        <button
          onClick={onBackToHome}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
        >
          {language === "en" ? "Back to Search Fatwa" : "সার্চ ফতোয়ায় ফিরে যান"}
        </button>
      </footer>
    </div>
  );
};
