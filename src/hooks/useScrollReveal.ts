import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If IntersectionObserver is not available or reduced-motion is active
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentElem = elementRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElem);

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
}
