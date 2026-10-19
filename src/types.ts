export type Language = "bn" | "en" | "ar" | "ur";

export type MadhhabCategory =
  | "all"
  | "hanafi"
  | "shafeyi"
  | "maliki"
  | "hanbali"
  | "salafi"
  | "bibidh"
  | "shia";

export interface BrainPortal {
  title: string;
  url: string;
  descriptionBn: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionUr: string;
  badge?: string;
}

export interface MadhhabDefinition {
  id: MadhhabCategory;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  nameUr: string;
  isBrainActive: boolean;
  portals: BrainPortal[];
  summaryNoteBn: string;
  summaryNoteEn: string;
  summaryNoteAr: string;
  summaryNoteUr: string;
}

export const MADHHAB_CHRONOLOGY: MadhhabDefinition[] = [
  {
    id: "all",
    nameBn: "সকল উৎস (All)",
    nameEn: "All Sources",
    nameAr: "جميع المصادر",
    nameUr: "تمام مصادر",
    isBrainActive: true,
    summaryNoteBn: "সকল স্বীকৃত মাযহাব ও বিশ্বস্ত ফতোয়া পোর্টাল থেকে সমন্বিত প্রামাণ্য তাহকীক",
    summaryNoteEn: "Unified multi-school search across all verified Islamic fatwa institutions",
    summaryNoteAr: "بحث مقارن وموحد عبر جميع مصادر الفتاوى الإسلامية المعتمدة",
    summaryNoteUr: "تمام معتبر مکاتب فکر اور علمی پورٹلز سے تقابلی و جامع تحقیق",
    portals: [
      {
        title: "IslamQA.info",
        url: "https://islamqa.info",
        descriptionBn: "শায়খ সালিহ আল-মুনাজ্জিদ পরিচালিত বিশ্বখ্যাত ফতোয়া পোর্টাল",
        descriptionEn: "Internationally renowned text-based fatwa portal supervised by Sheikh al-Munajjid",
        descriptionAr: "الموقع المرجعي العالمي بإشراف الشيخ محمد صالح المنجد",
        descriptionUr: "شیخ محمد صالح المنجد کی زیر نگرانی معروف عالمی علمی پورٹل",
      },
      {
        title: "Darul Uloom Deoband Darul Ifta",
        url: "https://darulifta-deoband.com/en",
        descriptionBn: "ঐতিহাসিক দারুল উলূম দেওবন্দের অফিসিয়াল দারুল ইফতা",
        descriptionEn: "Official Darul Ifta of Darul Uloom Deoband",
        descriptionAr: "دار الإفتاء الرسمية لدار العلوم ديوبند",
        descriptionUr: "دار العلوم دیوبند کا باضابطہ دار الافتاء",
      },
      {
        title: "General Department of Iftaa Jordan",
        url: "https://aliftaa.jo/content-en/73/Article.aspx?ArticleId=5949",
        descriptionBn: "জর্ডান সরকারের রাষ্ট্রীয় ফতোয়া বিভাগ (শাফেয়ী ধারা)",
        descriptionEn: "Official state fatwa department of Jordan (Shafi'i baseline)",
        descriptionAr: "دائرة الإفتاء العام للمملكة الأردنية الهاشمية",
        descriptionUr: "اردن کا باضابطہ سرکاری دار الافتاء (شافعی بنیاد)",
      },
      {
        title: "BinBayyah.net",
        url: "https://binbayyah.net/",
        descriptionBn: "প্রখ্যাত মালিকী ফিকহবিদ শায়খ আব্দুল্লাহ বিন বাইয়াহ-এর গবেষণা পোর্টাল",
        descriptionEn: "Official scholarly portal of Maliki jurist Sheikh Abdullah bin Bayyah",
        descriptionAr: "الموقع الرسمي لمعالي الشيخ عبد الله بن بيه للمقاصد والفقه المالكي",
        descriptionUr: "شیخ عبد اللہ بن بیہ کا مستند فقہ مالکی کا پورٹل",
      },
    ],
  },
  {
    id: "hanafi",
    nameBn: "হানাফী (Hanafi)",
    nameEn: "Hanafi",
    nameAr: "حنفي",
    nameUr: "حنفی",
    isBrainActive: true,
    summaryNoteBn: "দারুল উলূম দেওবন্দ, বিন্নুরী টাউন, হানাফী ফিকহ বিডি ও আইকিউএ ভিত্তিক সক্রিয় ব্রেন",
    summaryNoteEn: "Active brain connected to Darul Uloom Deoband, Banuri Town, Hanafi Fiqh BD & IQA",
    summaryNoteAr: "مرجع فقهي معتمد على دار العلوم ديوبند وبنوري تاون وفقه حنفي",
    summaryNoteUr: "دار العلوم دیوبند، بنوری ٹاؤن، حنفی فقہ بی ڈی اور آئی کیو اے کے مراجع",
    portals: [
      {
        title: "Darul Uloom Deoband Darul Ifta",
        url: "https://darulifta-deoband.com/en",
        descriptionBn: "দারুল উলূম দেওবন্দের অফিসিয়াল অনলাইন দারুল ইফতা পোর্টাল",
        descriptionEn: "Official online Darul Ifta of Darul Uloom Deoband",
        descriptionAr: "دار الإفتاء لدار العلوم ديوبند",
        descriptionUr: "دار العلوم دیوبند کا سرکاری آن لائن دار الافتاء",
        badge: "Official Deoband",
      },
      {
        title: "Hanafi Fiqh BD",
        url: "https://alpha.hanafifiqh.net/",
        descriptionBn: "বাংলাদেশে প্রচলিত হানাফী ফিকহের প্রামাণ্য বাংলা ফতোয়া ডাটাবেজ",
        descriptionEn: "Authentic Bengali Hanafi jurisprudence & legal opinions archive",
        descriptionAr: "قاعدة بيانات الفقه الحنفي المعتمدة باللغة البنغالية",
        descriptionUr: "بنگلہ دیش کا مستند فقہ حنفی فتاویٰ ڈیٹا بیس",
        badge: "Hanafi BD",
      },
      {
        title: "Darul Uloom Banuri Town Darul Ifta",
        url: "https://www.banuri.edu.pk/darulifta",
        descriptionBn: "বিশ্বখ্যাত জামিয়া উলূমুল ইসলামিয়া আল্লামা বিন্নুরী টাউন দারুল ইফতা",
        descriptionEn: "Official Darul Ifta of Jamia Uloom-e-Islamia Banuri Town Karachi",
        descriptionAr: "دار الإفتاء بجامعة العلوم الإسلامية بنوري تاون كراتشي",
        descriptionUr: "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن کراچی کا دار الافتاء",
        badge: "Banuri Town",
      },
      {
        title: "IQA (As-Sunnah Foundation)",
        url: "https://www.iqa.info/",
        descriptionBn: "শায়খ আহমাদুল্লাহ পরিচালিত প্রামাণ্য ইসলামিক প্রশ্নোত্তর পোর্টাল",
        descriptionEn: "Authentic Islamic Q&A portal founded by Sheikh Ahmadullah",
        descriptionAr: "بوابة الأسئلة والأجوبة الإسلامية للشيخ أحمد الله",
        descriptionUr: "شیخ احمد اللہ کا مستند اسلامی سوال و جواب پورٹل",
        badge: "IQA Ahmadullah",
      },
      {
        title: "IslamQA.org (Hanafi)",
        url: "https://islamqa.org/category/hanafi/",
        descriptionBn: "আন্তর্জাতিক চার মাযহাবের ডেডিকেটেড হানাফী ফতোয়া আর্কাইভ",
        descriptionEn: "International multi-madhhab database (Hanafi division)",
        descriptionAr: "الأرشيف العالمي لفتاوى المذهب الحنفي",
        descriptionUr: "اسلام کیو اے ڈاٹ او آر جی کا حنفی فتاویٰ سیکشن",
        badge: "IslamQA.org",
      },
    ],
  },
  {
    id: "shafeyi",
    nameBn: "শাফেয়ী (Shafi'i)",
    nameEn: "Shafi'i",
    nameAr: "شافعي",
    nameUr: "شافعی",
    isBrainActive: true,
    summaryNoteBn: "জর্ডান রাষ্ট্রীয় দারুল ইফতা, শাফেয়ী ফিকহ পোর্টাল ও ইসলামকিউএ ডট ওআরজি ভিত্তিক ব্রেন",
    summaryNoteEn: "Grounded in Jordan General Department of Iftaa, Shafi'i Fiqh platform & IslamQA.org",
    summaryNoteAr: "مستند إلى دائرة الإفتاء الأردنية ومنصة الفقه الشافعي",
    summaryNoteUr: "اردن کے دار الافتاء، شافعی فقہ پورٹل اور مستند شافعی فتاویٰ مراجع",
    portals: [
      {
        title: "General Department of Iftaa (Jordan)",
        url: "https://aliftaa.jo/content-en/73/Article.aspx?ArticleId=5949",
        descriptionBn: "জর্ডানের অফিসিয়াল স্টেট দারুল ইফতা (শাফেয়ী ফিকহ প্রধান ভিত্তি)",
        descriptionEn: "Jordanian state authority using Shafi'i school as primary baseline",
        descriptionAr: "دائرة الإفتاء العام للمملكة الأردنية الهاشمية (المذهب الشافعي)",
        descriptionUr: "اردن کا باضابطہ سرکاری دار الافتاء (شافعی مکتبہ فکر)",
        badge: "Jordan State Ifta",
      },
      {
        title: "ShafiiFiqh.org",
        url: "https://shafifiqh.org/",
        descriptionBn: "শাফেয়ী মাযহাবের আন্তর্জাতিক ফিকহী নীতিমালা ও প্রশ্নোত্তর প্ল্যাটফর্ম",
        descriptionEn: "Dedicated worldwide platform for authentic Shafi'i rulings & manuals",
        descriptionAr: "منصة عالمية متخصصة في أحكام ومسائل المذهب الشافعي",
        descriptionUr: "شافعی فقہ کے مسائل و احکام کا عالمی پورٹل",
        badge: "ShafiiFiqh",
      },
      {
        title: "IslamQA.org (Shafi'i)",
        url: "https://islamqa.org/category/shafii/",
        descriptionBn: "ইসলামকিউএ ডট ওআরজি-র সমন্বিত শাফেয়ী ফতোয়া আর্কাইভ",
        descriptionEn: "Global Sunni archive filtered to verified Shafi'i rulings",
        descriptionAr: "قسم الفتاوى الشافعية في موقع اسلام كيو ايه",
        descriptionUr: "اسلام کیو اے ڈاٹ او آر جی کا شافعی سیکشن",
        badge: "IslamQA.org",
      },
    ],
  },
  {
    id: "maliki",
    nameBn: "মালিকী (Maliki)",
    nameEn: "Maliki",
    nameAr: "مالكي",
    nameUr: "مالکی",
    isBrainActive: true,
    summaryNoteBn: "শায়খ আব্দুল্লাহ বিন বাইয়াহ, মালিকী ফিকহ কিউএ ও মালিকী মাযহাব পোর্টাল ভিত্তিক ব্রেন",
    summaryNoteEn: "Connected to BinBayyah.net, Maliki Fiqh Q&A, and Maliki Madhab portal",
    summaryNoteAr: "مستند إلى فتاوى الشيخ بن بيه وموقع فقه مالكي وأصول المذهب",
    summaryNoteUr: "شیخ عبد اللہ بن بیہ، مالکی فقہ پورٹل اور اصل مالکی متون کے مراجع",
    portals: [
      {
        title: "BinBayyah.net",
        url: "https://binbayyah.net/",
        descriptionBn: "প্রখ্যাত মালিকী মুফাক্কির শায়খ আব্দুল্লাহ বিন বাইয়াহ-এর ওয়েবসাইট ও ফতোয়া",
        descriptionEn: "Official site of Sheikh Abdullah bin Bayyah featuring Maliki legal opinions",
        descriptionAr: "الموقع الرسمي للعلامة الشيخ عبد الله بن بيه",
        descriptionUr: "معروف مالکی عالم شیخ عبد اللہ بن بیہ کا آفیشل پورٹل",
        badge: "Sheikh Bin Bayyah",
      },
      {
        title: "Maliki Fiqh Q&A",
        url: "https://www.malikifiqhqa.com/",
        descriptionBn: "মালিকী ফিকহ অনুযায়ী সুনির্দিষ্ট প্রশ্নোত্তর ও শিক্ষামূলক প্ল্যাটফর্ম",
        descriptionEn: "Widely referenced platform dedicated specifically to Maliki school answers",
        descriptionAr: "موقع متخصص في أسئلة وأجوبة الفقه المالكي",
        descriptionUr: "فقہ مالکی کے لیے مخصوص آن لائن سوال و جواب پورٹل",
        badge: "MalikiFiqhQA",
      },
      {
        title: "Maliki Madhab Portal",
        url: "https://premium.malikimadhab.org/about-maliki-fiqh/",
        descriptionBn: "মালিকী মূল টেক্সট ও ফিকহ সংকলন",
        descriptionEn: "Dissemination of core classical Maliki texts and resources",
        descriptionAr: "بوابة متون وأصول الفقه المالكي المعتمدة",
        descriptionUr: "فقہ مالکی کے متون و کتب کا پلیٹ فارم",
        badge: "Maliki Madhab",
      },
      {
        title: "IslamQA.org (Maliki)",
        url: "https://islamqa.org/category/maliki/",
        descriptionBn: "ইসলামকিউএ ডট ওআরজি মালিকী ফতোয়া বিভাগ",
        descriptionEn: "Verified answers from traditional Maliki scholars worldwide",
        descriptionAr: "أرشيف فتاوى المذهب المالكي",
        descriptionUr: "اسلام کیو اے کا مالکی فتاویٰ ذخیرہ",
        badge: "IslamQA.org",
      },
    ],
  },
  {
    id: "hanbali",
    nameBn: "হাম্বলী (Hanbali)",
    nameEn: "Hanbali",
    nameAr: "حنبلي",
    nameUr: "حنبلی",
    isBrainActive: true,
    summaryNoteBn: "সৌদি আল-ইফতা প্রেসিডেন্সি, কুয়েত আওকাফ মন্ত্রণালয়, হাম্বলী ফিকহ কিউএ ও ইসলামকিউএ ভিত্তিক ব্রেন",
    summaryNoteEn: "Grounded in Saudi Al-Ifta, Kuwait Awqaf Ministry, Hanbali Fiqh QA & IslamQA",
    summaryNoteAr: "مستند إلى الرئاسة العامة للبحوث والإفتاء ووزارة الأوقاف الكويتية والفقه الحنبلي",
    summaryNoteUr: "سعودی دار الافتاء، کویت وزارت اوقاف، حنبلی فقہ پورٹل اور اسلام کیو اے",
    portals: [
      {
        title: "General Presidency of Scholarly Research and Ifta (Saudi Arabia)",
        url: "https://www.alifta.gov.sa/",
        descriptionBn: "সৌদি আরবের রাষ্ট্রীয় ফতোয়া ও স্থায়ী আলেম কমিটির মূল আর্কাইভ",
        descriptionEn: "Saudi Arabia's official state portal for Permanent Committee rulings",
        descriptionAr: "الرئاسة العامة للبحوث العلمية والإفتاء بالمملكة العربية السعودية",
        descriptionUr: "سعودی عرب کا باضابطہ سرکاری دار الافتاء (کبار علماء)",
        badge: "Saudi Al-Ifta",
      },
      {
        title: "Kuwait Ministry of Awqaf & Islamic Affairs",
        url: "https://www.awqaf.gov.kw/",
        descriptionBn: "কুয়েত আওকাফ মন্ত্রণালয়ের সার্বিক ফিকহী এনসাইক্লোপিডিয়া ও হাম্বলী কোড",
        descriptionEn: "Kuwait's official fatwa commission and multi-madhhab legal encyclopedia",
        descriptionAr: "وزارة الأوقاف والشؤون الإسلامية بدولة الكويت (الموسوعة الفقهية)",
        descriptionUr: "کویت کی وزارت اوقاف و اسلامی امور کا فقہی ڈیٹا بیس",
        badge: "Kuwait Awqaf",
      },
      {
        title: "Hanbali Fiqh Q&A",
        url: "https://www.hanbalifiqhqa.com/",
        descriptionBn: "ক্লাসিক্যাল হাম্বলী মতানুযায়ী সুনির্দিষ্ট সমাধান ও পাঠ্যভিত্তিক উত্তর",
        descriptionEn: "Answers structured purely on traditional Hanbali manuals",
        descriptionAr: "أسئلة وأجوبة محررة على المذهب الحنبلي المعتمد",
        descriptionUr: "کلاسیکی حنبلی متون پر مبنی فقہی سوال و جواب پورٹل",
        badge: "Hanbali Fiqh",
      },
      {
        title: "IslamQA.info",
        url: "https://islamqa.info",
        descriptionBn: "শায়খ সালিহ আল-মুনাজ্জিদ পরিচালিত বিশ্বখ্যাত ফতোয়া পোর্টাল (হাম্বলী মিল ৮০-৯০%)",
        descriptionEn: "Heavily aligned with Hanbali legal reasoning and classical Athari evidences",
        descriptionAr: "موقع الإسلام سؤال وجواب (متوافق مع فقه الإمام أحمد بن حنبل)",
        descriptionUr: "اسلام سوال و جواب (حنبلی دلائل سے مطابقت)",
        badge: "IslamQA.info",
      },
      {
        title: "IslamQA.org (Hanbali)",
        url: "https://islamqa.org/category/hanbali/",
        descriptionBn: "ইসলামকিউএ ডট ওআরজি হাম্বলী ফতোয়া ফিল্টার",
        descriptionEn: "Multi-madhhab database with dedicated Hanbali section",
        descriptionAr: "قسم الفتاوى الحنبلية المعتمدة",
        descriptionUr: "اسلام کیو اے ڈاٹ او آر جی کا حنبلی فتاویٰ سیکشن",
        badge: "IslamQA.org",
      },
    ],
  },
  {
    id: "salafi",
    nameBn: "সালাফী (Salafi)",
    nameEn: "Salafi",
    nameAr: "سلفي",
    nameUr: "سلفی",
    isBrainActive: true,
    summaryNoteBn: "কুরআন, সহীহ সুন্নাহ ও সালাফে সালেহীনের বুঝ অনুযায়ী ইসলামকিউএ ও আল-ইফতা ভিত্তিক ব্রেন",
    summaryNoteEn: "Rulings guided by Quran, authentic Sunnah, IslamQA.info & Al-Ifta",
    summaryNoteAr: "فتاوى مستندة إلى الكتاب والسنة بفهم السلف الصالح عبر الإسلام سؤال وجواب والإفتاء",
    summaryNoteUr: "قرآن، سنت اور فہم سلف صالحین پر مبنی فتاویٰ بورڈ (اسلام کیو اے و دار الافتاء)",
    portals: [
      {
        title: "IslamQA.info",
        url: "https://islamqa.info",
        descriptionBn: "শায়খ সালিহ আল-মুনাজ্জিদ পরিচালিত প্রামাণ্য তাহকীক ও ফতোয়া পোর্টাল",
        descriptionEn: "Premier Salafi / Ahl al-Hadith text-grounded fatwa repository",
        descriptionAr: "موقع الإسلام سؤال وجواب للشيخ محمد صالح المنجد",
        descriptionUr: "موقع اسلام سوال و جواب (شیخ محمد صالح المنجد)",
        badge: "Primary Brain",
      },
      {
        title: "General Presidency of Scholarly Research and Ifta",
        url: "https://www.alifta.gov.sa/",
        descriptionBn: "শায়খ বিন বায, শায়খ আল-উসাইমীন ও সৌদি স্থায়ী ফতোয়া কমিটির সংকলন",
        descriptionEn: "Rulings of Shaykh Ibn Baz, Shaykh Ibn Uthaymeen & Permanent Committee",
        descriptionAr: "فتاوى اللجنة الدائمة والشيخ ابن باز والشيخ ابن عثيمين",
        descriptionUr: "کبار علماء سعودی عرب کا فتاویٰ ذخیرہ",
        badge: "Al-Ifta",
      },
      {
        title: "Islamweb.net",
        url: "https://www.islamweb.net",
        descriptionBn: "কাতারের আন্তর্জাতিক ইসলামিক ফতোয়া কেন্দ্র",
        descriptionEn: "Renowned international Arabic & multilingual fatwa center",
        descriptionAr: "مركز الفتوى بموقع إسلام ويب",
        descriptionUr: "اسلام ویب کا مستند فتاویٰ سینٹر",
        badge: "Islamweb",
      },
    ],
  },
  {
    id: "bibidh",
    nameBn: "বিবিধ (Bibidh / Contemporary)",
    nameEn: "Contemporary & General (Bibidh)",
    nameAr: "معاصرة ومتنوعة",
    nameUr: "متفرق و معاصر",
    isBrainActive: true,
    summaryNoteBn: "শায়খ আহমাদুল্লাহ পরিচালিত আইকিউএ এবং আল-আজহার সংশ্লিষ্ট দারুল ইফতা মিসরীয়্যাহ",
    summaryNoteEn: "Grounded in IQA (Sheikh Ahmadullah) and Egypt's official Dar Al-Ifta (Al-Azhar)",
    summaryNoteAr: "دار الإفتاء المصرية وبوابة الأسئلة والأجوبة الإسلامية للشيخ أحمد الله",
    summaryNoteUr: "شیخ احمد اللہ کا آئی کیو اے اور دار الافتاء مصر (الازہر روایت)",
    portals: [
      {
        title: "IQA - Islamic Question & Answer",
        url: "https://www.iqa.info/",
        descriptionBn: "শায়খ আহমাদুল্লাহ (আস-সুন্নাহ ফাউন্ডেশন) পরিচালিত জনপ্রিয় বাংলা প্রশ্নোত্তর পোর্টাল",
        descriptionEn: "Official Islamic Q&A portal supervised by Sheikh Ahmadullah",
        descriptionAr: "بوابة الأسئلة والأجوبة الإسلامية بإشراف الشيخ أحمد الله",
        descriptionUr: "شیخ احمد اللہ کا معروف اسلامی سوال و جواب پورٹل",
        badge: "IQA Ahmadullah",
      },
      {
        title: "Egypt's Dar Al-Ifta (Al-Azhar Tradition)",
        url: "https://www.dar-alifta.org/en",
        descriptionBn: "আল-আজহার বিশ্ববিদ্যালয় ও প্রাচীন ইলমী ঐতিহ্য সংশ্লিষ্ট মিসরের রাষ্ট্রীয় দারুল ইফতা",
        descriptionEn: "Official portal connected to Al-Azhar and Egypt's scholarly tradition",
        descriptionAr: "دار الإفتاء المصرية الرسمية (المدرسة الأزهرية العريقة)",
        descriptionUr: "مصر کا باضابطہ دار الافتاء (جامعہ الازہر کی علمی روایت)",
        badge: "Dar Al-Ifta Egypt",
      },
    ],
  },
  {
    id: "shia",
    nameBn: "শিয়া (Shia)",
    nameEn: "Shia",
    nameAr: "شيعي",
    nameUr: "شیعہ",
    isBrainActive: true,
    summaryNoteBn: "স্বীকৃত শিয়া ফিকহী গবেষণা ও তথ্য পোর্টাল",
    summaryNoteEn: "Recognized Shia jurisprudence literature & scholarly portals",
    summaryNoteAr: "المراجع الفقهية المعتمدة للمدرسة الشيعية",
    summaryNoteUr: "شیعہ مکتبہ فکر کے مستند علمی مراجع اور پورٹلز",
    portals: [
      {
        title: "Al-Islam.org Ahlul Bayt Digital Islamic Library",
        url: "https://www.al-islam.org/",
        descriptionBn: "ডিজিটাল লাইব্রেরি ও স্বীকৃত ইসলামিক রেফারেন্স ডাটাবেজ",
        descriptionEn: "Comprehensive digital library of Shia classical and contemporary scholarship",
        descriptionAr: "المكتبة الرقمية الإسلامية الشاملة للبحوث",
        descriptionUr: "اہل بیت ڈیجیٹل اسلامی لائبریری و علمی پورٹل",
        badge: "Al-Islam",
      },
    ],
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
