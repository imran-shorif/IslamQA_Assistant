import { Language } from "./translations";

export interface SampleQuestion {
  id: string;
  category: string;
  question: string;
  questionBn: string;
  questionAr?: string;
  questionUr?: string;
  tag: string;
  tagEn: string;
  tagAr?: string;
  tagUr?: string;
}

export const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: "q1",
    category: "Sawm & Fasting",
    question: "Does receiving an injection or IV drip invalidate the fast in Ramadan?",
    questionBn: "রোজা রাখা অবস্থায় ইনজেকশন বা স্যালাইন নিলে কি রোজা ভেঙ্গে যাবে?",
    questionAr: "هل أخذ الإبرة أو المغذي يفسد الصيام في رمضان؟",
    questionUr: "کیا روزے کی حالت میں ڈرپ یا انجکشن لگوانے سے روزہ ٹوٹ جاتا ہے؟",
    tag: "রোজা ও ইনজেকশন",
    tagEn: "Fasting & Injections",
    tagAr: "الصيام والإبر",
    tagUr: "روزہ اور انجکشن",
  },
  {
    id: "q2",
    category: "Salah & Prayer",
    question: "What is the ruling on missed prayers due to oversleeping or forgetfulness?",
    questionBn: "ঘুম বা অনিচ্ছাকৃত ভুলে নামাজ ছুটে গেলে কীভাবে তা আদায় করতে হবে?",
    questionAr: "ما حكم صلاة من نام عنها أو نسيها، وكيف يقضيها؟",
    questionUr: "نیند یا بھول چوک کی وجہ سے نماز قضا ہو جائے تو کیسے ادا کریں؟",
    tag: "কাজা নামাজ",
    tagEn: "Missed Prayers",
    tagAr: "قضاء الصلاة",
    tagUr: "قضا نمازیں",
  },
  {
    id: "q3",
    category: "Salah & Travel",
    question: "How to pray while traveling on an airplane or moving train if the prayer time is expiring?",
    questionBn: "চলন্ত বিমান, ট্রেন বা গাড়িতে নামাজের ওয়াক্ত চলে যাওয়ার উপক্রম হলে কীভাবে সালাত আদায় করবে?",
    questionAr: "كيف يصلي المسافر في الطائرة أو القطار إذا خشي خروج الوقت؟",
    questionUr: "چلتی ٹرین یا جہاز میں وقت نکلنے کا اندیشہ ہو تو نماز کیسے ادا کریں؟",
    tag: "সফরে সালাত",
    tagEn: "Prayer during Travel",
    tagAr: "صلاة المسافر",
    tagUr: "سفر میں نماز",
  },
  {
    id: "q4",
    category: "Transactions & Halal",
    question: "What is the Islamic ruling on trading cryptocurrencies and digital assets according to IslamQA?",
    questionBn: "ক্রিপ্টোকারেন্সি এবং ডিজিটাল কয়েন লেনদেন সম্পর্কে ইসলামকিউএ এর ফতোয়া কী?",
    questionAr: "ما هو حكم التعامل بالعملات الرقمية المشفرة (البيتكوين) حسب موقع الإسلام سؤال وجواب؟",
    questionUr: "اسلام سوال و جواب کے مطابق کرپٹو کرنسی اور ڈیجیٹل کوائنز کا شرعی حکم کیا ہے؟",
    tag: "ক্রিপ্টোকারেন্সি",
    tagEn: "Cryptocurrency",
    tagAr: "العملات الرقمية",
    tagUr: "کرپٹو کرنسی",
  },
  {
    id: "q5",
    category: "Contemporary & Arts",
    question: "What is the ruling on digital drawing, 2D illustration, and anime characters without realistic facial features?",
    questionBn: "ডিজিটাল ড্রয়িং এবং প্রাণীর মুখাবয়ব আঁকার ব্যাপারে শরীয়তের সুনির্দিষ্ট বিধান কী?",
    questionAr: "ما حكم الرسم الرقمي والرسوم الكرتونية وذوات الأرواح في الشريعة الإسلامية؟",
    questionUr: "ڈیجیٹل ڈرائنگ اور جانداروں کی تصاویر بنانے کے بارے میں شرعی حکم کیا ہے؟",
    tag: "ডিজিটাল ড্রয়িং",
    tagEn: "Digital Drawing",
    tagAr: "الرسم الرقمي",
    tagUr: "ڈیجیٹل ڈرائنگ",
  },
  {
    id: "q6",
    category: "Taharah & Purity",
    question: "What should a person do if they doubt whether wudhu is broken or if gas has passed?",
    questionBn: "অজু ভেঙেছে কি না এ বিষয়ে মনে সন্দেহ বা ওয়াসওয়াসা সৃষ্টি হলে করণীয় কী?",
    questionAr: "ماذا يفعل من شك في انتقاض وضوئه أو خروج الريح منه؟",
    questionUr: "وضو ٹوٹنے یا ریح خارج ہونے میں شک و وسوسہ ہو تو کیا کرنا چاہیے؟",
    tag: "অজু ও ওয়াসওয়াসা",
    tagEn: "Wudu & Whispers",
    tagAr: "الشك في الوضوء",
    tagUr: "وضو اور وسوسہ",
  },
];

