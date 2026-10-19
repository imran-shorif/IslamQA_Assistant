import React from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Compass,
  Database,
  Layers,
  Sparkles,
  Globe,
  Share2,
} from "lucide-react";
import { translations, Language } from "../data/translations";
import { MADHHAB_CHRONOLOGY, MadhhabCategory, BrainPortal } from "../types";

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

  const getSummaryNote = (item: (typeof MADHHAB_CHRONOLOGY)[number]) => {
    switch (language) {
      case "en":
        return item.summaryNoteEn;
      case "ar":
        return item.summaryNoteAr;
      case "ur":
        return item.summaryNoteUr;
      default:
        return item.summaryNoteBn;
    }
  };

  const getPortalDesc = (portal: BrainPortal) => {
    switch (language) {
      case "en":
        return portal.descriptionEn;
      case "ar":
        return portal.descriptionAr;
      case "ur":
        return portal.descriptionUr;
      default:
        return portal.descriptionBn;
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
          <span>
            {language === "en"
              ? "Multi-Brain Knowledge Base"
              : language === "ar"
              ? "شبكة مصادر الفتاوى المعتمدة"
              : language === "ur"
              ? "کثیر المراجع علمی ڈیٹا بیس"
              : "রেফারেন্স ও সোর্স ব্রেন"}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2.5">
          <Compass className="w-4 h-4" />
          <span>
            {language === "en"
              ? "Multi-School Islamic Knowledge Engine"
              : language === "ar"
              ? "محرك الفتاوى والبحث المقارن الشامل"
              : language === "ur"
              ? "کثیر المصادر اسلامی سرچ انجن"
              : "সার্বজনীন ইসলামিক জ্ঞান ও ফতোয়া প্ল্যাটফর্ম"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight mb-3">
          {language === "en"
            ? "Search Fatwa Knowledge Brain & Verified Portals"
            : language === "ar"
            ? "شبكة مراجع وقواعد بيانات سيرش فتاوى المعتمدة"
            : language === "ur"
            ? "سرچ فتاویٰ کے مستند علمی مراجع و مصادر"
            : "Search Fatwa রেফারেন্স ও সোর্স ব্রেন"}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {language === "en"
            ? "Search Fatwa is a generalized Islamic inquiry platform. When you ask a question, our AI brain routes your question to the authoritative, verified fatwa portals of the selected madhhab or category, citing every reference with direct live hyperlinks."
            : language === "ar"
            ? "سيرش فتاوى منصة فقهية شاملة غير منحازة لمصدر واحد. عند طرح أي سؤال، يوجه المحرك الذكي بحثه إلى المواقع وقواعد البيانات المعتمدة للمذهب المختار مع توثيق كافة الفتاوى بروابط مباشرة حية."
            : language === "ur"
            ? "سرچ فتاویٰ ایک جامع و غیر جانبدار علمی سرچ انجن ہے۔ جب آپ کوئی سوال پوچھتے ہیں تو منتخب کردہ مکتبہ فکر کے معتبر و مستند پورٹلز سے جواب ترتیب دے کر لائیو لنکس کے ساتھ حوالہ دیا جاتا ہے۔"
            : "সার্চ ফতোয়া একটি সার্বজনীন ফতোয়া ও জ্ঞান অনুসন্ধান প্ল্যাটফর্ম। প্রশ্ন করার সময় আপনি যে মাযহাব বা উৎস নির্বাচন করবেন, আমাদের এআই ব্রেন সেই মাযহাবের জন্য নির্ধারিত বিশ্বস্ত পোর্টালসমূহ থেকে উত্তর সংগ্রহ করে এবং প্রতিটি তথ্যের সাথে সক্রিয় হাইপারলিঙ্কযুক্ত রেফারেন্স প্রদান করে।"}
        </p>
      </header>

      {/* Highlights Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-stone-700 dark:text-stone-300">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
              {language === "en"
                ? "Transparent Brain Routing & Direct Hyperlinking"
                : language === "ar"
                ? "توجيه ذكي ومباشر وتوثيق بروابط حية"
                : language === "ur"
                ? "شفاف حوالہ جات اور براہِ راست لائیو لنکس"
                : "স্বচ্ছ উৎস নির্বাচন ও সরাসরি রেফারেন্স হাইপারলিঙ্ক"}
            </h3>
            <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {language === "en"
                ? "Every response from Search Fatwa cites the exact source institution or portal it was synthesized from. You can click on any cited reference or source card to view the original Arabic/Bengali/English text on the official institutions' portals."
                : language === "ar"
                ? "تتضمن كل إجابة توثيقاً صريحاً للمؤسسة الفقهية أو الموقع المعتمد الذي تم استقاء الفتوى منه، مع إمكانية النقر على أي رابط لمطالعة الفتوى الأصلية في موقعها الرسمي."
                : language === "ur"
                ? "سرچ فتاویٰ کے ہر جواب کے ساتھ متعلقہ ادارے یا پورٹل کا نام اور براہِ راست کلک ایبل لنک دیا جاتا ہے تاکہ آپ اصل ماخذ پر جا کر مطالعہ کر سکیں۔"
                : "সার্চ ফতোয়া থেকে প্রদত্ত প্রতিটি উত্তরের নিচে সুনির্দিষ্ট রেফারেন্স ও সক্রিয় হাইপারলিঙ্ক থাকে, যা নির্দেশ করে কোন প্রতিষ্ঠান বা ওয়েবসাইট থেকে উত্তরটি নেওয়া হয়েছে। লিঙ্কে ক্লিক করে সরাসরি সংশ্লিষ্ট অফিসিয়াল পোর্টালে গিয়ে বিস্তারিত ফতোয়া ও মূল দলিল পাঠ করা যায়।"}
            </p>
          </div>
        </div>
      </div>

      {/* Category Chronology Matrix */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              {language === "en"
                ? "Categories & Active Brain Portals"
                : language === "ar"
                ? "المصادر والمواقع المعتمدة حسب المذهب"
                : language === "ur"
                ? "مکاتب فکر اور ان کے باضابطہ مراجع"
                : "মাযহাব ও ক্যাটাগরি ভিত্তিক সোর্স ব্রেন পোর্টাল"}
            </span>
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
            {MADHHAB_CHRONOLOGY.length} {language === "en" ? "Categories" : "ক্যাটাগরি"}
          </span>
        </div>

        {/* Categories Cards */}
        <div className="space-y-5">
          {MADHHAB_CHRONOLOGY.map((category, idx) => (
            <div
              key={category.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500/40 transition-all"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white flex items-center gap-2">
                      <span>{getMadhabName(category)}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300/40 dark:border-emerald-800/40">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>
                          {language === "en"
                            ? "Active Brain"
                            : language === "ar"
                            ? "مصدر مفعل"
                            : language === "ur"
                            ? "فعال برین"
                            : "সক্রিয় ব্রেন"}
                        </span>
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium sm:text-right pl-10 sm:pl-0">
                  {category.portals.length} {language === "en" ? "Institutions / Portals" : "টি স্বীকৃত পোর্টাল"}
                </div>
              </div>

              {/* Summary Note */}
              <p className="text-xs text-stone-600 dark:text-stone-300 my-3 leading-relaxed bg-stone-50 dark:bg-stone-850 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800/60">
                <strong className="text-stone-900 dark:text-white mr-1">
                  {language === "en" ? "Scope:" : language === "ar" ? "النطاق:" : language === "ur" ? "دائرۂ کار:" : "বিষয়বস্তু ও মূলনীতি:"}
                </strong>
                {getSummaryNote(category)}
              </p>

              {/* Portals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
                {category.portals.map((portal, pIdx) => (
                  <a
                    key={pIdx}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 border border-stone-200/70 dark:border-stone-750 hover:border-emerald-400/60 dark:hover:border-emerald-600/60 transition-all text-left"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1.5 mb-1.5">
                        <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{portal.title}</span>
                        </span>
                        {portal.badge && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40 shrink-0">
                            {portal.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mb-2">
                        {getPortalDesc(portal)}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/40 dark:border-stone-750 flex items-center justify-between text-[11px] font-mono text-emerald-700 dark:text-emerald-400 group-hover:underline">
                      <span className="truncate max-w-[220px]">{portal.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 ml-1 opacity-70 group-hover:opacity-100" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestion Section */}
      <footer className="mt-10 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center shadow-xs">
        <Sparkles className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
        <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-1">
          {language === "en"
            ? "Know of another authentic online fatwa institution?"
            : language === "ar"
            ? "هل تقترح إضافة موقع أو مؤسسة فقهية رسمية أخرى؟"
            : language === "ur"
            ? "کیا آپ کے پاس کسی اور معتبر فتاویٰ ادارے یا پورٹل کی تجویز ہے؟"
            : "অন্য কোনো স্বীকৃত ফতোয়া প্রতিষ্ঠান বা ওয়েবসাইট সংযুক্ত করার প্রস্তাব আছে?"}
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-400 max-w-lg mx-auto mb-4 leading-relaxed">
          {language === "en"
            ? "Search Fatwa is continuously expanding its multi-school brain network to represent established, traditional Islamic scholarship across all mainstream madhhabs."
            : language === "ar"
            ? "تعمل منصة سيرش فتاوى باستمرار على توسيع شبكة المراجع لتمثيل الفقه الإسلامي الأصيل عبر مختلف المذاهب المعترف بها."
            : language === "ur"
            ? "سرچ فتاویٰ تمام معتبر فقہی مکاتب فکر کے مصدقہ اور باضابطہ علمی اداروں کو شامل کر کے ہر مسلمان کے لیے آسان رسائی فراہم کرتا ہے۔"
            : "সার্চ ফতোয়া প্রতিনিয়ত বিভিন্ন স্বীকৃত মাযহাব ও ঘরানার প্রামাণ্য অনলাইন ফতোয়া ডাটাবেজ সমন্বিত করে সার্বজনীন রেফারেন্স সেবা প্রদান করছে।"}
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
