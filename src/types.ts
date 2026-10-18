export type Language = "bn" | "en" | "ar" | "ur";

export type MadhhabCategory =
  | "all"
  | "hanafi"
  | "shafeyi"
  | "maliki"
  | "hanbali"
  | "salafi"
  | "shia";

export interface MadhhabDefinition {
  id: MadhhabCategory;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  nameUr: string;
  activeBrainUrl?: string;
  activeBrainName?: string;
  isBrainActive: boolean;
  upcomingNoteBn: string;
  upcomingNoteEn: string;
  upcomingNoteAr: string;
  upcomingNoteUr: string;
}

export const MADHHAB_CHRONOLOGY: MadhhabDefinition[] = [
  {
    id: "all",
    nameBn: "সকল উৎস (All)",
    nameEn: "All Sources",
    nameAr: "جميع المصادر",
    nameUr: "تمام مصادر",
    activeBrainUrl: "https://islamqa.info",
    activeBrainName: "islamqa.info",
    isBrainActive: true,
    upcomingNoteBn: "সার্বিক তাহকীক ও তুলনামূলক প্রামাণ্য ফতোয়া ডাটাবেজ",
    upcomingNoteEn: "Comprehensive scholarly rulings & comparative verification database",
    upcomingNoteAr: "قاعدة بيانات شاملة للتحقيق المقارن والترجيح بالأدلة",
    upcomingNoteUr: "جامع تحقیقی مراجع اور تقابلی فتاویٰ کا مستند ڈیٹا بیس",
  },
  {
    id: "hanafi",
    nameBn: "হানাফী (Hanafi)",
    nameEn: "Hanafi",
    nameAr: "حنفي",
    nameUr: "حنفی",
    isBrainActive: false,
    upcomingNoteBn: "পরবর্তী আপডেটে হানাফী মাযহাবের নির্ভরযোগ্য ফতোয়া সাইট যুক্ত করা হবে",
    upcomingNoteEn: "Dedicated authentic Hanafi fatwa portals will be connected in next update",
    upcomingNoteAr: "سيتم ربط المواقع المعتمدة للمذهب الحنفي في التحديث القادم",
    upcomingNoteUr: "اگلی اپڈیٹ میں حنفی مکتبہ فکر کی مستند فتاویٰ ویب سائٹس شامل کی جائیں گی",
  },
  {
    id: "shafeyi",
    nameBn: "শাফেয়ী (Shafi'i)",
    nameEn: "Shafi'i",
    nameAr: "شافعي",
    nameUr: "شافعی",
    isBrainActive: false,
    upcomingNoteBn: "পরবর্তী আপডেটে শাফেয়ী মাযহাবের নির্ভরযোগ্য ফতোয়া সাইট যুক্ত করা হবে",
    upcomingNoteEn: "Dedicated authentic Shafi'i fatwa portals will be connected in next update",
    upcomingNoteAr: "سيتم ربط المواقع المعتمدة للمذهب الشافعي في التحديث القادم",
    upcomingNoteUr: "اگلی اپڈیٹ میں شافعی مکتبہ فکر کی مستند فتاویٰ ویب سائٹس شامل کی جائیں گی",
  },
  {
    id: "maliki",
    nameBn: "মালিকী (Maliki)",
    nameEn: "Maliki",
    nameAr: "مالكي",
    nameUr: "مالکی",
    isBrainActive: false,
    upcomingNoteBn: "পরবর্তী আপডেটে মালিকী মাযহাবের নির্ভরযোগ্য ফতোয়া সাইট যুক্ত করা হবে",
    upcomingNoteEn: "Dedicated authentic Maliki fatwa portals will be connected in next update",
    upcomingNoteAr: "سيتم ربط المواقع المعتمدة للمذهب المالكي في التحديث القادم",
    upcomingNoteUr: "اگلی اپڈیٹ میں مالکی مکتبہ فکر کی مستند فتاویٰ ویب سائٹس شامل کی جائیں گی",
  },
  {
    id: "hanbali",
    nameBn: "হাম্বলী (Hanbali)",
    nameEn: "Hanbali",
    nameAr: "حنبلي",
    nameUr: "حنبلی",
    activeBrainUrl: "https://islamqa.info",
    activeBrainName: "islamqa.info",
    isBrainActive: true,
    upcomingNoteBn: "হাম্বলী ফিকহ ও আসহাবুস্ সুনানের দলীলভিত্তিক ফতোয়া",
    upcomingNoteEn: "Evidence-based Hanbali jurisprudence and Athari scholarly consensus",
    upcomingNoteAr: "فتاوى مبنية على فقه الإمام أحمد بن حنبل والأدلة المباشرة",
    upcomingNoteUr: "فقہ حنبلی اور دلائل پر مبنی مستند تحقیقی فتاویٰ",
  },
  {
    id: "salafi",
    nameBn: "সালাফী (Salafi)",
    nameEn: "Salafi",
    nameAr: "سلفي",
    nameUr: "سلفی",
    activeBrainUrl: "https://islamqa.info",
    activeBrainName: "islamqa.info",
    isBrainActive: true,
    upcomingNoteBn: "কুরআন, সহীহ সুন্নাহ ও সালাফে সালেহীনের বুঝ অনুযায়ী ফতোয়া বোর্ড",
    upcomingNoteEn: "Rulings guided by Quran, Sunnah, and understanding of the Salaf",
    upcomingNoteAr: "فتاوى مستندة إلى الكتاب والسنة بفهم السلف الصالح",
    upcomingNoteUr: "قرآن، سنت اور فہم سلف صالحین پر مبنی فتاویٰ بورڈ",
  },
  {
    id: "shia",
    nameBn: "শিয়া (Shia)",
    nameEn: "Shia",
    nameAr: "شيعي",
    nameUr: "شیعہ",
    isBrainActive: false,
    upcomingNoteBn: "পরবর্তী আপডেটে শিয়া বিষয়ের নির্দিষ্ট রেফারেন্স সাইট যুক্ত করা হবে",
    upcomingNoteEn: "Dedicated Shia school reference portals will be connected in next update",
    upcomingNoteAr: "سيتم ربط المراجع المخصصة في التحديث القادم",
    upcomingNoteUr: "اگلی اپڈیٹ میں متعلقہ مراجع شامل کیے جائیں گے",
  },
];

export interface IslamQASource {
  title: string;
  url: string;
  questionNo?: string;
  snippet?: string;
}

export interface QnARequest {
  question: string;
  language?: Language;
  sources?: MadhhabCategory[];
}

export interface QnAResponse {
  id: string;
  question: string;
  answer: string;
  sources: IslamQASource[];
  timestamp: number;
  model: string;
  selectedSources?: MadhhabCategory[];
}

export interface ChatHistoryItem {
  id: string;
  question: string;
  answer: string;
  sources: IslamQASource[];
  timestamp: number;
  selectedSources?: MadhhabCategory[];
}
