export interface SampleQuestion {
  id: string;
  category: string;
  question: string;
  questionBn: string;
  tag: string;
}

export const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: "q1",
    category: "Sawm & Fasting",
    question: "Does receiving an injection or IV drip invalidate the fast in Ramadan?",
    questionBn: "রোজা রাখা অবস্থায় ইনজেকশন বা স্যালাইন নিলে কি রোজা ভেঙ্গে যাবে?",
    tag: "রোজা ও ইনজেকশন",
  },
  {
    id: "q2",
    category: "Salah & Prayer",
    question: "What is the ruling on missed prayers due to oversleeping or forgetfulness?",
    questionBn: "ঘুম বা অনিচ্ছাকৃত ভুলে নামাজ ছুটে গেলে কীভাবে তা আদায় করতে হবে?",
    tag: "কাজা নামাজ",
  },
  {
    id: "q3",
    category: "Salah & Travel",
    question: "How to pray while traveling on an airplane or moving train if the prayer time is expiring?",
    questionBn: "চলন্ত বিমান, ট্রেন বা গাড়িতে নামাজের ওয়াক্ত চলে যাওয়ার উপক্রম হলে কীভাবে সালাত আদায় করবে?",
    tag: "সফরে সালাত",
  },
  {
    id: "q4",
    category: "Transactions & Halal",
    question: "What is the Islamic ruling on trading cryptocurrencies and digital assets according to IslamQA?",
    questionBn: "ক্রিপ্টোকারেন্সি এবং ডিজিটাল কয়েন লেনদেন সম্পর্কে ইসলামকিউএ এর ফতোয়া কী?",
    tag: "ক্রিপ্টোকারেন্সি",
  },
  {
    id: "q5",
    category: "Contemporary & Arts",
    question: "What is the ruling on digital drawing, 2D illustration, and anime characters without realistic facial features?",
    questionBn: "ডিজিটাল ড্রয়িং এবং প্রাণীর মুখাবয়ব আঁকার ব্যাপারে শরীয়তের সুনির্দিষ্ট বিধান কী?",
    tag: "ডিজিটাল ড্রয়িং",
  },
  {
    id: "q6",
    category: "Taharah & Purity",
    question: "What should a person do if they doubt whether wudhu is broken or if gas has passed?",
    questionBn: "অজু ভেঙেছে কি না এ বিষয়ে মনে সন্দেহ বা ওয়াসওয়াসা সৃষ্টি হলে করণীয় কী?",
    tag: "অজু ও ওয়াসওয়াসা",
  },
];

export const CATEGORIES = [
  { id: "all", labelEn: "All Topics", labelBn: "সকল বিষয়" },
  { id: "salah", labelEn: "Salah / Prayer", labelBn: "সালাত ও নামাজ" },
  { id: "sawm", labelEn: "Fasting / Sawm", labelBn: "সাওম ও রোজা" },
  { id: "finance", labelEn: "Finance & Trade", labelBn: "ব্যবসা ও অর্থনীতি" },
  { id: "family", labelEn: "Family & Marriage", labelBn: "পরিবার ও বিবাহ" },
  { id: "taharah", labelEn: "Taharah / Purity", labelBn: "পবিত্রতা ও অজু" },
];