export const CATEGORIES = [
  { id: "all", labelEn: "All Topics", labelBn: "সকল বিষয়", labelAr: "جميع الموضوعات", labelUr: "تمام موضوعات" },
  { id: "salah", labelEn: "Salah & Prayer", labelBn: "সালাত ও নামাজ", labelAr: "الصلاة والعبادات", labelUr: "نماز و عبادات" },
  { id: "sawm", labelEn: "Fasting & Sawm", labelBn: "সাওম ও রোজা", labelAr: "الصيام ورمضان", labelUr: "روزہ اور صیام" },
  { id: "finance", labelEn: "Finance & Trade", labelBn: "ব্যবসা ও অর্থনীতি", labelAr: "المعاملات والتجارة", labelUr: "تجارت و معاشیات" },
  { id: "family", labelEn: "Family & Marriage", labelBn: "পরিবার ও বিবাহ", labelAr: "الأسرة والزواج", labelUr: "خاندان و نکاح" },
  { id: "taharah", labelEn: "Taharah & Purity", labelBn: "পবিত্রতা ও অজু", labelAr: "الطهارة والوضوء", labelUr: "طہارت و وضو" },
];

export const RANDOM_ISLAMIC_QUESTIONS_BN: string[] = [
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

export const RANDOM_ISLAMIC_QUESTIONS_EN: string[] = [
  "Does brushing teeth with toothpaste invalidate the fast while fasting?",
  "Is investing and trading in the stock market Halal in Islam?",
  "Does receiving an injection or IV drip invalidate the fast in Ramadan?",
  "What is the ruling on missed prayers due to oversleeping or forgetfulness?",
  "How to pray while traveling on an airplane or train if the prayer time is expiring?",
  "What is the Islamic ruling on trading cryptocurrencies and digital assets according to IslamQA?",
  "What is the ruling on digital drawing and 2D character illustration in Islam?",
  "What should a person do if they doubt whether their wudu is broken?",
  "Can interest money received from conventional banks be given away in charity?",
  "Is it permissible to make up missed Fajr prayer right as the sun is rising?",
  "What is the Islamic ruling on listening to music and musical instruments?",
  "Is it permissible for a woman to travel for Umrah without a Mahram?",
  "How is Zakat calculated on gold, silver, and accumulated cash savings?",
  "What is the correct procedure for Sujud as-Sahw (prostration of forgetfulness)?",
  "How should prayers be shortened (Qasr) while traveling?",
  "What is the Islamic ruling on e-commerce dropshipping?",
  "Does using an asthma inhaler or eye drops break the fast?",
  "Does swallowing bits of food stuck between teeth break the fast?",
  "What is the difference between Tahajjud and Witr prayer?",
  "Is it permissible to defer payment of the wife's Mahr (dowry)?",
  "How should a Muslim interact with non-Muslim parents according to Islamic ethics?",
  "What should one do if they miss the first Rak'ah of Friday Jumu'ah prayer?",
  "What is the Islamic ruling on smoking cigarettes or using e-cigarettes (vaping)?",
  "How should an ill person pray if they are unable to stand up?",
  "What is the ruling on taking photographs with digital cameras and smartphones?"
];

export const RANDOM_ISLAMIC_QUESTIONS_AR: string[] = [
  "هل استعمال معجون الأسنان وفرشاة الأسنان يفسد الصيام؟",
  "ما حكم الاستثمار والمضاربة في سوق الأسهم والبورصة؟",
  "هل أخذ الإبر العضلية أو الوريدية والمغذي يفطر الصائم في رمضان؟",
  "ما حكم من فاتته الصلاة بسبب النوم أو النسيان وكيف يقضيها؟",
  "كيف يصلي الراكب في الطائرة أو القطار إذا خشي خروج وقت الصلاة؟",
  "ما هو حكم التعامل بالعملات الرقمية المشفرة (البيتكوين) في الإسلام؟",
  "ما حكم الرسم الرقمي والرسوم الكرتونية لذوات الأرواح في الشريعة؟",
  "ماذا يفعل المسلم إذا شك في انتقاض وضوئه أو طهارته؟",
  "هل يجوز التخلص من فوائد البنوك الربوية بصرفها في وجوه الخير؟",
  "هل يجوز قضاء سنة الفجر وفريضتها عند طلوع الشمس مباشرة؟",
  "ما حكم الاستماع إلى المعازف والآلات الموسيقية في المذاهب الأربعة؟",
  "هل يجوز للمرأة السفر لأداء العمرة بدون محرم؟",
  "كيف تحسب زكاة الذهب والفضة والأموال النقدية المدخرة؟",
  "ما هي الكيفية الصحيحة لسجود السهو قبل السلام وبعده؟",
  "ما هي شروط قصر الصلاة وجمعها للمسافر في السفر؟",
  "ما حكم التجارة الإلكترونية بنظام الدروب شيبينغ (Dropshipping)؟",
  "هل استخدام بخاخ الربو أو قطرة العين يفسد الصيام؟",
  "ما الفرق بين صلاة التهجد وصلاة الوتر وكيف تصلى؟",
  "هل يجوز تأجيل دفع مهر الزوجة بعد عقد النكاح؟",
  "ما هو الموقف الشرعي والأخلاقي في بر الوالدين غير المسلمين؟",
  "ماذا يفعل المسبوق إذا أدرك الإمام في الركعة الثانية من صلاة الجمعة؟",
  "ما هو حكم التدخين واستعمال السجائر الإلكترونية (الفيب)؟",
  "كيف يصلي المريض إذا عجز عن القيام في الفريضة؟",
  "ما حكم التصوير الفوتوغرافي بكاميرات الهواتف الذكية؟"
];

export const RANDOM_ISLAMIC_QUESTIONS_UR: string[] = [
  "کیا روزے کے دوران ٹوتھ پیسٹ یا منجن سے دانت صاف کرنے سے روزہ ٹوٹ جاتا ہے؟",
  "کیا اسٹاک مارکیٹ میں شیئرز کی خرید و فروخت اور سرمایہ کاری حلال ہے؟",
  "کیا روزے میں گلوکوز کی ڈرپ یا طاقت کا انجکشن لگوانا جائز ہے؟",
  "نیند یا بھول کی وجہ سے چھوٹی ہوئی نماز کو ادا کرنے کا شرعی طریقہ کیا ہے؟",
  "چلتی ٹرین، گاڑی یا ہوائی جہاز میں اگر وقت ختم ہو رہا ہو تو نماز کیسے ادا کریں؟",
  "کرپٹو کرنسی اور ڈیجیٹل کوائنز میں لین دین کے بارے میں اسلام کیو اے کا فتویٰ کیا ہے؟",
  "ڈیجیٹل ڈرائنگ اور اینیمیشن میں جانداروں کے چہرے بنانے کا کیا شرعی حکم ہے؟",
  "اگر وضو ٹوٹنے یا نہ ٹوٹنے میں شک و وسوسہ پیدا ہو تو کیا کرنا چاہیے؟",
  "کیا روایتی بینکوں کے سودی منافع کو ثواب کی نیت کے بغیر خیراتی کاموں میں دیا جا سکتا ہے؟",
  "کیا سورج طلوع ہوتے وقت فجر کی قضا نماز پڑھی جا سکتی ہے؟",
  "چاروں ائمہ کے نزدیک موسیقی اور آلاتِ موسیقی سننے کی کیا ممانعت ہے؟",
  "کیا عورت کا بغیر محرم کے عمرہ یا سفر پر جانا جائز ہے؟",
  "سونے، چاندی اور نقد بچت پر زکوٰۃ کا حساب لگانے کا مستند طریقہ کیا ہے؟",
  "سجدہ سہو کا صحیح اور مسنون طریقہ کیا ہے؟",
  "سفر کے دوران نماز قصر اور جمع کرنے کی کیا شرائط ہیں؟",
  "ای کامرس ڈراپ شپنگ کے ذریعے تجارت کرنے کا شرعی حکم کیا ہے؟",
  "کیا دمہ کے مریض کے لیے انہیلر یا آنکھ کے ڈراپس استعمال کرنے سے روزہ فاسد ہوتا ہے؟",
  "تہجد اور وتر کی نماز میں کیا فرق ہے اور وتر کس طرح پڑھنا افضل ہے؟",
  "کیا بیوی کا مہر نقد ادا نہ کر کے مؤجل (ادھار) رکھنا جائز ہے؟",
  "غیر مسلم والدین کے ساتھ حسن سلوک اور ان کے حقوق سے متعلق اسلام کی کیا تعلیمات ہیں؟",
  "اگر جمعہ کی نماز کی پہلی رکعت نکل جائے تو بقیہ نماز کیسے مکمل کی جائے؟",
  "سگریٹ نوشی اور ای سگریٹ (ویپ) استعمال کرنے کا کیا شرعی حکم ہے؟",
  "بیماری کی حالت میں کھڑے ہونے سے معذور شخص کس طرح نماز ادا کرے؟",
  "موبائل فون یا ڈیجیٹل کیمرے سے عام تصویر کشی کا کیا شرعی حکم ہے؟"
];

export function getRandomIslamicQuestion(
  currentQuestion?: string,
  language: Language = "bn"
): string {
  let poolList: string[];
  if (language === "en") {
    poolList = RANDOM_ISLAMIC_QUESTIONS_EN;
  } else if (language === "ar") {
    poolList = RANDOM_ISLAMIC_QUESTIONS_AR;
  } else if (language === "ur") {
    poolList = RANDOM_ISLAMIC_QUESTIONS_UR;
  } else {
    poolList = RANDOM_ISLAMIC_QUESTIONS_BN;
  }

  const available = poolList.filter(
    (q) => q.trim() !== (currentQuestion || "").trim()
  );
  const pool = available.length > 0 ? available : poolList;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}
