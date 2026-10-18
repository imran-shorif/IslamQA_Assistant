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
        {/* Background Dark Emerald Gradient */}
        <radialGradient
          id="sfBg"
          cx="45%"
          cy="45%"
          r="65%"
          fx="40%"
          fy="40%"
        >
          <stop offset="0%" stopColor="#0d2b22" />
          <stop offset="60%" stopColor="#071b15" />
          <stop offset="100%" stopColor="#030d0a" />
        </radialGradient>

        {/* Primary Liquid Gold Gradient */}
        <linearGradient
          id="sfGoldPrimary"
          x1="120"
          y1="80"
          x2="380"
          y2="420"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="75%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        {/* Secondary Specular Gold Gradient */}
        <linearGradient
          id="sfGoldHighlight"
          x1="180"
          y1="120"
          x2="320"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FDE68A" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Star Glow */}
        <radialGradient
          id="sfStarGlow"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="1" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>

        {/* Deep Drop Shadow */}
        <filter id="sfShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="2"
            dy="6"
            stdDeviation="8"
            floodColor="#020806"
            floodOpacity="0.8"
          />
        </filter>

        {/* Subtle Inner Highlight */}
        <linearGradient id="sfInnerGleam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Dark Emerald Background with Golden Rim */}
      <rect width="500" height="500" rx="110" fill="url(#sfBg)" />
      <rect
        width="496"
        height="496"
        x="2"
        y="2"
        rx="108"
        stroke="url(#sfGoldPrimary)"
        strokeWidth="4"
        strokeOpacity="0.25"
      />

      {/* Ambient center lighting */}
      <circle cx="250" cy="250" r="190" fill="#10B981" fillOpacity="0.04" />

      {/* Main Group with 3D Shadow */}
      <g filter="url(#sfShadow)">
        {/* 1. EIGHT-POINTED ISLAMIC STAR & RADIANT GLOW (Top Right) */}
        <g transform="translate(325, 125)">
          {/* Star flare rays */}
          <circle cx="0" cy="0" r="28" fill="url(#sfStarGlow)" />
          {/* Diamond 4-point primary */}
          <path
            d="M0 -24 Q0 0 24 0 Q0 0 0 24 Q0 0 -24 0 Q0 0 0 -24 Z"
            fill="url(#sfGoldHighlight)"
          />
          {/* Secondary 4-point rotated 45 deg */}
          <path
            d="M0 -15 Q0 0 15 0 Q0 0 0 15 Q0 0 -15 0 Q0 0 0 -15 Z"
            transform="rotate(45)"
            fill="url(#sfGoldPrimary)"
          />
          {/* Shining center core */}
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
        </g>

        {/* 2. THE ARABIC LETTER 'ف' (Fa / Fatwa) - Right side loop & tail */}
        {/* The circular loop of 'Fa' */}
        <path
          d="M 330 205
             C 365 205, 385 235, 380 265
             C 375 295, 345 325, 310 325
             C 275 325, 275 285, 295 245
             C 305 220, 318 205, 330 205 Z"
          fill="url(#sfGoldPrimary)"
        />
        {/* Inner hollow of the 'Fa' eye */}
        <path
          d="M 330 235
             C 346 235, 355 250, 350 266
             C 345 282, 332 295, 320 295
             C 306 295, 305 278, 314 256
             C 318 244, 324 235, 330 235 Z"
          fill="url(#sfBg)"
        />
        {/* Inner shadow/depth for the eye */}
        <path
          d="M 330 235
             C 346 235, 355 250, 350 266
             C 345 282, 332 295, 320 295"
          stroke="#5A3302"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />

        {/* Sweep curve of 'Fa' descending and curling upward */}
        <path
          d="M 345 315
             C 365 330, 380 355, 375 380
             C 368 408, 335 430, 290 420
             C 280 418, 325 395, 330 365
             C 335 340, 310 325, 295 325
             Z"
          fill="url(#sfGoldHighlight)"
        />

        {/* 3. THE MAJESTIC LETTER 'S' (Intertwined Serif Monogram) */}
        {/* Top serif & upper bowl of 'S' */}
        <path
          d="M 270 140
             C 270 140, 275 185, 272 195
             C 255 195, 240 185, 220 185
             C 190 185, 175 200, 175 225
             C 175 255, 205 275, 250 295
             C 310 320, 330 350, 325 390
             C 318 435, 260 455, 195 440
             C 145 428, 125 385, 128 350
             C 130 330, 145 330, 148 348
             C 152 385, 185 415, 225 415
             C 265 415, 285 395, 288 368
             C 292 335, 265 315, 220 295
             C 165 270, 140 240, 142 200
             C 145 155, 195 130, 255 130
             L 270 140 Z"
          fill="url(#sfGoldHighlight)"
        />

        {/* 3D shading layer along spine of 'S' */}
        <path
          d="M 270 140
             L 272 195
             C 255 195, 238 185, 218 185
             C 188 185, 175 200, 175 225
             C 175 255, 205 275, 250 295
             C 240 290, 195 265, 190 235
             C 188 215, 202 198, 228 198
             C 248 198, 262 205, 270 140 Z"
          fill="url(#sfGoldPrimary)"
          opacity="0.85"
        />

        {/* Dynamic under-swoop of 'S' extending into a calligraphic tail */}
        <path
          d="M 128 350
             C 135 285, 180 235, 250 215
             C 220 225, 168 265, 155 320
             C 148 350, 158 395, 215 425
             C 275 455, 340 435, 360 410
             C 335 425, 270 435, 220 408
             C 165 380, 140 335, 128 350 Z"
          fill="url(#sfGoldPrimary)"
        />

        {/* 4. CALLIGRAPHIC ORNAMENTAL FLOURISHES (Bottom swirl) */}
        <path
          d="M 280 430
             C 310 445, 345 440, 360 420
             C 365 412, 360 405, 350 408
             C 335 415, 305 425, 280 430 Z"
          fill="url(#sfGoldHighlight)"
        />
        <path
          d="M 335 425
             C 350 432, 362 435, 370 430
             C 378 424, 372 418, 365 420
             C 358 422, 348 422, 335 425 Z"
          fill="url(#sfGoldPrimary)"
        />
      </g>
    </svg>
  );
};
