import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";
import { translations } from "../data/translations";

export type ThemeMode = "system" | "light" | "dark";

interface ThemeToggleProps {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  onThemeChange: (theme: ThemeMode) => void;
  language?: "bn" | "en";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  resolvedTheme,
  onThemeChange,
  language = "bn",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[language] || translations.bn;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const cycleTheme = () => {
    if (theme === "system") {
      onThemeChange("dark");
    } else if (theme === "dark") {
      onThemeChange("light");
    } else {
      onThemeChange("system");
    }
  };

  const getButtonIcon = () => {
    if (theme === "system") {
      return (
        <span className="relative flex items-center justify-center">
          <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
          <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 border border-stone-900" />
        </span>
      );
    }
    if (theme === "dark") {
      return <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />;
    }
    return <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />;
  };

  const getLabel = () => {
    if (theme === "system") return t.themeDeviceLabel;
    if (theme === "dark") return t.themeDarkLabel;
    return t.themeLightLabel;
  };

  const options: { id: ThemeMode; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: "system",
      label: t.themeDeviceLabel,
      sub: t.themeDeviceDesc,
      icon: <Monitor className="w-4 h-4 text-blue-400" />,
    },
    {
      id: "light",
      label: t.themeLightLabel,
      sub: t.themeLightDesc,
      icon: <Sun className="w-4 h-4 text-amber-400" />,
    },
    {
      id: "dark",
      label: t.themeDarkLabel,
      sub: t.themeDarkDesc,
      icon: <Moon className="w-4 h-4 text-indigo-300" />,
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          title={`${t.themeTitleTooltip}: ${getLabel()} (${t.themeTitleChangeHint})`}
          className="flex items-center justify-center gap-1 h-8 w-8 sm:w-auto sm:h-9 sm:px-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 active:bg-stone-600 active:scale-95 text-stone-200 text-xs font-medium transition-all border border-stone-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer shadow-xs shrink-0"
        >
          {getButtonIcon()}
          <span className="hidden md:inline font-medium text-xs">
            {theme === "system" ? t.themeDevice : theme === "dark" ? t.themeDark : t.themeLight}
          </span>
          <ChevronDown
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400 hidden sm:inline-block transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-stone-900 border border-stone-700/80 shadow-2xl z-50 p-2 text-stone-100 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          <div className="px-3 py-2 border-b border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <span className="font-semibold text-stone-300 uppercase tracking-wider text-[10px]">
              {t.themeMenuTitle}
            </span>
            <span className="text-[10px] text-blue-400">
              {t.themeActiveLabel}: {resolvedTheme === "dark" ? t.themeDark : t.themeLight}
            </span>
          </div>

          <div className="py-1 space-y-1">
            {options.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onThemeChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-950/80 text-white border border-blue-700/60 shadow-xs"
                      : "hover:bg-stone-800/90 text-stone-300 hover:text-white"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{opt.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold leading-none">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-stone-400 mt-1 leading-snug">
                      {opt.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick cycle footer hint */}
          <div className="mt-1 pt-2 border-t border-stone-800/80 px-2 py-1 text-[10px] text-stone-400 flex items-center justify-between">
            <span>{t.themeFooterHint}</span>
            <button
              type="button"
              onClick={() => {
                cycleTheme();
              }}
              className="text-blue-400 hover:underline font-medium cursor-pointer"
            >
              {t.themeFooterToggle}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
