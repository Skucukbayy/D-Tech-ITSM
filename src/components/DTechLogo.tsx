import React from 'react';

interface DTechLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const DTechLogo: React.FC<DTechLogoProps> = ({
  size = 36,
  className = '',
  showText = false
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 filter drop-shadow-[0_2px_12px_rgba(37,99,235,0.45)]"
      >
        <defs>
          {/* Main Body Gradient: Cyber Cyan -> Cobalt Blue -> Royal Violet */}
          <linearGradient id="dtech-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Liquid Glass Highlight Overlay */}
          <linearGradient id="dtech-glass" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          {/* Accent Circuit Glow */}
          <linearGradient id="dtech-circuit" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Outer Ring Ambient Glow */}
          <radialGradient id="dtech-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Backing Glow */}
        <circle cx="50" cy="50" r="46" fill="url(#dtech-glow)" />

        {/* Liquid Glass Base Squircle */}
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="24"
          fill="#0C101D"
          stroke="url(#dtech-circuit)"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />

        {/* Stylized Modern Crystalline "D" Monogram */}
        {/* Outer Spine & Curve */}
        <path
          d="M 28 22 
             C 28 22, 54 22, 65 31 
             C 76 40, 78 60, 65 69 
             C 54 78, 28 78, 28 78 
             Z"
          fill="url(#dtech-bg)"
        />

        {/* Inner Counter Cutout (giving the distinctive architectural D shape) */}
        <path
          d="M 40 34 
             L 50 34 
             C 57 34, 63 41, 63 50 
             C 63 59, 57 66, 50 66 
             L 40 66 
             Z"
          fill="#0C101D"
        />

        {/* High-Tech Circuit & Diamond Facet in Inner Core */}
        <polygon
          points="49,42 57,50 49,58 41,50"
          fill="url(#dtech-circuit)"
          opacity="0.95"
        />
        <circle cx="49" cy="50" r="2.5" fill="#FFFFFF" />

        {/* Horizontal Laser / Pulse Micro-lines */}
        <path
          d="M 20 50 L 32 50"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="50" r="2" fill="#38BDF8" />

        <path
          d="M 69 50 L 82 50"
          stroke="#A855F7"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="84" cy="50" r="2" fill="#A855F7" />

        {/* Specular Liquid Reflection Slash */}
        <path
          d="M 12 16 
             C 24 10, 76 10, 88 16 
             C 80 32, 20 44, 12 16 
             Z"
          fill="url(#dtech-glass)"
        />

        {/* Corner Accents */}
        <circle cx="16" cy="16" r="1.5" fill="#38BDF8" opacity="0.8" />
        <circle cx="84" cy="16" r="1.5" fill="#A855F7" opacity="0.8" />
        <circle cx="84" cy="84" r="1.5" fill="#38BDF8" opacity="0.8" />
        <circle cx="16" cy="84" r="1.5" fill="#A855F7" opacity="0.8" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              D<span className="text-cyan-400">-</span>TECH
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
              ITSM
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-wider text-text-3 uppercase mt-0.5">
            ISO 27001 Platform
          </span>
        </div>
      )}
    </div>
  );
};
