import { useState, useEffect } from "react";
import { Language } from "../data/translations";

/**
 * Convert any string containing ASCII digits into Bengali numerals
 */
export function toBengaliNumerals(input: string | number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)]);
}

/**
 * Convert any string containing ASCII digits into Arabic-Indic numerals
 */
export function toArabicNumerals(input: string | number): string {
  const arDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(input).replace(/[0-9]/g, (digit) => arDigits[Number(digit)]);
}

/**
 * Convert any string containing ASCII digits into Urdu numerals
 */
export function toUrduNumerals(input: string | number): string {
  const urDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (digit) => urDigits[Number(digit)]);
}

/**
 * Well-known city names mapped to Bengali
 */
const BENGALI_CITIES: Record<string, string> = {
  dhaka: "ঢাকা",
  chittagong: "চট্টগ্রাম",
  chattogram: "চট্টগ্রাম",
  sylhet: "সিলেট",
  rajshahi: "রাজশাহী",
  khulna: "খুলনা",
  barisal: "বরিশাল",
  barishal: "বরিশাল",
  rangpur: "রংপুর",
  mymensingh: "ময়মনসিংহ",
  comilla: "কুমিল্লা",
  cumilla: "কুমিল্লা",
  gazipur: "গাজীপুর",
  narayanganj: "নারায়ণগঞ্জ",
  bogra: "বগুড়া",
  bogura: "বগুড়া",
  tangail: "টাঙ্গাইল",
  feni: "ফেনী",
  jessore: "যশোর",
  jashore: "যশোর",
  kushtia: "কুষ্টিয়া",
  dinajpur: "দিনাজপুর",
  coxsbazar: "কক্সবাজার",
  "cox's bazar": "কক্সবাজার",
  kolkata: "কলকাতা",
  calcutta: "কলকাতা",
  delhi: "দিল্লি",
  mumbai: "মুম্বাই",
  london: "লন্ডন",
  "new york": "নিউ ইয়র্ক",
  dubai: "দুবাই",
  riyadh: "রিয়াদ",
  makkah: "মক্কা",
  mecca: "মক্কা",
  madinah: "মদিনা",
  medina: "মদিনা",
  jeddah: "জেদ্দা",
  doha: "দোহا",
  toronto: "টরন্টো",
  sydney: "সিডনি",
  singapore: "সিঙ্গাপুর",
  "kuala lumpur": "কুয়ালালামপুর",
  karachi: "করাচি",
  lahore: "লাহোর",
  islamabad: "ইসলামাবাদ",
  cairo: "কায়রো",
};

/**
 * Well-known city names mapped to Arabic
 */
const ARABIC_CITIES: Record<string, string> = {
  dhaka: "دكا",
  chittagong: "شيتاغونغ",
  chattogram: "شيتاغونغ",
  sylhet: "سلهت",
  rajshahi: "راجشاهي",
  khulna: "خولنا",
  riyadh: "الرياض",
  makkah: "مكة المكرمة",
  mecca: "مكة المكرمة",
  madinah: "المدينة المنورة",
  medina: "المدينة المنورة",
  jeddah: "جدة",
  dammam: "الدمام",
  dubai: "دبي",
  "abu dhabi": "أبو ظبي",
  doha: "الدوحة",
  kuwait: "الكويت",
  cairo: "القاهرة",
  alexandria: "الإسكندرية",
  amman: "عمان",
  damascus: "دمشق",
  baghdad: "بغداد",
  beirut: "بيروت",
  karachi: "كراتشي",
  lahore: "لاهور",
  islamabad: "إسلام آباد",
  london: "لندن",
  "new york": "نيويورك",
  paris: "باريس",
  toronto: "تورونتو",
  sydney: "سيدني",
  singapore: "سنغافورة",
  "kuala lumpur": "كوالالمبور",
  istanbul: "إسطنبول",
};

/**
 * Well-known city names mapped to Urdu
 */
