import { useState, useEffect } from "react";

/**
 * Convert any string containing ASCII digits into Bengali numerals
 */
export function toBengaliNumerals(input: string | number): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(input).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)]);
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
  doha: "দোহা",
  toronto: "টরন্টো",
  sydney: "সিডনি",
  singapore: "সিঙ্গাপুর",
  "kuala lumpur": "কুয়ালালামপুর",
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
 * Localize city name into Bengali if current language is 'bn'
 */
export function formatCityName(city: string, language: "bn" | "en"): string {
  if (!city) return language === "bn" ? "ঢাকা" : "Dhaka";
  if (language === "en") return city;
  const key = city.trim().toLowerCase();
  return BENGALI_CITIES[key] || city;
}

const CITY_STORAGE_KEY = "islamqa_detected_city_v1";

/**
 * React hook to detect and return the user's city
 */
export function useUserCity(language: "bn" | "en" = "bn") {
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

    // If already cached in session, no need to make remote call
    const cached = sessionStorage.getItem(CITY_STORAGE_KEY);
    if (cached) {
      setCity(cached);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    // Lightweight CORS geo-IP check
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
        // Fallback already populated via getTimezoneFallbackCity()
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
export function useUserLocalTime(language: "bn" | "en" = "bn") {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format 12-hour time: HH:MM:SS AM/PM
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // '0' becomes '12'
  const hoursStr = String(hours).padStart(2, "0");

  const rawTimeString = `${hoursStr}:${minutes}:${seconds} ${ampm}`;

  let formattedTime = rawTimeString;
  if (language === "bn") {
    // Bengali numerals with AM/PM
    const bnPeriod = ampm === "AM" ? "AM" : "PM";
    formattedTime = `${toBengaliNumerals(hoursStr)}:${toBengaliNumerals(minutes)}:${toBengaliNumerals(seconds)} ${bnPeriod}`;
  }

  return {
    currentTime: now,
    formattedTime,
    rawTimeString,
  };
}
