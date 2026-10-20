import React from 'react';

export const Wallpaper: React.FC = () => {
  return (
    <div className="wall fixed inset-0 w-screen h-screen pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      <svg
        className="wall__svg w-full h-full object-cover"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="wall-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--wbg1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--wbg2)' }} />
          </linearGradient>
          <linearGradient id="wall-a" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--wa1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--wa2)' }} />
          </linearGradient>
          <linearGradient id="wall-b" x1="0" y1="0" x2="1" y2="0.2">
            <stop offset="0" style={{ stopColor: 'var(--wb1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--wb2)' }} />
          </linearGradient>
          <linearGradient id="wall-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--wc1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--wc2)' }} />
          </linearGradient>
          <linearGradient id="wall-d" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--wd1)' }} />
            <stop offset="1" style={{ stopColor: 'var(--wd2)' }} />
          </linearGradient>
          <radialGradient id="wall-bub" cx=".38" cy=".32" r=".72">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".68" stopColor="#fff" stopOpacity=".07" />
            <stop offset="1" stopColor="#fff" stopOpacity=".42" />
          </radialGradient>
        </defs>

        {/* Dynamic Background Base */}
        <rect width="1600" height="1000" fill="url(#wall-bg)" />

        {/* Fluid Organic Glass Meshes */}
        <path
          d="M0 0H1180C1090 150 900 230 690 270C460 315 230 380 0 520Z"
          fill="url(#wall-a)"
        />
        <path
          d="M1600 0V470C1490 520 1330 470 1250 360C1170 250 1210 110 1300 0Z"
          fill="url(#wall-d)"
        />
        <path
          d="M0 700C240 560 500 500 800 540C1100 580 1350 470 1600 300V1000H0Z"
          fill="url(#wall-b)"
        />
        <path
          d="M0 768C280 648 560 608 840 648C1120 688 1360 598 1600 448V478C1360 628 1120 720 840 684C560 648 280 688 0 808Z"
          fill="#ffffff"
          fillOpacity=".16"
          style={{ opacity: 'var(--wline, 1)' }}
        />
        <path
          d="M0 860C280 760 600 770 900 840C1180 905 1420 860 1600 760V1000H0Z"
          fill="url(#wall-c)"
        />

        {/* Specular Light Contours */}
        <g fill="none" stroke="#ffffff" strokeLinecap="round" style={{ opacity: 'var(--wline, 1)' }}>
          <path
            d="M1180 0C1090 150 900 230 690 270C460 315 230 380 0 520"
            strokeOpacity=".45"
            strokeWidth="2.5"
          />
          <path
            d="M0 700C240 560 500 500 800 540C1100 580 1350 470 1600 300"
            strokeOpacity=".35"
            strokeWidth="2"
          />
          <path
            d="M0 860C280 760 600 770 900 840C1180 905 1420 860 1600 760"
            strokeOpacity=".25"
            strokeWidth="1.8"
          />
        </g>
      </svg>
    </div>
  );
};
