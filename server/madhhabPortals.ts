export interface PortalInfo {
  name: string;
  url: string;
  domain: string;
  madhhab: string;
  descriptionBn: string;
  descriptionEn: string;
}

export const APPROVED_PORTALS: Record<string, PortalInfo[]> = {
  hanafi: [
    {
      name: "Darul Uloom Deoband (Darul Ifta)",
      url: "https://darulifta-deoband.com/en",
      domain: "darulifta-deoband.com",
      madhhab: "hanafi",
      descriptionBn: "দারুল উলূম দেওবন্দের অফিসিয়াল অনলাইন দারুল ইফতা",
      descriptionEn: "Official online Darul Ifta of Darul Uloom Deoband",
    },
    {
      name: "Hanafi Fiqh BD",
      url: "https://alpha.hanafifiqh.net/",
      domain: "alpha.hanafifiqh.net",
      madhhab: "hanafi",
      descriptionBn: "বাংলাদেশে প্রচলিত হানাফী ফিকহের প্রামাণ্য বাংলা ফতোয়া ডাটাবেজ",
      descriptionEn: "Authentic Bengali Hanafi jurisprudence & legal opinions archive",
    },
    {
      name: "Darul Uloom Banuri Town (Darul Ifta)",
      url: "https://www.banuri.edu.pk/darulifta",
      domain: "banuri.edu.pk",
      madhhab: "hanafi",
      descriptionBn: "জামিয়া উলূমুল ইসলামিয়া আল্লামা বিন্নুরী টাউন দারুল ইফতা",
      descriptionEn: "Official Darul Ifta of Jamia Uloom-e-Islamia Banuri Town Karachi",
    },
    {
      name: "IQA (As-Sunnah Foundation / Sheikh Ahmadullah)",
      url: "https://www.iqa.info/",
      domain: "iqa.info",
      madhhab: "hanafi",
      descriptionBn: "শায়খ আহমাদুল্লাহ পরিচালিত প্রামাণ্য ইসলামিক প্রশ্নোত্তর পোর্টাল",
      descriptionEn: "Authentic Islamic Q&A portal founded by Sheikh Ahmadullah",
    },
    {
      name: "IslamQA.org (Hanafi Fiqh Section)",
      url: "https://islamqa.org/category/hanafi/",
      domain: "islamqa.org",
      madhhab: "hanafi",
      descriptionBn: "আন্তর্জাতিক চার মাযহাবের ডেডিকেটেড হানাফী ফতোয়া আর্কাইভ",
      descriptionEn: "International multi-madhhab database (Hanafi division)",
    },
  ],

  shafeyi: [
    {
      name: "General Department of Iftaa (Jordan)",
      url: "https://aliftaa.jo/content-en/73/Article.aspx?ArticleId=5949",
      domain: "aliftaa.jo",
      madhhab: "shafeyi",
      descriptionBn: "জর্ডান সরকারের রাষ্ট্রীয় ফতোয়া বিভাগ (শাফেয়ী ধারা)",
      descriptionEn: "Official state fatwa department of Jordan (Shafi'i baseline)",
    },
    {
      name: "ShafiiFiqh.org",
      url: "https://shafifiqh.org/",
      domain: "shafifiqh.org",
      madhhab: "shafeyi",
      descriptionBn: "শাফেয়ী মাযহাবের আন্তর্জাতিক ফিকহী নীতিমালা ও প্রশ্নোত্তর প্ল্যাটফর্ম",
      descriptionEn: "Dedicated worldwide platform for authentic Shafi'i rulings & manuals",
    },
    {
      name: "IslamQA.org (Shafi'i Section)",
      url: "https://islamqa.org/category/shafii/",
      domain: "islamqa.org",
      madhhab: "shafeyi",
      descriptionBn: "ইসলামকিউএ ডট ওআরজি-র সমন্বিত শাফেয়ী ফতোয়া আর্কাইভ",
      descriptionEn: "Global Sunni archive filtered to verified Shafi'i rulings",
    },
  ],

  maliki: [
    {
      name: "BinBayyah.net (Sheikh Abdullah bin Bayyah)",
      url: "https://binbayyah.net/",
      domain: "binbayyah.net",
      madhhab: "maliki",
      descriptionBn: "প্রখ্যাত মালিকী ফিকহবিদ শায়খ আব্দুল্লাহ বিন বাইয়াহ-এর গবেষণা পোর্টাল",
      descriptionEn: "Official scholarly portal of Maliki jurist Sheikh Abdullah bin Bayyah",
    },
    {
      name: "Maliki Fiqh Q&A (malikifiqhqa.com)",
      url: "https://www.malikifiqhqa.com/",
      domain: "malikifiqhqa.com",
      madhhab: "maliki",
      descriptionBn: "মালিকী ফিকহ অনুযায়ী সুনির্দিষ্ট প্রশ্নোত্তর ও শিক্ষামূলক প্ল্যাটফর্ম",
      descriptionEn: "Widely referenced platform dedicated specifically to Maliki school answers",
    },
    {
      name: "Maliki Madhab Portal (malikimadhab.org)",
      url: "https://premium.malikimadhab.org/about-maliki-fiqh/",
      domain: "malikimadhab.org",
      madhhab: "maliki",
      descriptionBn: "মালিকী মূল টেক্সট ও ফিকহ সংকলন",
      descriptionEn: "Dissemination of core classical Maliki texts and resources",
    },
    {
      name: "IslamQA.org (Maliki Section)",
      url: "https://islamqa.org/category/maliki/",
      domain: "islamqa.org",
      madhhab: "maliki",
      descriptionBn: "ইসলামকিউএ ডট ওআরজি মালিকী ফতোয়া বিভাগ",
      descriptionEn: "Verified answers from traditional Maliki scholars worldwide",
    },
  ],

  hanbali: [
    {
      name: "General Presidency of Scholarly Research and Ifta (Saudi Arabia)",
      url: "https://www.alifta.gov.sa/",
      domain: "alifta.gov.sa",
      madhhab: "hanbali",
      descriptionBn: "সৌদি আরবের রাষ্ট্রীয় ফতোয়া ও স্থায়ী আলেম কমিটির মূল আর্কাইভ",
      descriptionEn: "Saudi Arabia's official state portal for Permanent Committee rulings",
    },
    {
      name: "Kuwait Ministry of Awqaf and Islamic Affairs",
      url: "https://www.awqaf.gov.kw/",
      domain: "awqaf.gov.kw",
      madhhab: "hanbali",
      descriptionBn: "কুয়েত আওকাফ মন্ত্রণালয়ের সার্বিক ফিকহী এনসাইক্লোপিডিয়া ও হাম্বলী কোড",
      descriptionEn: "Kuwait's official fatwa commission and multi-madhhab legal encyclopedia",
    },
    {
      name: "Hanbali Fiqh Q&A",
      url: "https://www.hanbalifiqhqa.com/",
      domain: "hanbalifiqhqa.com",
      madhhab: "hanbali",
      descriptionBn: "ক্লাসিক্যাল হাম্বলী মতানুযায়ী সুনির্দিষ্ট সমাধান ও পাঠ্যভিত্তিক উত্তর",
      descriptionEn: "Answers structured purely on traditional Hanbali manuals",
    },
    {
      name: "IslamQA.org (Hanbali Section)",
      url: "https://islamqa.org/category/hanbali/",
      domain: "islamqa.org",
      madhhab: "hanbali",
      descriptionBn: "ইসলামকিউএ ডট ওআরজি হাম্বলী ফতোয়া ফিল্টার",
      descriptionEn: "Multi-madhhab database with dedicated Hanbali section",
    },
    {
      name: "IslamQA.info (Shaykh Muhammad Saalih al-Munajjid)",
      url: "https://islamqa.info",
      domain: "islamqa.info",
      madhhab: "hanbali",
      descriptionBn: "শায়খ সালিহ আল-মুনাজ্জিদ পরিচালিত বিশ্বখ্যাত ফতোয়া পোর্টাল (হাম্বলী মিল ৮০-৯০%)",
      descriptionEn: "Premier Athari/Hanbali-aligned global Islamic fatwa portal",
    },
  ],

  salafi: [
    {
      name: "IslamQA.info (Shaykh Muhammad Saalih al-Munajjid)",
      url: "https://islamqa.info",
      domain: "islamqa.info",
      madhhab: "salafi",
      descriptionBn: "শায়খ সালিহ আল-মুনাজ্জিদ পরিচালিত প্রামাণ্য তাহকীক ও ফতোয়া পোর্টাল",
      descriptionEn: "Premier Salafi / Ahl al-Hadith text-grounded fatwa repository",
    },
    {
      name: "General Presidency of Scholarly Research and Ifta (Saudi Arabia)",
      url: "https://www.alifta.gov.sa/",
      domain: "alifta.gov.sa",
      madhhab: "salafi",
      descriptionBn: "শায়খ বিন বায, শায়খ আল-উসাইমীন ও সৌদি স্থায়ী ফতোয়া কমিটির সংকলন",
      descriptionEn: "Rulings of Shaykh Ibn Baz, Shaykh Ibn Uthaymeen & Permanent Committee",
    },
    {
      name: "Islamweb.net",
      url: "https://www.islamweb.net",
      domain: "islamweb.net",
      madhhab: "salafi",
      descriptionBn: "আন্তর্জাতিক ইসলামিক ফতোয়া ও দাওয়াহ কেন্দ্র",
      descriptionEn: "Renowned international Arabic & multilingual fatwa center",
    },
  ],

  bibidh: [
    {
      name: "IQA (Sheikh Ahmadullah / As-Sunnah Foundation)",
      url: "https://www.iqa.info/",
      domain: "iqa.info",
      madhhab: "bibidh",
      descriptionBn: "শায়খ আহমাদুল্লাহ পরিচালিত প্রামাণ্য ইসলামিক প্রশ্নোত্তর পোর্টাল",
      descriptionEn: "Official Islamic Q&A portal supervised by Sheikh Ahmadullah",
    },
    {
      name: "Dar Al-Ifta Egypt (Al-Azhar Tradition)",
      url: "https://www.dar-alifta.org/en",
      domain: "dar-alifta.org",
      madhhab: "bibidh",
      descriptionBn: "আল-আজহার বিশ্ববিদ্যালয় ও মিসরের প্রাচীন ইলমী ঐতিহ্য সংশ্লিষ্ট দারুল ইফতা",
      descriptionEn: "Official portal connected to Al-Azhar and Egypt's scholarly tradition",
    },
  ],

  shia: [
    {
      name: "Al-Islam.org Ahlul Bayt Digital Islamic Library",
      url: "https://www.al-islam.org/",
      domain: "al-islam.org",
      madhhab: "shia",
      descriptionBn: "ডিজিটাল লাইব্রেরি ও স্বীকৃত ইসলামিক রেফারেন্স ডাটাবেজ",
      descriptionEn: "Comprehensive digital library of Shia classical and contemporary scholarship",
    },
    {
      name: "Al-Urwah al-Wuthqa al-Zaydiyyah",
      url: "https://alorwahalwuthqa.com/en/",
      domain: "alorwahalwuthqa.com",
      madhhab: "shia",
      descriptionBn: "ইমাম যায়দ ইবনে আলী ও প্রাচীন যায়দী ঐতিহ্যের প্রামাণ্য প্রাথমিক উৎস ও জ্ঞানভাণ্ডার",
      descriptionEn: "Foundational primary sources and scholarly heritage in Zaydi Shia tradition",
    },
    {
      name: "Imam Zaid bin Ali Cultural Foundation (IZBACF)",
      url: "https://hmml.org/stories/zaydi-manuscripts/",
      domain: "hmml.org",
      madhhab: "shia",
      descriptionBn: "ইমাম যায়দ ইবনে আলীর স্মৃতিবিজড়িত সাংস্কৃতিক ও পাণ্ডুলিপি সংরক্ষণ ফাউন্ডেশন",
      descriptionEn: "Foundation documenting, preserving & publishing Zaydi intellectual heritage",
    },
  ],
};

