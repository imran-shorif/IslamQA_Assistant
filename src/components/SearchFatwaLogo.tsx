import React from "react";

interface SearchFatwaLogoProps {
  className?: string;
  size?: number;
  rounded?: boolean;
}

export const SearchFatwaLogo: React.FC<SearchFatwaLogoProps> = ({
  className = "",
  size = 36,
  rounded = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-hidden ${rounded ? "rounded-xl" : ""} ${className}`}
      aria-label="Search Fatwa Logo"
    >
      <defs>
        <radialGradient id="sfMagBgCmp" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="55%" stopColor="#022c22" />
          <stop offset="100%" stopColor="#011712" />
        </radialGradient>

        <linearGradient id="sfMagGlassGradCmp" x1="100" y1="90" x2="410" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="35%" stopColor="#34d399" />
          <stop offset="70%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="sfMagLensReflectionCmp" x1="130" y1="120" x2="280" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#6ee7b7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
        </linearGradient>

        <linearGradient id="sfMagHandleHighlightCmp" x1="260" y1="260" x2="385" y2="385" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
        </linearGradient>

        <filter id="sfMagGlowCmp" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#10b981" floodOpacity="0.45" />
        </filter>
      </defs>

      <rect width="500" height="500" rx="115" fill="url(#sfMagBgCmp)" />
      <rect width="494" height="494" x="3" y="3" rx="112" stroke="url(#sfMagGlassGradCmp)" strokeWidth="3" strokeOpacity="0.3" />

      {/* Pure Magnifying Glass (Search Icon) - Nothing else */}
      <g filter="url(#sfMagGlowCmp)">
        <circle cx="210" cy="205" r="115" fill="url(#sfMagLensReflectionCmp)" />

        <line
          x1="292"
          y1="287"
          x2="395"
          y2="390"
          stroke="url(#sfMagGlassGradCmp)"
          strokeWidth="38"
          strokeLinecap="round"
        />
        <line
          x1="298"
          y1="293"
          x2="388"
          y2="383"
          stroke="url(#sfMagHandleHighlightCmp)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        <circle
          cx="210"
          cy="205"
          r="115"
          stroke="url(#sfMagGlassGradCmp)"
          strokeWidth="30"
          fill="none"
        />

        <path
          d="M 140 160 A 85 85 0 0 1 230 115"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <circle cx="132" cy="190" r="5" fill="#ffffff" fillOpacity="0.6" />
      </g>
    </svg>
  );
};