export const RANDOM_ISLAMIC_QUESTIONS: string[] = [
  "রোজা রাখা অবস্থায় টুথপেস্ট বা টুথপাউডার দিয়ে দাঁত ব্রাশ করলে কি রোজা ভেঙ্গে যায়?",
  "শেয়ার বাজারে বিনিয়োগ বা শেয়ার কেনাবেচা করা কি ইসলামে হালাল?",
  "রোজা রাখা অবস্থায় ইনজেকশন বা স্যালাইন নিলে কি রোজা ভেঙ্গে যাবে?",
  "ঘুম বা অনিচ্ছাকৃত ভুলে নামাজ ছুটে গেলে কীভাবে তা আদায় করতে হবে?",
  "চলন্ত বিমান, ট্রেন বা গাড়িতে নামাজের ওয়াক্ত চলে যাওয়ার উপক্রম হলে কীভাবে সালাত আদায় করবে?",
  "ক্রিপ্টোকারেন্সি এবং ডিজিটাল কয়েন লেনদেন সম্পর্কে ইসলামকিউএ এর ফতোয়া কী?",
  "ডিজিটাল ড্রয়িং এবং অ্যানিমেশন বা প্রাণীর মুখাবয়ব আঁকার ব্যাপারে শরীয়তের বিধান কী?",
  "অজু ভেঙেছে কি না এ বিষয়ে মনে সন্দেহ বা ওয়াসওয়াসা সৃষ্টি হলে করণীয় কী?",
  "ব্যাংক বা সঞ্চয়পত্র থেকে প্রাপ্ত সুদের টাকা দিয়ে কি দান বা জনকল্যাণমূলক কাজ করা যাবে?",
  "ফজরের নামাজের সময় শেষ হয়ে সূর্য ওঠার সময় কি কাজা নামাজ পড়া যাবে?",
  "মিউজিক বা বাদ্যযন্ত্র শোনার ব্যাপারে চার মাজহাবের আলেমদের ফতোয়া কী?",
  "নারীদের জন্য মাহরাম ছাড়া কি একা একা ওমরাহ বা ভ্রমণে যাওয়া জায়েজ?",
  "সোনা ও রুপার পাশাপাশি নগদ জমানো টাকার ওপর জাকাত হিসাব করার সঠিক নিয়ম কী?",
  "সালাতের মধ্যে কোনো ওয়াজিব ছুটে গেলে সিজদায়ে সাহু দেওয়ার সঠিক পদ্ধতি কী?",
  "মুসাফির অবস্থায় সফরকালীন সময়ে কোন কোন নামাজ কীভাবে কসর করতে হয়?",
  "অনলাইন ড্রপশিপিং বা পণ্য হস্তগত না করে বিক্রি করার ইসলামিক বিধান কী?",
  "রোজা রাখা অবস্থায় ইনহেলার বা চোখের ড্রপ ব্যবহার করলে কি রোজা নষ্ট হবে?",
  "খাবার খাওয়ার পর দাঁতের ফাঁকে আটকে থাকা খাদ্যকণা গিলে ফেললে কি রোজা ভেঙ্গে যায়?",
  "তাহাজ্জুদ ও বিতর নামাজের মধ্যে পার্থক্য কী এবং বিতর সালাত কীভাবে আদায় করা উত্তম?",
  "স্ত্রীর মোহরানা তাৎক্ষণিক পরিশোধ না করে বাকি রাখা কি শরীয়তসম্মত?",
  "অমুসলিম পিতা-মাতার সাথে সন্তানের আচরণ ও তাদের অধিকার সম্পর্কে ইসলাম কী বলে?",
  "জুমার নামাজের সময় কোনো কারণে প্রথম রাকাত না পেলে বাকি সালাত কীভাবে পূর্ণ করবে?",
  "সিগারেট, তামাক বা ই-সিগারেট (ভ্যাপ) সেবন করার ব্যাপারে ইসলামিক ফতোয়া কী?",
  "অসুস্থতার কারণে দাঁড়িয়ে নামাজ পড়তে অক্ষম হলে কীভাবে বসে বা শুয়ে সালাত আদায় করবে?",
  "নামাজে কিরাত পড়ার সময় কোনো ভুল হলে সালাত কি বাতিল হয়ে যাবে?",
  "কারো হক বা অধিকার নষ্ট করার পর তার কাছ থেকে ক্ষমা চাওয়ার সঠিক ইসলামিক তরিকা কী?",
  "রমজান মাসে সুবহে সাদিকের পর স্বপ্নদোষ হলে কি রোজা ভেঙ্গে যায়?",
  "ফটোগ্রাফি বা সাধারণ ক্যামেরা দিয়ে ছবি তোলার ব্যাপারে শরীয়তের অভিমত কী?"
];

export function getRandomIslamicQuestion(currentQuestion?: string): string {
  const available = RANDOM_ISLAMIC_QUESTIONS.filter(
    (q) => q.trim() !== (currentQuestion || "").trim()
  );
  const pool = available.length > 0 ? available : RANDOM_ISLAMIC_QUESTIONS;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

