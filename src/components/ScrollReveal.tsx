import React, { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-in" | "scale-up";
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 650,
  className = "",
  as: Component = "div",
  threshold = 0.08,
}) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold, triggerOnce: true });

  const getAnimationStyles = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0 scale-100";
    }

    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-6 sm:translate-y-8";
      case "fade-down":
        return "opacity-0 -translate-y-6 sm:-translate-y-8";
      case "fade-left":
        return "opacity-0 -translate-x-6 sm:-translate-x-8";
      case "fade-right":
        return "opacity-0 translate-x-6 sm:translate-x-8";
      case "scale-up":
        return "opacity-0 scale-95";
      case "fade-in":
      default:
        return "opacity-0";
    }
  };

  const style: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Smooth spring-like ease-out
  };

  return (
    // @ts-ignore
    <Component
      ref={elementRef as any}
      style={style}
      className={`transition-all will-change-transform ${getAnimationStyles()} ${className}`}
    >
      {children}
    </Component>
  );
};
