import { useState, useEffect, useCallback } from "react";
import { ThemeMode } from "../components/ThemeToggle";

const THEME_STORAGE_KEY = "islamqa_theme_preference";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
      }
    } catch {
      // Fallback if localStorage is inaccessible
    }
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark") return "dark";
      if (stored === "light") return "light";
    } catch {
      // Ignore
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const applyTheme = useCallback((mode: ThemeMode) => {
    let effective: "light" | "dark" = "light";

    if (mode === "dark") {
      effective = "dark";
    } else if (mode === "light") {
      effective = "light";
    } else {
      // System default mode: adjust to device theme
      effective = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    setResolvedTheme(effective);

    const root = document.documentElement;
    if (effective === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // Ignore
      }
      applyTheme(newTheme);
    },
    [applyTheme]
  );

  // Initial application and system media query listener
  useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      // If user has chosen "system" default mode, respond dynamically to device theme change
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, applyTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
  };
}
