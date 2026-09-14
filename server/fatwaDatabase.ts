export interface FallbackFatwa {
  keywords: string[];
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
  sources: {
    title: string;
    url: string;
    questionNo: string;
  }[];
}

export const FALLBACK_FATWAS: FallbackFatwa[] = [
  {
    keywords: ["injection", "ইনজেকশন", "স্যালাইন", "drip", "রোজা", "fast", "fasting", "ইনজেকশান"],
    questionBn: "রোজা রাখা অবস্থায় ইনজেকশন বা স্যালাইন নিলে কি রোজা ভেঙ্গে যাবে?",
    questionEn: "Does receiving an injection or IV drip invalidate the fast in Ramadan?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
ইসলামকিউএ (IslamQA)-এর সুনির্দিষ্ট ফতোয়া অনুযায়ী:
- **চিকিৎসামূলক সাধারণ ইনজেকশন** (যেমন অ্যান্টিবায়োটিক, পেইনকিলার, ইনসুলিন বা ভ্যাকসিন) মাংসপেশি বা শিরায় গ্রহণ করলে **রোজা ভাঙে না**।
- **পুষ্টিকর ইনজেকশন বা গ্লুকোজ স্যালাইন** (Nutritional IV Drip) যা খাদ্য ও পানীয়ের বিকল্প হিসেবে শরীরে শক্তি জোগায়, তা গ্রহণ করলে **রোজা ভেঙে যাবে** এবং পরবর্তীতে কাজা আদায় করতে হবে।

---

### ২. দলিল ও ফতোয়ার বিস্তারিত ব্যাখ্যা (Evidences from IslamQA)
IslamQA ফতোয়া নং **৩৭৭৬১** এবং **২২৯৯**-এ শায়খ ইবনে উসাইমীন (রহ.) ও শায়খ মুহাম্মদ বিন সালেহ আল-উসাইমীন (রহ.)-এর বক্তব্য উদ্ধৃত করে বলা হয়েছে:
> রোজা ভঙ্গের কারণ হলো খাদ্য ও পানীয় গ্রহণ করা। সাধারণ ব্যথানাশক বা রোগ নিরাময়কারী ইনজেকশন কোনোভাবেই খাদ্য বা পানীয়ের অন্তর্ভুক্ত নয়। এটি মুখ বা সাধারণ খাদ্যনালী দিয়ে পাকস্থলীতে পৌঁছে না। তাই এটি রোজার মূল উদ্দেশ্যকে বিনষ্ট করে না।

তবে গ্লুকোজ, স্যালাইন বা এমন ইনফিউশন যা একজন ব্যক্তিকে ক্ষুধা ও তৃষ্ণা থেকে মুক্ত রাখে, তা সরাসরি খাদ্য ও পানীয়ের স্থলাভিষিক্ত হওয়ায় রোজা ভঙ্গকারী হিসেবে গণ্য হবে।

---

### ৩. সতর্কতা ও বাস্তব করণীয় (Practical Guidelines)
- যদি দিনের বেলা ইনজেকশন নেওয়া জরুরি না হয়, তবে ইফতারের পর নেওয়া উত্তম ও অধিকতর সতর্কতামূলক।
- ডায়াবেটিস রোগীদের জন্য ইনসুলিন ইনজেকশন দিনের বেলা গ্রহণ সম্পূর্ণ বৈধ এবং এতে রোজা নষ্ট হয় না।`,
    answerEn: `### 1. Ruling Summary
According to verified fatwas on IslamQA (islamqa.info):
- **Non-nutritive injections** (such as intramuscular/intravenous medications, insulin, pain relievers, and vaccines) **do not invalidate the fast**.
- **Nutritive injections or IV drips** (such as glucose or saline drips that provide nourishment in place of food and drink) **do invalidate the fast**, requiring a make-up fast (qada) after Ramadan.

---

### 2. Evidences & Scholarly Explanation (IslamQA)
IslamQA fatwas #37761 and #2299 reference the consensus of contemporary scholars including Shaykh Ibn 'Uthaymeen (may Allah have mercy on him):
> Injections are of two types:
> 1. Nutritive injections that take the place of food and drink. These invalidate the fast because they serve the exact function of nourishment.
> 2. Non-nutritive injections used purely for medical treatment. These do not invalidate the fast because they are neither food nor drink, nor do they reach the stomach through normal passages.

---

### 3. Practical Recommendations
- Diabetic patients may safely administer insulin injections while fasting without any invalidation.
- When possible without hardship, delaying elective injections until after Maghrib is recommended to avoid any doubt.`,
    sources: [
      {
        title: "Does an injection break the fast? - IslamQA Fatwa #37761",
        url: "https://islamqa.info/en/answers/37761/does-an-injection-break-the-fast",
        questionNo: "37761",
      },
      {
        title: "Ruling on medical injections during fasting - IslamQA Fatwa #2299",
        url: "https://islamqa.info/en/answers/2299/injections-whilst-fasting",
        questionNo: "2299",
      },
    ],
  },
  {
    keywords: ["sleep", "ঘুম", "ভুল", "কাজা", "forget", "missed prayer", "নামাজ", "সালাত", "prayer"],
    questionBn: "ঘুম বা অনিচ্ছাকৃত ভুলে নামাজ ছুটে গেলে কীভাবে তা আদায় করতে হবে?",
    questionEn: "What is the ruling on missed prayers due to oversleeping or forgetfulness?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
ঘুম বা অনিচ্ছাকৃত বিস্মৃতির কারণে ওয়াক্তের মধ্যে নামাজ আদায় করতে না পারলে ব্যক্তি গুনাহগার হবে না। তবে **ঘুম ভাঙার বা মনে পড়ার সাথে সাথে অবিলম্বে (বিলম্ব না করে)** সেই নামাজ কাজা আদায় করে নেওয়া ফরজ।

---

### ২. দলিল ও ফতোয়ার বিস্তারিত ব্যাখ্যা (Evidences from IslamQA)
IslamQA ফতোয়া নং **২০৮৮২**-তে সহীহ বুখারী ও মুসলিমের হাদীস উদ্ধৃত হয়েছে:
রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম ইরশাদ করেছেন:
> "যে ব্যক্তি নামাজের কথা ভুলে যায় অথবা ঘুমিয়ে পড়ে, তার কাফফারা হলো যখনই মনে পড়বে তখনই সে তা আদায় করে নেবে। এর কোনো বিকল্প কাফফারা নেই।" *(সহীহ বুখারী: ৫৯৭, সহীহ মুসলিম: ৬৮৪)*

**ওয়াক্তের বাইরে নামাজের নিয়ম:**
অনেকে মনে করেন ছুটে যাওয়া নামাজ পরবর্তী দিন একই ওয়াক্তের সাথে পড়তে হয়; এটি একটি ভুল ধারণা। ঘুম ভাঙামাত্রই বা স্মরণে আসাই হলো ওই ব্যক্তির জন্য ওই নামাজের প্রকৃত ওয়াক্ত। নিষিদ্ধ ওয়াক্তেও (যেমন সূর্যোদয় বা সূর্যাস্তের সময়) ছুটে যাওয়া নামাজ অবিলম্বে আদায় করতে হবে।

---

### ৩. শর্ত ও সতর্কতা
- ইচ্ছাকৃতভাবে অলসতা করে ওয়াক্ত পার করে দিলে তওবা করা ওয়াজিব।
- রাতে বা দিনের বেলা এলার্ম, পরিবারের সদস্য বা অন্যান্য মাধ্যমে জাগ্রত হওয়ার পূর্ণ প্রস্তুতি রাখা আবশ্যক।`,
    answerEn: `### 1. Ruling Summary
If a prayer is missed due to involuntary sleep or forgetfulness, there is no sin upon the person. However, it is an **obligation (fard) to pray it immediately as soon as one wakes up or remembers**, without any delay.

---

### 2. Evidences from IslamQA (Fatwa #20882)
The Prophet (peace and blessings of Allah be upon him) explicitly stated:
> "Whoever forgets a prayer or sleeps and misses it, its expiation is to pray it when he remembers it." *(Narrated by al-Bukhari 597, Muslim 684)*

IslamQA notes that a common misconception is waiting until the same prayer the following day. This is incorrect; the time for the missed prayer begins the exact moment the person wakes up or remembers, regardless of the time of day.

---

### 3. Key Conditions
- One must take reasonable means (setting alarms, asking household members) to wake up for prayer.
- Missing prayer deliberately out of laziness is a major sin requiring sincere repentance (tawbah).`,
    sources: [
      {
        title: "Sleeping through a prayer and the ruling on making it up - IslamQA Fatwa #20882",
        url: "https://islamqa.info/en/answers/20882/sleeping-through-a-prayer-and-the-ruling-on-making-it-up",
        questionNo: "20882",
      },
      {
        title: "Ruling on one who oversleeps and misses Fajr prayer - IslamQA Fatwa #111252",
        url: "https://islamqa.info/en/answers/111252/oversleeping-and-missing-fajr-prayer",
        questionNo: "111252",
      },
    ],
  },
  {
    keywords: ["airplane", "plane", "travel", "বিমান", "ট্রেন", "গাড়ি", "সফর", "যানবাহন", "flying"],
    questionBn: "চলন্ত বিমান, ট্রেন বা গাড়িতে নামাজের ওয়াক্ত চলে যাওয়ার উপক্রম হলে কীভাবে সালাত আদায় করবে?",
    questionEn: "How to pray while traveling on an airplane or moving vehicle if the time is expiring?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
চলন্ত বিমানে বা যানবাহনে ফরজ নামাজ আদায়ের ক্ষেত্রে:
১. যদি গন্তব্যে পৌঁছানোর পর ওয়াক্ত বাকি থাকে, তবে অবতরণ করে জমিনে পূর্ণ রুকু-সিজদা সহকারে নামাজ পড়া উত্তম।
২. যদি ওয়াক্ত চলে যাওয়ার আশঙ্কা থাকে এবং নামাজটি জমা (যেমন যোহর-আসর বা মাগরিব-ইশা) করার সুযোগও না থাকে, তবে **বিমানের ভেতরেই সাধ্যানুযায়ী দাঁড়িয়ে এবং কিবলামুখী হয়ে নামাজ আদায় করা ওয়াজিব**।

---

### ২. দলিল ও ফতোয়ার বিস্তারিত ব্যাখ্যা (IslamQA Fatwa #21869)
আল্লাহ তাআলা পবিত্র কুরআনে ইরশাদ করেন:
> "অতএব তোমরা যথাসাধ্য আল্লাহকে ভয় করো।" *(সূরা আত-তাগাবুন: ১৬)*

IslamQA ফতোয়ায় স্পষ্ট করা হয়েছে:
- **ফরজ সালাতে দাঁড়ানো (কিয়াম):** ফরজ নামাজে শারীরিক সক্ষমতা থাকলে দাঁড়িয়ে থাকা একটি রুকন। বিমানে যদি করিডোরে বা পেছনের ফাঁকা স্থানে দাঁড়িয়ে নামাজ পড়ার সুযোগ থাকে, তবে দাঁড়িয়ে কিবলামুখী হয়ে পড়তে হবে।
- **বসে নামাজ পড়া:** যদি তীব্র ঝাঁকুনি, নিরাপত্তা বাধা বা স্থানের অভাবে দাঁড়ানো একেবারেই অসম্ভব হয়, তবে সিটে বসেই ইশারার মাধ্যমে রুকু ও সিজদা করে নামাজ আদায় করতে হবে (রুকুর চেয়ে সিজদায় মাথা একটু বেশি ঝুঁকাবে)।

---

### ৩. কিবলা নির্ধারণ
ফ্লাইটের স্ক্রিনে দেখানো মক্কার দিকনির্দেশনা দেখে কিবলা নির্ধারণ করবেন। দিক জানা অসম্ভব হলে যথাসাধ্য অনুমান করে নামাজ শুরু করবেন।`,
    answerEn: `### 1. Ruling Summary
When traveling on an airplane:
1. If the flight will land before the prayer time (or the combined prayer time for Zuhr-Asr or Maghrib-Isha) expires, it is preferable to pray on the ground with full standing, ruku', and sujud.
2. If the prayer time will expire in mid-air, it is **obligatory to pray aboard the aircraft to the best of one's ability**.

---

### 2. Scholarly Evidence (IslamQA Fatwa #21869)
Allah says in the Qur'an:
> "So fear Allah as much as you are able." *(Surah at-Taghabun: 16)*

According to IslamQA:
- **Standing (Qiyam):** Standing is an essential pillar (rukn) of obligatory prayers. If standing in the aisle or galley area is safe and permitted by flight crew, one must stand facing the Qiblah.
- **Sitting Exception:** If standing is physically dangerous or forbidden by the flight crew due to turbulence, one may pray seated in the passenger chair, bowing the head for ruku' and bowing deeper for sujud.

---

### 3. Determining the Qiblah
Use the in-flight entertainment flight path map to locate the direction of Makkah. If impossible to determine, make an educated estimate and pray without hesitation.`,
    sources: [
      {
        title: "How to pray on an airplane - IslamQA Fatwa #21869",
        url: "https://islamqa.info/en/answers/21869/how-to-pray-on-an-airplane",
        questionNo: "21869",
      },
      {
        title: "Combining prayers during travel - IslamQA Fatwa #49885",
        url: "https://islamqa.info/en/answers/49885/joining-prayers-when-traveling",
        questionNo: "49885",
      },
    ],
  },
  {
    keywords: ["crypto", "bitcoin", "ক্রিপ্টো", "বিটকয়েন", "ট্রেডিং", "currency", "কয়েন"],
    questionBn: "ক্রিপ্টোকারেন্সি এবং ডিজিটাল কয়েন লেনদেন সম্পর্কে ইসলামকিউএ এর ফতোয়া কী?",
    questionEn: "What is the Islamic ruling on trading cryptocurrencies and digital assets according to IslamQA?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
IslamQA-এর নির্ভরযোগ্য ফতোয়া অনুসারে, বর্তমান পরিস্থিতিতে বিটকয়েন ও অন্যান্য অননুমোদিত ক্রিপ্টোকারেন্সি লেনদেন ও ট্রেডিং করা **নিষিদ্ধ (হারাম) বা অত্যন্ত ঝুঁকিপূর্ণ ও পরিহারযোগ্য** হিসেবে ফতোয়া দেওয়া হয়েছে।

---

### ২. ফতোয়ার বিস্তারিত ব্যাখ্যা ও কারণসমূহ (IslamQA Fatwa #106041)
IslamQA ফতোয়া নং **১০৬০৪১** ও **৩০৩৭৫৬**-এ বহু আন্তর্জাতিক ফিকহ কাউন্সিল ও ইসলামিক স্কলারদের মতামত পর্যালোচনা করে নিম্নলিখিত শারঈ কারণ উল্লেখ করা হয়েছে:
1. **অতিরিক্ত অনিশ্চয়তা (আল-গারার আল-ফাহিশ - الغرر الفاحش):** ক্রিপ্টোকারেন্সির কোনো বাস্তব অন্তর্নিহিত মূল্য (Intrinsic Value) নেই এবং কোনো সরকার বা কেন্দ্রীয় ব্যাংক এর নিশ্চয়তা দেয় না।
2. **জুয়া সদৃশ ফটকাবাজি (কিমার / জুয়া):** অধিকাংশ মানুষ পণ্য বা সেবার বিনিময়ে এটি ব্যবহার করে না; বরং দ্রুত ধনী হওয়ার লক্ষ্যে চরম মূল্যের উঠানামার ওপর বাজি ধরে ট্রেড করে।
3. **শারঈ মুদ্রার গুণাবলীর অভাব:** শরীয়তের দৃষ্টিতে মুদ্রা হতে হবে স্থিতিশীল, সার্বজনীন গ্রহণযোগ্য ও আইনগত মানসম্পন্ন (Legal Tender)।`,
    answerEn: `### 1. Ruling Summary
According to fatwas published on IslamQA (islamqa.info), trading and investing in unbacked decentralized cryptocurrencies like Bitcoin is **prohibited (haram) or strongly disallowed** by major contemporary fiqh councils and scholars.

---

### 2. Evidences & Shar'i Deficiencies (IslamQA Fatwa #106041)
IslamQA details several fundamental Islamic legal objections:
1. **Severe Uncertainty (Al-Gharar):** Cryptocurrencies lack intrinsic value or real sovereign asset backing.
2. **Speculation Resembling Gambling (Qimar):** The predominant activity is high-risk speculative trading seeking rapid gains from price volatility rather than purchasing goods.
3. **Lack of Monetary Stability:** It does not fulfill the canonical conditions of sound legal tender recognized for standard wealth preservation in Islamic jurisprudence.`,
    sources: [
      {
        title: "Ruling on dealing in electronic currencies such as Bitcoin - IslamQA Fatwa #106041",
        url: "https://islamqa.info/en/answers/106041/ruling-on-dealing-in-electronic-currencies-such-as-bitcoin",
        questionNo: "106041",
      },
    ],
  },
  {
    keywords: ["drawing", "digital art", "ড্রয়িং", "ড্রইং", "অ্যানিমেশন", "ছবি", "কার্টুন", "illustration"],
    questionBn: "ডিজিটাল ড্রয়িং এবং প্রাণীর মুখাবয়ব আঁকার ব্যাপারে শরীয়তের সুনির্দিষ্ট বিধান কী?",
    questionEn: "What is the ruling on digital drawing and character illustration according to IslamQA?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
- প্রাণহীন বস্তু (যেমন গাছপালা, পর্বত, নদী, প্রকৃতি, স্থাপত্য, গাড়ি বা বস্তু) আঁকা **সম্পূর্ণ বৈধ (হালাল)**।
- স্পষ্ট চোখ, নাক, মুখ বিশিষ্ট প্রাণীর পূর্ণাঙ্গ ছবি আঁকা হাদিসের সাধারণ নিষেধাজ্ঞার আওতাভুক্ত।
- তবে মুখমণ্ডলের স্পষ্ট অঙ্গপ্রত্যঙ্গ (চোখ-নাক-মুখ) বাদ দিয়ে কেবল অবয়ব আঁকা, অথবা শিশুদের শিক্ষামূলক ও দ্বীনি প্রচারণামূলক কার্টুনের ক্ষেত্রে বহু আলেম শিথিলতার অবকাশ দিয়েছেন।

---

### ২. দলিল ও ফতোয়ার বিস্তারিত ব্যাখ্যা (IslamQA Fatwa #72915)
সহীহ বুখারী ও মুসলিমের হাদীসে এসেছে:
> "কিয়ামতের দিন সবচেয়ে কঠিন শাস্তির মুখোমুখি হবে ছবি অঙ্কনকারীরা (যারা আল্লাহর সৃষ্টির অনুকরণ করে)।" *(সহীহ বুখারী: ৫৯৫০)*

IslamQA-তে শায়খ ইবনে উসাইমীন (রহ.)-এর বক্তব্য উদ্ধৃত করা হয়েছে:
যদি কোনো ডিজিটাল বা হাতে আঁকা চিত্রে প্রাণীর মাথা বা চেহারা অস্পষ্ট রাখা হয় (যেমন চোখ বা মুখের দাগ না দেওয়া), তবে তা নিষিদ্ধ 'তাসবীর' (تصوير)-এর আওতাভুক্ত থাকে না এবং তা ব্যবহারে কোনো বাধা নেই।`,
    answerEn: `### 1. Ruling Summary
- Drawing inanimate objects (landscapes, mountains, trees, buildings, machinery) is **completely permissible (halal)**.
- Drawing complete animate beings with detailed facial features (eyes, nose, mouth) falls under the severe hadith prohibitions of image-making (Tasweer).
- Drawing figures without distinct facial features (blank face or silhouette) or for constructive educational purposes for children is permissible.

---

### 2. Evidences from IslamQA (Fatwa #72915 & #103348)
The Prophet (peace and blessings of Allah be upon him) said:
> "The people who will be most severely punished on the Day of Resurrection will be the image-makers." *(Narrated by al-Bukhari 5950, Muslim 2109)*

IslamQA notes that if the facial features are omitted or blurred so that the figure cannot be considered a complete living portrait, it ceases to be prohibited.`,
    sources: [
      {
        title: "Ruling on drawing animate beings - IslamQA Fatwa #72915",
        url: "https://islamqa.info/en/answers/72915/ruling-on-drawing-animate-beings-and-digital-art",
        questionNo: "72915",
      },
    ],
  },
  {
    keywords: ["wudhu", "doubt", "অজু", "ওয়াসওয়াসা", "সন্দেহ", "বায়ু", "বাতাস", "gas"],
    questionBn: "অজু ভেঙেছে কি না এ বিষয়ে মনে সন্দেহ বা ওয়াসওয়াসা সৃষ্টি হলে করণীয় কী?",
    questionEn: "What should a person do if they doubt whether wudhu is broken or if gas has passed?",
    answerBn: `### ১. মূল হুকুম ও সারসংক্ষেপ (Verdict Summary)
শুধুমাত্র মনে সন্দেহ বা ওয়াসওয়াসা জাগ্রত হলে **অজু ভাঙে না**। যতক্ষণ না আপনি ১০০% নিশ্চিত হন যে অজু ভেঙেছে (যেমন স্পষ্ট শব্দ শোনা বা দুর্গন্ধ পাওয়া), ততক্ষণ আপনার অজু সম্পূর্ণ বিশুদ্ধ রয়েছে বলেই গণ্য হবে।

---

### ২. দলিল ও ফতোয়ার বিস্তারিত ব্যাখ্যা (IslamQA Fatwa #62839)
সহীহ বুখারী ও মুসলিমে বর্ণিত হয়েছে:
এক সাহাবী রাসূলুল্লাহ সাল্লাল্লাহু আলাইহি ওয়াসাল্লামের কাছে অভিযোগ করলেন যে, নামাজে মনে হয় তার অজু ছুটে গেছে। তখন নবীজী (ﷺ) স্পষ্ট নির্দেশনা দিয়ে বললেন:
> "সে যেন সালাত পরিত্যাগ না করে, যতক্ষণ না সে শব্দ শোনে অথবা দুর্গন্ধ পায়।" *(সহীহ বুখারী: ১৩৭, সহীহ মুসলিম: ৩৬১)*

**মৌলিক ফিকহি নীতিমালা (Islamic Legal Maxim):**
> **"আল-ইয়াকীনু লা ইয়াযুলু বিশ-শাক্ক" (اليقين لا يزول بالشك)** — অর্থাৎ, "নিশ্চয়তা কেবল সন্দেহের দ্বারা দূর হয় না।"
যেহেতু আপনার অজু করার বিষয়টি নিশ্চিত ছিল, তাই কেবল সন্দেহের কারণে সেই পবিত্রতা বাতিল হবে না। শয়তানের ওয়াসওয়াসাকে পুরোপুরি উপেক্ষা করাই শারঈ নির্দেশ।`,
    answerEn: `### 1. Ruling Summary
Mere doubt, hesitation, or whispering (waswas) **does not invalidate Wudhu**. As long as you were certain of having made wudhu, you remain in a state of purity until you are 100% certain it has been broken.

---

### 2. Scholarly Evidence (IslamQA Fatwa #62839)
A man complained to the Messenger of Allah (peace and blessings of Allah be upon him) about feeling something during prayer. The Prophet (ﷺ) replied:
> "He should not leave (the prayer) unless he hears a sound or smells an odor." *(Narrated by al-Bukhari 137, Muslim 361)*

This is derived from the foundational Islamic legal maxim:
> *"Certainty is not dispelled by doubt." (Al-yaqeen la yazulu bish-shakk)*
IslamQA advises completely ignoring the whispers of Satan, as repeating wudhu out of baseless doubt reinforces obsessive whispering.`,
    sources: [
      {
        title: "He suffers from waswas and doubts about his wudhu - IslamQA Fatwa #62839",
        url: "https://islamqa.info/en/answers/62839/he-suffers-from-waswas-and-doubts-about-his-wudhu",
        questionNo: "62839",
      },
    ],
  },
];

export function findMatchingFatwa(query: string, language: string = "auto"): FallbackFatwa | null {
  const normalized = query.toLowerCase();
  for (const fatwa of FALLBACK_FATWAS) {
    for (const kw of fatwa.keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        return fatwa;
      }
    }
  }
  return null;
}
