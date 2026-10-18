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
        <radialGradient id="sfEmeraldBgCmp" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="55%" stopColor="#022c22" />
          <stop offset="100%" stopColor="#011712" />
        </radialGradient>

        <linearGradient id="sfEmeraldPrimaryCmp" x1="120" y1="100" x2="380" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a7f3d0" />
          <stop offset="35%" stopColor="#34d399" />
          <stop offset="75%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="sfIceHighlightCmp" x1="150" y1="90" x2="350" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e0f2fe" />
          <stop offset="80%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <filter id="sfEmeraldGlowCmp" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#011712" floodOpacity="0.75" />
        </filter>
      </defs>

      <rect width="500" height="500" rx="115" fill="url(#sfEmeraldBgCmp)" />
      <rect width="494" height="494" x="3" y="3" rx="112" stroke="url(#sfEmeraldPrimaryCmp)" strokeWidth="4" strokeOpacity="0.35" />

      <circle cx="250" cy="250" r="195" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.12" strokeDasharray="6 6" />

      <g filter="url(#sfEmeraldGlowCmp)">
        <circle cx="250" cy="115" r="9" fill="url(#sfIceHighlightCmp)" />
        <path d="M 250 128 L 253 148 L 247 148 Z" fill="url(#sfEmeraldPrimaryCmp)" />

        <path
          d="M 245 160 C 205 152, 145 160, 105 182 C 100 184, 98 190, 100 196 L 118 320 C 120 326, 126 330, 132 328 C 170 312, 215 310, 245 328 Z"
          fill="url(#sfEmeraldPrimaryCmp)"
        />
        <path
          d="M 240 175 C 205 170, 155 178, 125 196 L 138 302 C 168 288, 210 286, 240 305 Z"
          fill="#022c22"
          fillOpacity="0.75"
          stroke="url(#sfIceHighlightCmp)"
          strokeWidth="2.5"
          strokeOpacity="0.8"
        />

        <path
          d="M 255 160 C 295 152, 355 160, 395 182 C 400 184, 402 190, 400 196 L 382 320 C 380 326, 374 330, 368 328 C 330 312, 285 310, 255 328 Z"
          fill="url(#sfEmeraldPrimaryCmp)"
        />
        <path
          d="M 260 175 C 295 170, 345 178, 375 196 L 362 302 C 332 288, 290 286, 260 305 Z"
          fill="#022c22"
          fillOpacity="0.75"
          stroke="url(#sfIceHighlightCmp)"
          strokeWidth="2.5"
          strokeOpacity="0.8"
        />

        <path d="M 246 155 Q 250 162 254 155 L 254 332 Q 250 338 246 332 Z" fill="url(#sfIceHighlightCmp)" />

        <path d="M 215 325 L 145 385 C 138 391, 142 402, 151 402 L 180 402 L 235 345 Z" fill="url(#sfEmeraldPrimaryCmp)" opacity="0.9" />
        <path d="M 285 325 L 355 385 C 362 391, 358 402, 349 402 L 320 402 L 265 345 Z" fill="url(#sfEmeraldPrimaryCmp)" opacity="0.9" />
        <path d="M 185 390 L 315 390 L 250 335 Z" fill="#011712" opacity="0.6" />

        <g transform="translate(250, 238)">
          <circle cx="0" cy="0" r="54" stroke="url(#sfIceHighlightCmp)" strokeWidth="6.5" fill="none" />
          <circle cx="0" cy="0" r="44" fill="#047857" fillOpacity="0.35" />
          <path d="M 6 -24 C -18 -20, -28 10, -8 30 C -24 16, -20 -10, 6 -24 Z" fill="url(#sfIceHighlightCmp)" />
          <circle cx="10" cy="-6" r="4" fill="#ffffff" />
          <path d="M 38 38 L 74 74 C 78 78, 84 78, 88 74 C 92 70, 92 64, 88 60 L 52 24 Z" fill="url(#sfEmeraldPrimaryCmp)" />
          <path d="M 40 40 L 70 70" stroke="url(#sfIceHighlightCmp)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};