// Auto-populate 'all' category with all unique portals across all schools
const allUniquePortals: PortalInfo[] = [];
const seenAllUrls = new Set<string>();
Object.entries(APPROVED_PORTALS).forEach(([school, portals]) => {
  if (school !== "all") {
    portals.forEach((p) => {
      if (!seenAllUrls.has(p.url)) {
        seenAllUrls.add(p.url);
        allUniquePortals.push({ ...p, madhhab: school });
      }
    });
  }
});
APPROVED_PORTALS.all = allUniquePortals;

export const APPROVED_DOMAINS = [
  "islamqa.info",
  "darulifta-deoband.com",
  "alpha.hanafifiqh.net",
  "hanafifiqh.net",
  "banuri.edu.pk",
  "iqa.info",
  "islamqa.org",
  "aliftaa.jo",
  "shafifiqh.org",
  "binbayyah.net",
  "malikifiqhqa.com",
  "malikimadhab.org",
  "alifta.gov.sa",
  "awqaf.gov.kw",
  "hanbalifiqhqa.com",
  "islamweb.net",
  "dar-alifta.org",
  "al-islam.org",
  "alorwahalwuthqa.com",
  "hmml.org",
];

export function getPortalsForSelection(selectedSources: string[]): PortalInfo[] {
  if (selectedSources.includes("all")) {
    return APPROVED_PORTALS.all;
  }

  const result: PortalInfo[] = [];
  const seen = new Set<string>();
  selectedSources.forEach((school) => {
    const list = APPROVED_PORTALS[school] || [];
    list.forEach((p) => {
      if (!seen.has(p.url)) {
        seen.add(p.url);
        result.push(p);
      }
    });
  });

  return result.length > 0 ? result : APPROVED_PORTALS.all;
}
