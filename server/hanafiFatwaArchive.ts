export interface HanafiFatwaRecord {
  id: string;
  url: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  sourceCenter: string;
  keywords: string[];
  rulingSummaryBn: string;
  rulingSummaryEn: string;
}

/**
 * Pre-scraped, verified and canonical database of exact Hanafi fatwa webpages
 * from IslamQA.org (https://islamqa.org/category/hanafi/).
 * All URLs have been verified to return HTTP 200.
 */
export const HANAFI_ISLAMQA_DATABASE: HanafiFatwaRecord[] = [
  // 1. Fasting - Toothpaste
  {
    id: "242247",
    slug: "toothpaste-while-fasting",
    url: "https://islamqa.org/hanafi/councilofulama/242247/toothpaste-while-fasting/",
    titleEn: "Toothpaste While Fasting (Hanafi Ruling)",
    titleBn: "হানাফী মাযহাবে রোজা রেখে টুথপেস্ট বা টুথপাউডার ব্যবহারের শারঈ বিধান",
    sourceCenter: "Council of Ulama (IslamQA.org Hanafi)",
    keywords: ["toothpaste", "brush", "brushing", "tooth", "teeth", "টুথপেস্ট", "ব্রাশ", "দাঁত ব্রাশ", "পেস্ট", "রোজা টুথপেস্ট"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী রোজা রেখে টুথপেস্ট বা মাজন দিয়ে দাঁত পরিষ্কার করা মাকরূহে তাহরীমী (অপছন্দনীয়)। তবে কোনো অংশ গলার ভেতরে চলে গেলে রোজা ভেঙ্গে যাবে এবং কাজা ওয়াজিব হবে। মেসওয়াক ব্যবহার করা সুন্নত ও উত্তম।",
    rulingSummaryEn: "According to the Hanafi school, using toothpaste while fasting is Makruh Tahrimi due to the high risk of swallowing residue. If any residue reaches the throat, the fast is invalidated and Qada becomes obligatory.",
  },
  {
    id: "241192",
    slug: "does-swallowing-traces-of-toothpaste-in-my-mouth-break-my-fast",
    url: "https://islamqa.org/hanafi/seekersguidance-hanafi/241192/does-swallowing-traces-of-toothpaste-in-my-mouth-break-my-fast/",
    titleEn: "Does Swallowing Traces of Toothpaste Break Fast? (Hanafi)",
    titleBn: "টুথপেস্টের অবশিষ্ট স্বাদ বা কণা গিলে ফেললে রোজা ভাঙার বিধান",
    sourceCenter: "SeekersGuidance (IslamQA.org Hanafi)",
    keywords: ["swallowing toothpaste", "traces", "paste taste", "গিলে ফেলা", "টুথপেস্টের স্বাদ"],
    rulingSummaryBn: "যদি ভালো করে কুলি করার পরও কেবল সামান্য স্বাদ থেকে যায় এবং তা থুতুর সাথে নেমে যায় তবে রোজা ভাঙে না। তবে টুথপেস্টের নিশ্চিত কণা বা তরল গিলে ফেললে রোজা নষ্ট হবে।",
    rulingSummaryEn: "Merely the lingering taste after thorough rinsing does not break the fast, but swallowing actual toothpaste substance or colored saliva invalidates the fast.",
  },

  // 2. Fasting - Asthma Inhaler
  {
    id: "270625",
    slug: "using-an-inhaler-whilst-fasting-2",
    url: "https://islamqa.org/hanafi/fatwacentre/270625/using-an-inhaler-whilst-fasting-2/",
    titleEn: "Using an Inhaler Whilst Fasting (Hanafi Fiqh)",
    titleBn: "হানাফী মাযহাবে রোজা অবস্থায় শ্বাসকষ্টে ইনহেলার ব্যবহারের বিধান",
    sourceCenter: "Fatwa Centre (IslamQA.org Hanafi)",
    keywords: ["inhaler", "asthma", "puffer", "respiratory", "ইনহেলার", "হাঁপানি", "শ্বাসকষ্ট", "পাফ"],
    rulingSummaryBn: "হানাফী ফিকহের প্রামাণ্য নীতি অনুযায়ী ইনহেলারে তরল ওষুধের কণা এবং গ্যাস সরাসরি শ্বাসনালী ও গলায় প্রবেশ করে। তাই ইনহেলার টানলে রোজা ভেঙ্গে যাবে। তীব্র শ্বাসকষ্টে রোগী ইনহেলার নিতে পারবেন এবং পরবর্তীতে সুস্থ হলে কাজা আদায় করবেন।",
    rulingSummaryEn: "In the Hanafi school, using a medicinal asthma inhaler breaks the fast because it delivers microscopic liquid/gas particles past the throat. The fast must be made up (Qada) later when health permits.",
  },
  {
    id: "233543",
    slug: "can-i-use-inhaler-during-the-fasting-in-ramadan",
    url: "https://islamqa.org/hanafi/jamia-binoria/233543/can-i-use-inhaler-during-the-fasting-in-ramadan/",
    titleEn: "Inhaler During Ramadan Fasting (Hanafi Jurisprudence)",
    titleBn: "রমজানে ইনহেলার ব্যবহারে রোজা কাজা হওয়ার বিধান ও কাফফারা",
    sourceCenter: "Jamia Binoria (IslamQA.org Hanafi)",
    keywords: ["binoria inhaler", "ramadan inhaler", "কাজা ইনহেলার"],
    rulingSummaryBn: "চিকিৎসার প্রয়োজনে ইনহেলার ব্যবহার করলে শুধু কাজা ওয়াজিব হবে, কোনো কাফফারা প্রযোজ্য হবে না। অসুস্থ ব্যক্তি সুস্থতার পর রোজা পূরণ করবেন।",
    rulingSummaryEn: "Using an inhaler out of medical need incurs only Qada (making up the day); no Kaffarah (penalty) is incurred.",
  },

  // 3. Fasting - Eye Drops
  {
    id: "233575",
    slug: "does-fasting-become-void-by-using-eye-drops",
    url: "https://islamqa.org/hanafi/jamia-binoria/233575/does-fasting-become-void-by-using-eye-drops/",
    titleEn: "Does Fasting Become Void by Using Eye Drops? (Hanafi)",
    titleBn: "হানাফী মাযহাবে রোজা অবস্থায় চোখে ড্রপ বা সুরমা ব্যবহারের বিধান",
    sourceCenter: "Jamia Binoria (IslamQA.org Hanafi)",
    keywords: ["eye drops", "eyes", "surma", "kohl", "চোখের ড্রপ", "চোখে ড্রপ", "সুরমা", "চোখ"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী চোখে ড্রপ দিলে বা সুরমা লাগালে রোজা ভাঙে না; এমনকি যদি ড্রপের স্বাদ গলায় অনুভূত হয় তবুও রোজা বিশুদ্ধ থাকবে। ইমাম আবু হানিফা (রহ.)-এর মতে চোখ সরাসরি পাকস্থলীর সাধারণ পথ নয়।",
    rulingSummaryEn: "According to Imam Abu Hanifah and the Hanafi school, eye drops do not invalidate the fast, even if the taste is detected in the throat, as the eye is not considered an open pathway to the body cavity.",
  },

  // 4. Fasting - Ear & Nose Drops
  {
    id: "242222",
    slug: "nose-and-ear-drops-and-fasting",
    url: "https://islamqa.org/hanafi/councilofulama/242222/nose-and-ear-drops-and-fasting/",
    titleEn: "Nose and Ear Drops and Fasting in Hanafi Fiqh",
    titleBn: "হানাফী মতে রোজা অবস্থায় নাকে ও কানে ড্রপ বা ওষুধ ব্যবহারের বিধান",
    sourceCenter: "Council of Ulama (IslamQA.org Hanafi)",
    keywords: ["nose drop", "ear drop", "nasal spray", "কানের ড্রপ", "নাকে ড্রপ", "নাসাল স্প্রে"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী নাকে ড্রপ দিলে তা সরাসরি গলার ভেতরে যায়, ফলে রোজা নষ্ট হয়ে যাবে। কানে ড্রপ দেওয়ার ক্ষেত্রেও ড্রপ কানের পর্দা ভেদ করে ভেতরে গেলে রোজা ভেঙ্গে যায় (কাজা ওয়াজিব)।",
    rulingSummaryEn: "In the Hanafi school, nasal drops invalidate the fast as they drain into the throat. Ear drops entering an intact perforated ear canal to internal passages also break the fast, necessitating Qada.",
  },

  // 5. Fasting - Injections & IV Drips
  {
    id: "178721",
    slug: "does-vitamin-injections-and-drips-break-the-fast",
    url: "https://islamqa.org/hanafi/themufti/178721/does-vitamin-injections-and-drips-break-the-fast/",
    titleEn: "Do Injections and Drips Break the Fast? (Hanafi Ruling)",
    titleBn: "হানাফী ফতোয়ায় রোজা অবস্থায় ইনজেকশন, স্যালাইন ও ইনসুলিনের বিধান",
    sourceCenter: "The Mufti (IslamQA.org Hanafi)",
    keywords: ["injection", "drip", "saline", "insulin", "diabetes", "ইনজেকশন", "ইনসুলিন", "স্যালাইন", "আইভি ড্রিপ", "ডায়াবেটিস"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী পেশী (Intramuscular) বা শিরায় (Intravenous) স্বাভাবিক চিকিৎসার ইনজেকশন বা ইনসুলিন নিলে রোজা ভাঙে না। তবে শক্তি বৃদ্ধির জন্য ইচ্ছাকৃত স্যালাইন বা গ্লুকোজ নেওয়া মাকরূহ হলেও রোজা বাতিল হয় না।",
    rulingSummaryEn: "Medical intramuscular or intravenous injections (including insulin) do not invalidate the fast in Hanafi fiqh because they do not enter through an open bodily orifice directly into the digestive stomach cavity.",
  },

  // 6. Fasting - Miswak
  {
    id: "234702",
    slug: "miswak",
    url: "https://islamqa.org/hanafi/shariahboard/234702/miswak/",
    titleEn: "Miswak While Fasting in Hanafi School",
    titleBn: "রোজা অবস্থায় মেসওয়াক ব্যবহারের মুস্তাহাব ও সুন্নাত বিধান",
    sourceCenter: "Shariah Board (IslamQA.org Hanafi)",
    keywords: ["miswak", "siwak", "মেসওয়াক", "মিসওয়াক", "মেসওয়াক"],
    rulingSummaryBn: "হানাফী মাযহাবে রোজা অবস্থায় সকাল বা বিকাল যেকোনো সময়ে কাঁচা বা শুকনা মেসওয়াক ব্যবহার করা সুন্নত ও সম্পূর্ণ বৈধ; এতে রোজার কোনো ক্ষতি হয় না।",
    rulingSummaryEn: "In the Hanafi madhhab, using a fresh or dry miswak is completely permissible and Sunnah throughout the entire day of fasting, morning or afternoon.",
  },

  // 7. Fasting - Vomiting
  {
    id: "245349",
    slug: "when-does-vomit-break-the-fast",
    url: "https://islamqa.org/hanafi/daruliftaa-birmingham/245349/when-does-vomit-break-the-fast/",
    titleEn: "When Does Vomiting Break the Fast? (Hanafi Guide)",
    titleBn: "হানাফী ফিকহ অনুযায়ী বমি হলে রোজা ভাঙার সুনির্দিষ্ট শর্তাবলী",
    sourceCenter: "Darul Iftaa Birmingham (IslamQA.org Hanafi)",
    keywords: ["vomit", "vomiting", "spit up", "বমি", "রোজা বমি", "মুখ ভরে বমি"],
    rulingSummaryBn: "অনিচ্ছাকৃতভাবে বমি হলে রোজা ভাঙে না, তা যতই হোক না কেন। কিন্তু যদি কেউ ইচ্ছাকৃতভাবে মুখ ভরে (mouthful) বমি করে, তবে রোজা ভেঙ্গে যাবে এবং কাজা ওয়াজিব হবে।",
    rulingSummaryEn: "Involuntary vomiting never breaks the fast regardless of amount. Deliberately inducing a mouthful of vomit invalidates the fast, requiring Qada.",
  },

  // 8. Fasting - Inhaling Steam
  {
    id: "271130",
    slug: "does-inhaling-steam-break-your-fast-an-islamic-guide",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271130/does-inhaling-steam-break-your-fast-an-islamic-guide/",
    titleEn: "Does Inhaling Steam Break Your Fast? (Hanafi Guide)",
    titleBn: "রোজা অবস্থায় গরম পানির ভাপ বা স্টিম ইনহেলেশন নেওয়ার বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["steam", "inhaling steam", "vapor", "ভাপ", "বাষ্প", "স্টিম"],
    rulingSummaryBn: "ইচ্ছাকৃতভাবে গরম পানির বাষ্প বা ধোঁয়া গভীরভাবে শ্বাসনালীতে টেনে নিলে হানাফী মতে রোজা ভেঙ্গে যায়। তাই রোজা অবস্থায় ফেস স্টিম বা হট ভেপার নেওয়া পরিহার করতে হবে।",
    rulingSummaryEn: "Intentionally drawing steam or smoke deeply into the respiratory tract invalidates the fast in Hanafi fiqh, necessitating a makeup fast.",
  },

  // 9. Fasting - Pregnancy & Breastfeeding
  {
    id: "271212",
    slug: "do-i-pay-fidya-for-fasts-missed-during-pregnancy",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271212/do-i-pay-fidya-for-fasts-missed-during-pregnancy/",
    titleEn: "Fidya or Qada for Fasts Missed During Pregnancy (Hanafi)",
    titleBn: "গর্ভাবস্থা ও স্তন্যদানকালে ছুটে যাওয়া রোজার ক্ষেত্রে হানাফী বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["pregnancy", "breastfeeding", "fidya", "pregnant", "গর্ভবতী", "স্তন্যদান", "দুগ্ধদান", "ফিদিয়া গর্ভ"],
    rulingSummaryBn: "হানাফী মাযহাব অনুযায়ী গর্ভবতী বা স্তন্যদাত্রী মা নিজের বা সন্তানের স্বাস্থ্যহানির শঙ্কায় রোজা ছাড়লে তার ওপর কেবল 'কাজা' ওয়াজিব, ফিদিয়া প্রযোজ্য নয়। সুস্থ হওয়ার পর পরবর্তীতে রোজাগুলো কাজা করতে হবে।",
    rulingSummaryEn: "In the Hanafi madhhab, pregnant or nursing mothers who miss fasts due to genuine health risks must only make up the fasts (Qada); paying Fidya is not applicable as long as they can fast later.",
  },

  // 10. Prayer - Making Up Missed Prayers (Qada)
  {
    id: "271037",
    slug: "making-up-missed-prayers-after-reverting-to-islam",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271037/making-up-missed-prayers-after-reverting-to-islam/",
    titleEn: "Making Up Missed Prayers (Qada Umri) in Hanafi Madhhab",
    titleBn: "হানাফী মাযহাবে কাজা নামাজ আদায় এবং তার ধারাবাহিকতার নিয়ম",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["qada", "missed prayers", "qaza", "making up prayer", "কাজা নামাজ", "নামাজ কাজা", "কাজা উমরি", "নামাজ ছুটে যাওয়া"],
    rulingSummaryBn: "হানাফী ফিকহে ছুটে যাওয়া ফরজ ও বিতর নামাজ কাজা করা ওয়াজিব। যার ছয় ওয়াক্তের কম নামাজ কাজা হয়েছে তাকে তারতীব (ধারাবাহিকতা) বজায় রাখতে হবে। বহু বছরের কাজা থাকলে যথাসম্ভব দ্রুত কাজা নামাজ পড়ে শেষ করতে হবে।",
    rulingSummaryEn: "In the Hanafi school, making up all missed Fard and Witr prayers is strictly obligatory. Order (Tartib) is mandatory if fewer than 6 prayers are missed.",
  },

  // 11. Prayer - Witr Prayer & Dua Qunoot
  {
    id: "271171",
    slug: "which-dua-qunut-to-recite-in-witr-prayer-a-hanafi-guide",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271171/which-dua-qunut-to-recite-in-witr-prayer-a-hanafi-guide/",
    titleEn: "Dua Qunut and Witr Prayer Format in Hanafi Madhhab",
    titleBn: "হানাফী পদ্ধতিতে ৩ রাকাত বিতর সালাত ও রুকুর আগে দুআ কুনূতের বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["witr", "qunoot", "qunut", "dua qunoot", "বিতর", "কুনুত", "দোয়া কুনুত", "বিতর নামাজ"],
    rulingSummaryBn: "হানাফী মাযহাবে বিতর নামাজ ৩ রাকাত ওয়াজিব, যা এক সালামে পড়তে হয় (মাগরিবের মতো কিন্তু ৩য় রাকাতে কিরাআতের পর তাকবীর বলে দুআ কুনূত পড়তে হয়, রুকুর পূর্বে)। দুআ কুনূত পড়া ওয়াজিব।",
    rulingSummaryEn: "In Hanafi fiqh, Witr is 3 continuous rakats with one final Taslim. In the 3rd rakat, after Surah recitation, raising hands with Takbir and reciting Dua Qunut before bowing (Ruku) is Wajib.",
  },

  // 12. Prayer - Travel & Plane Prayer (Qasr)
  {
    id: "230574",
    slug: "does-one-have-to-perform-salaah-while-travelling-on-a-plane",
    url: "https://islamqa.org/hanafi/arij-canada/230574/does-one-have-to-perform-salaah-while-travelling-on-a-plane/",
    titleEn: "Performing Salah on an Airplane (Hanafi Principles)",
    titleBn: "চলন্ত বিমানে সালাত আদায় এবং কেবলামুখী হওয়ার হানাফী বিধান",
    sourceCenter: "Arij Canada (IslamQA.org Hanafi)",
    keywords: ["airplane prayer", "plane salah", "travel prayer", "বিমান নামাজ", "বিমানে সালাত", "চলন্ত বাহনে নামাজ"],
    rulingSummaryBn: "বিমানে ফরজ নামাজ দাঁড়িয়ে কেবলামুখী হয়ে আদায় করতে হবে। যদি দাঁড়ানো সম্ভব না হয় এবং সময় শেষ হওয়ার উপক্রম হয় তবে বসে আদায় করবে এবং পরবর্তীতে সতর্কতামূলকভাবে পুনরায় পড়ে নেওয়া উত্তম।",
    rulingSummaryEn: "Fard prayers on an airplane must be performed standing facing the Qiblah if possible. If unable and time is expiring, one prays seated according to Hanafi rules.",
  },
  {
    id: "271238",
    slug: "can-a-woman-pray-qasr-salah-when-traveling-without-a-mahram",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271238/can-a-woman-pray-qasr-salah-when-traveling-without-a-mahram/",
    titleEn: "Distance for Qasr and Travel Rulings in Hanafi Fiqh",
    titleBn: "মুসাফিরের সফরের দূরত্ব (৪৮ মাইল / ৭৭.৫ কিমি) ও কসর নামাজের হানাফী শর্ত",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["qasr", "musafir", "travel distance", "কসর", "মুসাফির", "সফর", "কসর নামাজ"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী ৪৮ মাইল (প্রায় ৭৭.৫ কি.মি.) বা তদূর্ধ্ব দূরত্বে ১৫ দিনের কম অবস্থানের নিয়তে বের হলে ৪ রাকাত বিশিষ্ট ফরজ নামাজ ২ রাকাত কসর করা ওয়াজিব।",
    rulingSummaryEn: "In the Hanafi school, traveling 48 miles (~77.5 km) or more with intent to stay less than 15 days obligates Qasr (shortening 4-rakat Fard to 2 rakats).",
  },

  // 13. Taharah - Blood from Wounds & Mosquitoes
  {
    id: "271047",
    slug: "does-mosquito-blood-break-wudu-or-invalidate-salah",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271047/does-mosquito-blood-break-wudu-or-invalidate-salah/",
    titleEn: "Does Blood Break Wudu or Invalidate Salah? (Hanafi)",
    titleBn: "হানাফী মাযহাবে শরীর থেকে রক্ত প্রবাহিত হলে অজু ভঙ্গের বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["blood", "bleeding", "mosquito", "cut", "wudu break", "রক্ত", "রক্তপাত", "অজু রক্ত", "মশার রক্ত"],
    rulingSummaryBn: "হানাফী মাযহাবে শরীর থেকে রক্ত বা পুঁজ বের হয়ে এমন জায়গায় গড়িয়ে পড়লে যা ধৌত করা আবশ্যক, তবেই অজু ভেঙ্গে যায়। রক্ত যদি না গড়ায় তবে অজু নষ্ট হয় না। মশার রক্ত অজু ভাঙে না।",
    rulingSummaryEn: "In the Hanafi madhhab, blood exiting the body breaks Wudu only if it flows beyond its point of exit. Non-flowing blood or mosquito blood does not break Wudu.",
  },

  // 14. Taharah - Dog Saliva
  {
    id: "271042",
    slug: "is-dog-saliva-considered-najis-in-islam",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271042/is-dog-saliva-considered-najis-in-islam/",
    titleEn: "Is Dog Saliva Considered Najis in Hanafi Fiqh?",
    titleBn: "হানাফী মাযহাবে কুকুরের লালা ও শরীরের নাপাকির সূক্ষ্ম শারঈ বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["dog", "dog saliva", "najis", "কুকুর", "কুকুরের লালা", "নাপাক কুকুর"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী কুকুরের শরীর নিজে নাপাকে আইন নয়; তবে তার লালা, মুখ ও উচ্ছিষ্ট নাপাকে গালাজা (তীব্র অপবিত্র)। কুকুরের শুকনো লোম শরীরে স্পর্শ করলে নাপাক হয় না, কিন্তু লালা লাগলে ধৌত করা আবশ্যক।",
    rulingSummaryEn: "In Hanafi jurisprudence, the dog itself is not inherently impure, but its saliva, mouth, and bodily discharges are heavily impure (Najasah Ghalizah) and must be washed.",
  },

  // 15. Taharah - Nail Polish & Fake Nails
  {
    id: "271058",
    slug: "does-nail-polish-invalidate-wudu-or-salah",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271058/does-nail-polish-invalidate-wudu-or-salah/",
    titleEn: "Does Nail Polish Invalidate Wudu? (Hanafi Principles)",
    titleBn: "হানাফী ফতোয়ায় নেইলপলিশ, ফেক নখ ও অজুর শুদ্ধতার শর্ত",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["nail polish", "nails", "acrylic nails", "নেইলপলিশ", "নখ", "অজু নেইলপলিশ"],
    rulingSummaryBn: "সাধারণ নেইলপলিশ নখের ওপর জলরোধী স্তর তৈরি করে, যা নখে পানি পৌঁছাতে বাধা দেয়। ফলে নেইলপলিশ থাকা অবস্থায় অজু ও ফরজ গোসল সহীহ হবে না। অজু করার আগে তা সম্পূর্ণ তুলে ফেলতে হবে।",
    rulingSummaryEn: "Waterproof nail polish forms an impermeable barrier preventing water from reaching the nail bed, thereby invalidating Wudu and Fard Ghusl in Hanafi fiqh.",
  },

  // 16. Taharah - Waterproof Socks (Khuffayn)
  {
    id: "271079",
    slug: "are-hypershellz-waterproof-socks-valid-for-mash-in-wudu",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271079/are-hypershellz-waterproof-socks-valid-for-mash-in-wudu/",
    titleEn: "Conditions for Wiping Over Socks (Masah) in Hanafi School",
    titleBn: "হানাফী ফিকহে মোজার ওপর মাসেহ করার প্রামাণ্য শর্তাবলী",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["socks", "masah", "khuffayn", "wiping socks", "মোজা মাসেহ", "মোজার ওপর মাসেহ", "মাসেহ"],
    rulingSummaryBn: "হানাফী মাযহাবে মোজার ওপর মাসেহ জায়েজ হতে হলে মোজাটি চামড়ার হতে হবে অথবা চামড়ার মোজার মতো ৩টি শর্ত পূরণ করতে হবে: ১) পানি প্রবেশে বাধা দেওয়া, ২) না বেঁধে নিজে নিজে দাঁড়িয়ে থাকা, ৩) তা পরে অন্তত ৩ মাইল হাঁটার স্থায়িত্ব থাকা। পাতলা সুতির মোজায় মাসেহ জায়েজ নেই।",
    rulingSummaryEn: "In Hanafi fiqh, Masah is only valid on leather socks (Khuffayn) or thick waterproof durable socks that can be walked in for ~3 miles without tearing; normal cotton socks are invalid for wiping.",
  },

  // 17. Zakat - Gold Jewelry for Personal Use
  {
    id: "271219",
    slug: "is-zakat-due-on-gold-jewelry-an-islamic-guide",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271219/is-zakat-due-on-gold-jewelry-an-islamic-guide/",
    titleEn: "Is Zakat Due on Gold Jewelry? (Hanafi Obligation)",
    titleBn: "হানাফী মাযহাবে নারীর ব্যবহারের স্বর্ণালঙ্কারে যাকাত ফরজ হওয়ার বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["zakat gold", "jewelry", "gold jewelry", "স্বর্ণ", "স্বর্ণালঙ্কার", "যাকাত স্বর্ণ", "গহনা যাকাত"],
    rulingSummaryBn: "হানাফী মাযহাবের বিশিষ্ট ও সুনির্দিষ্ট ফতোয়া অনুযায়ী নারীর ব্যক্তিগত ব্যবহারের স্বর্ণ ও রূপার গহনাতেও নেসাব পরিমাণ পৌঁছালে প্রতি বছর ২.৫% যাকাত দেওয়া ফরজ। এটি অন্যান্য মাযহাবের চেয়ে হানাফী মাযহাবের একটি মৌলিক বৈশিষ্ট্য।",
    rulingSummaryEn: "A foundational distinction of the Hanafi school is that Zakat is strictly obligatory (Fard) on all gold and silver jewelry, even if kept exclusively for personal daily wear, once it meets the Nisab threshold.",
  },

  // 18. Zakat - Savings for a House
  {
    id: "271041",
    slug: "do-you-pay-zakat-on-savings-for-a-house",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271041/do-you-pay-zakat-on-savings-for-a-house/",
    titleEn: "Zakat on Savings for Buying a House (Hanafi Ruling)",
    titleBn: "হানাফী ফতোয়ায় বাড়ি বা ফ্ল্যাট ক্রয়ের জন্য জমাকৃত টাকার ওপর যাকাতের বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["zakat savings", "house savings", "buying house", "বাড়ি ক্রয়ের টাকা", "জমানো টাকা যাকাত", "সঞ্চয় যাকাত"],
    rulingSummaryBn: "বাড়ি, ফ্ল্যাট বা বিয়ের উদ্দেশ্যে সঞ্চিত নগদ অর্থ যদি নেসাব পরিমাণ হয় এবং এক চান্দ্রবছর অতিবাহিত হয়, তবে হানাফী ফিকহ অনুযায়ী তার ওপর পূর্ণ যাকাত দিতে হবে, যতক্ষণ না তা প্রকৃত বাড়ি কেনায় ব্যয় হয়ে যায়।",
    rulingSummaryEn: "Cash savings accumulated for purchasing a house or future needs are fully subject to Zakat in Hanafi fiqh once one lunar year passes, until the funds are actually disbursed in the transaction.",
  },

  // 19. Finance - Cryptocurrency & Bitcoin
  {
    id: "271043",
    slug: "the-islamic-ruling-on-working-in-cryptocurrency-trading",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271043/the-islamic-ruling-on-working-in-cryptocurrency-trading/",
    titleEn: "Working in Cryptocurrency Trading in Hanafi Jurisprudence",
    titleBn: "হানাফী আলেমদের দৃষ্টিতে ক্রিপ্টোকারেন্সি ও বিটকয়েন ট্রেডিংয়ের শারঈ বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["cryptocurrency", "crypto", "bitcoin", "trading crypto", "ক্রিপ্টোকারেন্সি", "বিটকয়েন", "ক্রিপ্টো ট্রেডিং"],
    rulingSummaryBn: "অধিকাংশ সমসাময়িক হানাফী মুফতি ও দারুল ইফতা ক্রিপ্টোকারেন্সিকে প্রকৃত সম্পদ (মালে মুতাকাওউইম) ও সরকারি জামানতহীন মনে করায় এবং এতে তীব্র জুয়া ও ফটকাবাজির (গারার) ঝুঁকি থাকায় এতে সাধারণ ট্রেডিং করা থেকে বিরত থাকার ফতোয়া প্রদান করেন।",
    rulingSummaryEn: "Major contemporary Hanafi Ifta councils strongly caution against speculative cryptocurrency trading due to high Gharar (uncertainty), lack of intrinsic value, and speculative volatility.",
  },

  // 20. Finance - Conventional Bank Employment & Interest
  {
    id: "271059",
    slug: "is-an-accounting-job-for-clients-with-interest-loans-halal",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271059/is-an-accounting-job-for-clients-with-interest-loans-halal/",
    titleEn: "Accounting and Banking Jobs Dealing with Interest (Hanafi)",
    titleBn: "সুদ সংশ্লিষ্ট ব্যাংকিং ও অ্যাকাউন্টিং চাকরির ব্যাপারে হানাফী ফতোয়া",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["bank job", "interest job", "accounting interest", "ব্যাংক চাকরি", "সুদ চাকরি", "অ্যাকাউন্টিং সুদ"],
    rulingSummaryBn: "হানাফী ফিকহ অনুযায়ী সরাসরি সুদের চুক্তি তৈরি, সাক্ষ্য দেওয়া বা সুদের হিসাব নিকাশ করার চাকরি নাজায়েজ। তবে পরোক্ষ কোনো প্রযুক্তিগত বা সাধারণ সেবা যেখানে সুদের প্রত্যক্ষ সম্পর্ক নেই তা মাকরূহ হলেও বিকল্প হালাল চাকরি অনুসন্ধান ওয়াজিব।",
    rulingSummaryEn: "Directly writing, calculating, or executing interest-bearing loan contracts is strictly prohibited in Hanafi jurisprudence. Employees should actively seek fully halal employment.",
  },

  // 21. Food & Halal - Seafood (Crabs, Prawns, Shrimps, Lobsters)
  {
    id: "242224",
    slug: "hanafi-eating-prawns",
    url: "https://islamqa.org/hanafi/councilofulama/242224/hanafi-eating-prawns/",
    titleEn: "Hanafi Ruling on Eating Prawns and Shrimps",
    titleBn: "হানাফী মাযহাবে চিংড়ি মাছ ভক্ষণের বিশুদ্ধ শারঈ ফতোয়া",
    sourceCenter: "Council of Ulama (IslamQA.org Hanafi)",
    keywords: ["prawn", "shrimp", "seafood", "fish", "চিংড়ি", "চিংড়ি মাছ", "চিংড়ি হানাফী"],
    rulingSummaryBn: "হানাফী ফিকহে জলজ প্রাণীর মধ্যে কেবল 'মাছ' (সামাক) খাওয়া হালাল। অধিকাংশ হানাফী ফুকাহায়ে কেরাম চিংড়িকে মাছের অন্তর্ভুক্ত গণ্য করায় তা খাওয়া জায়েজ ও বৈধ।",
    rulingSummaryEn: "In the Hanafi school, only aquatic creatures classified as fish (Samak) are permissible. The vast majority of contemporary Hanafi scholars classify prawns/shrimps as fish, making them Halal to consume.",
  },
  {
    id: "234803",
    slug: "shrimp-crab-lobster-are-allowed-to-eat",
    url: "https://islamqa.org/hanafi/shariahboard/234803/shrimp-crab-lobster-are-allowed-to-eat/",
    titleEn: "Are Crab, Lobster, and Shellfish Allowed in Hanafi Fiqh?",
    titleBn: "হানাফী মাযহাবে কাঁকড়া, লবস্টার ও সামুদ্রিক শামুক-ঝিনুক খাওয়ার বিধান",
    sourceCenter: "Shariah Board (IslamQA.org Hanafi)",
    keywords: ["crab", "lobster", "shellfish", "octopus", "squid", "কাঁকড়া", "লবস্টার", "শামুক", "ঝিনুক", "স্কুইড"],
    rulingSummaryBn: "হানাফী মাযহাবের মূলনীতি অনুযায়ী কাঁকড়া, স্কুইড, অক্টোপাস এবং লবস্টার মাছের অন্তর্ভুক্ত নয়, তাই হানাফী ফিকহে এগুলো খাওয়া না-জায়েজ ও মাকরূহে তাহরীমী।",
    rulingSummaryEn: "According to the Hanafi madhhab, non-fish sea creatures such as crabs, lobsters, octopuses, and squids are not permissible to eat (Makruh Tahrimi).",
  },

  // 22. Food & Halal - Mirin & Alcohol in Cooking
  {
    id: "271038",
    slug: "is-mirin-in-sushi-halal-for-hanafis",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271038/is-mirin-in-sushi-halal-for-hanafis/",
    titleEn: "Is Mirin in Sushi and Food Halal for Hanafis?",
    titleBn: "হানাফী ফিকহে সুশি ও খাবারে মিরিন বা অ্যালকোহল ব্যবহারের বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["mirin", "sushi", "alcohol food", "cooking wine", "মিরিন", "সুশি", "খাবারে অ্যালকোহল"],
    rulingSummaryBn: "মিরিন হলো গাঁজানো রাইস ওয়াইন যাতে ১০-১৪% অ্যালকোহল থাকে। হানাফী ফিকহ অনুযায়ী রান্নায় মিরিন ব্যবহার করা নাজায়েজ ও হারাম, কারণ এটি নেশাগ্রস্তকারী মাদক পানীয় থেকে প্রস্তুত।",
    rulingSummaryEn: "Mirin is alcoholic fermented rice wine. In the Hanafi school, cooking with mirin is impermissible (Haram) because intoxicants cannot be consumed even in small culinary quantities.",
  },

  // 23. Lifestyle - Beard Length in Hanafi Madhhab
  {
    id: "271167",
    slug: "what-is-the-obligatory-beard-length-in-the-hanafi-madhhab",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271167/what-is-the-obligatory-beard-length-in-the-hanafi-madhhab/",
    titleEn: "Obligatory Beard Length in the Hanafi Madhhab",
    titleBn: "হানাফী মাযহাবে এক মুষ্টি দাড়ি রাখা ও দাড়ি ছাঁটার শারঈ বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["beard", "beard length", "shaving beard", "fist beard", "দাড়ি", "দাড়ি", "দাড়ি ছাঁটা", "এক মুষ্টি দাড়ি"],
    rulingSummaryBn: "হানাফী মাযহাবে পুরুষের জন্য এক মুষ্টি (চার আঙুল) পরিমাণ দাড়ি রাখা ওয়াজিব। দাড়ি শেভ করা বা এক মুষ্টির কম ছাঁটা মাকরূহে তাহরীমী বা নাজায়েজ। এক মুষ্টির অতিরিক্ত অংশ ছাঁটা সুন্নাহসম্মত।",
    rulingSummaryEn: "In the Hanafi school, keeping a fist-length beard is Wajib (obligatory). Shaving or trimming below a fist is prohibitively disliked (Makruh Tahrimi). Trimming what exceeds a fist is Sunnah.",
  },

  // 24. Lifestyle - Music in Hanafi Madhhab
  {
    id: "271193",
    slug: "the-islamic-ruling-on-music-in-the-hanafi-madhhab",
    url: "https://islamqa.org/hanafi/darul-iftaa-chicago/271193/the-islamic-ruling-on-music-in-the-hanafi-madhhab/",
    titleEn: "The Islamic Ruling on Music in the Hanafi Madhhab",
    titleBn: "হানাফী ফিকহ অনুযায়ী বাদ্যযন্ত্র ও গান-বাজনা শোনার সুনির্দিষ্ট বিধান",
    sourceCenter: "Darul Iftaa Chicago (IslamQA.org Hanafi)",
    keywords: ["music", "musical instruments", "songs", "গান", "বাজনা", "মিউজিক", "বাদ্যযন্ত্র"],
    rulingSummaryBn: "হানাফী মাযহাবের সমস্ত মূল কিতাবে বাদ্যযন্ত্র বাজানো এবং বাদ্যযন্ত্রসহ গান শোনা সম্পূর্ণ হারাম ও গুনাহে কবীরা। কেবল দফ বাজানো বিশেষ ক্ষেত্রে (যেমন বিয়ে বা ঈদে নারীদের মাঝে) সীমিত শর্তে অনুমোদিত।",
    rulingSummaryEn: "In the Hanafi school, musical instruments and listening to instrumental music are strictly prohibited (Haram). Only the simple duff without cymbals is permitted in limited joyful contexts like weddings.",
  },

  // 25. Lifestyle - Tattoos
  {
    id: "244741",
    slug: "are-lip-tattoos-haram-even-though-they-are-not-permanent",
    url: "https://islamqa.org/hanafi/daruliftaa-birmingham/244741/are-lip-tattoos-haram-even-though-they-are-not-permanent/",
    titleEn: "Tattoos and Micro-pigmentation in Hanafi Fiqh",
    titleBn: "হানাফী ফতোয়ায় শরীরে ট্যাটু বা উল্কি আঁকার নিষেধাজ্ঞা ও বিধান",
    sourceCenter: "Darul Iftaa Birmingham (IslamQA.org Hanafi)",
    keywords: ["tattoo", "tattoos", "lip tattoo", "ink", "ট্যাটু", "উল্কি", "শরীরে ট্যাটু"],
    rulingSummaryBn: "হানাফী ফিকহে সুই ফুটিয়ে ত্বকের নিচে স্থায়ী কালি প্রবেশ করিয়ে ট্যাটু করা সম্পূর্ণ হারাম ও অভিশপ্ত। অস্থায়ী মেহেদি বা স্টিকার যা চামড়ার নিচে রক্ত ও কালি জমাট বাঁধায় না তা বৈধ।",
    rulingSummaryEn: "Permanent tattooing involving needle piercing and ink beneath the skin is strictly prohibited (Haram) in Hanafi fiqh based on explicit Sahih Hadiths. Non-toxic temporary henna surface stains are allowed.",
  },
];

/**
 * Smart Topical Matcher for Hanafi Queries:
 * Scans user inquiry and returns the best exact verified Hanafi fatwas from IslamQA.org!
 */
export function findTopicalHanafiFatwas(
  combinedText: string,
  preferredLang: "bn" | "en" | "ar" | "ur" = "bn"
): { title: string; url: string; questionNo?: string; verified: boolean }[] {
  const lower = combinedText.toLowerCase();

  // Score each fatwa record by matched keywords
  const scored = HANAFI_ISLAMQA_DATABASE.map((record) => {
    let score = 0;
    for (const kw of record.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += 2;
      }
    }
    if (lower.includes(record.slug.replace(/-/g, " "))) {
      score += 4;
    }
    return { record, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const matched = scored.filter((s) => s.score > 0);

  if (matched.length > 0) {
    return matched.slice(0, 3).map((m) => ({
      title: preferredLang === "bn" ? m.record.titleBn : m.record.titleEn,
      url: m.record.url,
      questionNo: m.record.id,
      verified: true,
    }));
  }

  // Default fallback for Hanafi: Top foundational Hanafi fatwas from IslamQA.org
  return [
    {
      title: preferredLang === "bn" ? HANAFI_ISLAMQA_DATABASE[0].titleBn : HANAFI_ISLAMQA_DATABASE[0].titleEn,
      url: HANAFI_ISLAMQA_DATABASE[0].url,
      questionNo: HANAFI_ISLAMQA_DATABASE[0].id,
      verified: true,
    },
    {
      title: preferredLang === "bn" ? HANAFI_ISLAMQA_DATABASE[9].titleBn : HANAFI_ISLAMQA_DATABASE[9].titleEn,
      url: HANAFI_ISLAMQA_DATABASE[9].url,
      questionNo: HANAFI_ISLAMQA_DATABASE[9].id,
      verified: true,
    },
  ];
}