const URDU_CITIES: Record<string, string> = {
  dhaka: "ڈھاکہ",
  chittagong: "چٹاگانگ",
  sylhet: "سلہٹ",
  karachi: "کراچی",
  lahore: "لاہور",
  islamabad: "اسلام آباد",
  rawalpindi: "راولپنڈی",
  faisalabad: "فیصل آباد",
  multan: "ملتان",
  peshawar: "پشاور",
  quetta: "کوئٹہ",
  riyadh: "ریاض",
  makkah: "مکہ مکرمہ",
  mecca: "مکہ مکرمہ",
  madinah: "مدینہ منورہ",
  medina: "مدینہ منورہ",
  jeddah: "جدہ",
  dubai: "دبئی",
  doha: "دوحہ",
  delhi: "دہلی",
  mumbai: "ممبئی",
  london: "لندن",
  "new york": "نیویارک",
  toronto: "ٹورنٹو",
  sydney: "سڈنی",
};

/**
 * Get fallback city based on the browser's local timezone
 */
export function getTimezoneFallbackCity(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("/")) {
      const parts = tz.split("/");
      const rawCity = parts[parts.length - 1].replace(/_/g, " ");
      return rawCity;
    }
    return tz || "Dhaka";
  } catch {
    return "Dhaka";
  }
}

/**
 * Localize city name based on language
 */
export function formatCityName(city: string, language: Language = "bn"): string {
  if (!city) {
    if (language === "ar") return "مكة المكرمة";
    if (language === "ur") return "لاہور";
    if (language === "bn") return "ঢাকা";
    return "Dhaka";
  }
  if (language === "en") return city;
  const key = city.trim().toLowerCase();

  if (language === "bn") {
    return BENGALI_CITIES[key] || city;
  }
  if (language === "ar") {
    return ARABIC_CITIES[key] || city;
  }
  if (language === "ur") {
    return URDU_CITIES[key] || city;
  }
  return city;
}

const CITY_STORAGE_KEY = "islamqa_detected_city_v1";

/**
 * React hook to detect and return the user's city
 */
export function useUserCity(language: Language = "bn") {
  const [city, setCity] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem(CITY_STORAGE_KEY);
      if (cached) return cached;
    }
    return getTimezoneFallbackCity();
  });

  useEffect(() => {
    let isMounted = true;
    if (typeof window === "undefined") return;

    const cached = sessionStorage.getItem(CITY_STORAGE_KEY);
    if (cached) {
      setCity(cached);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch("https://ipwho.is/", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error");
        return res.json();
      })
      .then((data) => {
        clearTimeout(timeoutId);
        if (isMounted && data && data.success && data.city) {
          const detected = String(data.city);
          setCity(detected);
          sessionStorage.setItem(CITY_STORAGE_KEY, detected);
        }
      })
      .catch(() => {
        // Fallback already in place
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const localizedCity = formatCityName(city, language);

  return {
    rawCity: city,
    city: localizedCity,
  };
}

/**
 * React hook to provide a live, ticking local time clock
 */
export function useUserLocalTime(language: Language = "bn") {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, "0");

  const rawTimeString = `${hoursStr}:${minutes}:${seconds} ${ampm}`;

  let formattedTime = rawTimeString;
  if (language === "bn") {
    formattedTime = `${toBengaliNumerals(hoursStr)}:${toBengaliNumerals(minutes)}:${toBengaliNumerals(seconds)} ${ampm}`;
  } else if (language === "ar") {
    const arPeriod = ampm === "AM" ? "ص" : "م";
    formattedTime = `${toArabicNumerals(hoursStr)}:${toArabicNumerals(minutes)}:${toArabicNumerals(seconds)} ${arPeriod}`;
  } else if (language === "ur") {
    formattedTime = `${toUrduNumerals(hoursStr)}:${toUrduNumerals(minutes)}:${toUrduNumerals(seconds)} ${ampm}`;
  }

  return {
    currentTime: now,
    formattedTime,
    rawTimeString,
  };
}
