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
