import React from 'react';

/**
 * High-definition, crisp vector representations of the client's specification symbols
 * (From "Zunme home page final look.docx" and "Home - zunme - website entry.docx")
 */

// 1. Interactive Content Symbol: Workstation with interactive media windows & sparkles
export const InteractiveContentIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Interactive Content"
    >
      <defs>
        <linearGradient id="ic-screen-grad" x1="6" y1="10" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E1B4B" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <linearGradient id="ic-aurora" x1="10" y1="14" x2="38" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#EC4899" stopOpacity="0.3" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0.4" />
        </linearGradient>
        <filter id="ic-glow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#6366F1" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Monitor Stand Base */}
      <path d="M18 41H30" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 35V41" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

      {/* Main Display Body */}
      <rect
        x="5"
        y="8"
        width="38"
        height="27"
        rx="5"
        fill="url(#ic-screen-grad)"
        stroke="#64748B"
        strokeWidth="1.5"
        filter="url(#ic-glow)"
      />

      {/* Inner Screen Surface */}
      <rect x="7" y="10" width="34" height="21" rx="3.5" fill="#0F172A" />
      <rect x="7" y="10" width="34" height="21" rx="3.5" fill="url(#ic-aurora)" />

      {/* Floating Interactive Window 1: Video / Play Reel (Red/Pink) */}
      <g transform="translate(9, 13)">
        <rect width="13" height="8" rx="2" fill="#EF4444" fillOpacity="0.9" />
        <path d="M5 2.5L9.5 4L5 5.5V2.5Z" fill="#FFFFFF" />
      </g>

      {/* Floating Interactive Window 2: Code / Web Content (Teal/Cyan) */}
      <g transform="translate(24, 13)">
        <rect width="15" height="8" rx="2" fill="#06B6D4" fillOpacity="0.9" />
        <rect x="2" y="2" width="6" height="1.5" rx="0.75" fill="#FFFFFF" />
        <rect x="2" y="4.5" width="11" height="1.5" rx="0.75" fill="#E0F2FE" />
      </g>

      {/* Floating Interactive Window 3: Carousel / Image Cards (Amber/Orange) */}
      <g transform="translate(10, 23)">
        <rect width="14" height="7" rx="2" fill="#F59E0B" fillOpacity="0.95" />
        <circle cx="3.5" cy="3.5" r="1.5" fill="#FFFFFF" />
        <path d="M2 5.5L5 3.5L8 5.5H2Z" fill="#FEF3C7" />
      </g>

      {/* Floating Interactive Window 4: Live AI Output (Purple/Indigo) */}
      <g transform="translate(26, 23)">
        <rect width="13" height="7" rx="2" fill="#8B5CF6" fillOpacity="0.95" />
        <rect x="2" y="2" width="9" height="1.2" rx="0.6" fill="#FFFFFF" />
        <rect x="2" y="4" width="6" height="1.2" rx="0.6" fill="#EDE9FE" />
      </g>

      {/* Magic Interactive Sparkle Top-Right */}
      <path
        d="M40 5L41 7.5L43.5 8.5L41 9.5L40 12L39 9.5L36.5 8.5L39 7.5L40 5Z"
        fill="#FBBF24"
      />
    </svg>
  );
};

// 2. Documents / Library Symbol: Blue rounded squircle with crisp layered document sheets
export const DocumentsLibraryIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Documents and Library"
    >
      <defs>
        <linearGradient id="doc-tile-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="doc-tile-shadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#1D4ED8" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Blue Rounded Squircle Tile (Matches Client Doc Icon 3) */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="11"
        fill="url(#doc-tile-grad)"
        filter="url(#doc-tile-shadow)"
      />

      {/* Back Document Sheet (Subtle White Offset Layer) */}
      <rect
        x="13"
        y="10"
        width="20"
        height="26"
        rx="2"
        fill="none"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1.6"
      />

      {/* Front Document Sheet */}
      <rect
        x="16"
        y="13"
        width="20"
        height="26"
        rx="2"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1"
      />

      {/* Folded Top-Right Corner Accent */}
      <path d="M31 13V18H36" fill="#DBEAFE" />
      <path d="M31 13L36 18H31V13Z" fill="#BFDBFE" />

      {/* Document Header Bar */}
      <rect x="19" y="16.5" width="9" height="1.8" rx="0.9" fill="#93C5FD" />

      {/* Document Photo Box (Left) */}
      <rect x="19" y="21" width="6" height="5.5" rx="1" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="0.8" />
      <circle cx="21" cy="22.8" r="0.8" fill="#3B82F6" />
      <path d="M19.5 25.5L21.5 23.5L24.5 25.5H19.5Z" fill="#60A5FA" />

      {/* Document Silhouette Figure (Right) */}
      <g transform="translate(28, 20.5)">
        <circle cx="3" cy="2" r="1.5" fill="#3B82F6" />
        <path d="M1 5.8C1 4.5 2 3.8 3 3.8C4 3.8 5 4.5 5 5.8H1Z" fill="#3B82F6" />
      </g>

      {/* Document Horizontal Text Lines */}
      <rect x="19" y="29" width="14" height="1.4" rx="0.7" fill="#60A5FA" />
      <rect x="19" y="32" width="14" height="1.4" rx="0.7" fill="#93C5FD" />
      <rect x="19" y="35" width="9" height="1.4" rx="0.7" fill="#BFDBFE" />
    </svg>
  );
};
