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
        <radialGradient id="sfLogoBgCmp" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="60%" stopColor="#022c22" />
          <stop offset="100%" stopColor="#011712" />
        </radialGradient>

        <linearGradient id="sfMintGlowCmp" x1="60" y1="180" x2="440" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="40%" stopColor="#34d399" />
          <stop offset="85%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="sfBarInnerCmp" x1="250" y1="170" x2="250" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#043c2f" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#01221a" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="sfLensGlassCmp" x1="105" y1="210" x2="175" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#a7f3d0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>

        <filter id="sfSearchGlowCmp" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#10b981" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect width="500" height="500" rx="115" fill="url(#sfLogoBgCmp)" />
      <rect width="494" height="494" x="3" y="3" rx="112" stroke="url(#sfMintGlowCmp)" strokeWidth="3" strokeOpacity="0.3" />

      <circle cx="250" cy="250" r="200" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.1" strokeDasharray="8 8" />

      <g filter="url(#sfSearchGlowCmp)">
        {/* Search bar capsule container */}
        <rect x="45" y="170" width="410" height="160" rx="80" fill="url(#sfBarInnerCmp)" stroke="url(#sfMintGlowCmp)" strokeWidth="5" />
        <path d="M 125 174 L 375 174" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />

        {/* Magnifying Glass Lens */}
        <circle cx="135" cy="250" r="42" stroke="url(#sfMintGlowCmp)" strokeWidth="9" fill="url(#sfLensGlassCmp)" />
        <path d="M 112 232 A 28 28 0 0 1 148 214" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.75" />

        {/* Magnifying Glass Angled Handle */}
        <line x1="166" y1="281" x2="202" y2="317" stroke="url(#sfMintGlowCmp)" strokeWidth="11" strokeLinecap="round" />
        <line x1="166" y1="281" x2="202" y2="317" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.6" />

        {/* Search Input Indicator */}
        <line x1="225" y1="215" x2="225" y2="285" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
        <rect x="246" y="225" width="125" height="12" rx="6" fill="#a7f3d0" fillOpacity="0.85" />
        <rect x="246" y="248" width="75" height="10" rx="5" fill="#34d399" fillOpacity="0.5" />

        {/* Search button trigger pill */}
        <rect x="382" y="222" width="52" height="56" rx="20" fill="#10b981" fillOpacity="0.25" stroke="#34d399" strokeWidth="2" />
        <path d="M 402 242 L 414 250 L 402 258" stroke="#a7f3d0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};
