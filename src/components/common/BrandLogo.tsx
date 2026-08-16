import React from 'react';

export interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCountryBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  theme = 'auto',
  size = 'md',
  showCountryBadge = false,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Waaloge — Logement étudiant en toute confiance"
    >
      {/* EXACT LOGO EMBLEM AS SHOWN IN THE DESIGN */}
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-200 ${onClick ? 'group-hover:scale-105' : ''}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Base Dark House / Location shield */}
          <path
            d="M50 12 L18 38 V82 C18 86 21 89 25 89 H75 C79 89 82 86 82 82 V38 Z"
            fill="#0E1B4D"
          />

          {/* Roof Amber Overhang / Peak */}
          <path
            d="M50 8 L10 40 L16 46 L50 18 L84 46 L90 40 Z"
            fill="#F59E0B"
          />

          {/* Internal Search / Magnifying Glass / Home Keyhole */}
          {/* Outer Lens Ring */}
          <circle
            cx="50"
            cy="52"
            r="18"
            fill="#F59E0B"
            stroke="#0E1B4D"
            strokeWidth="3"
          />

          {/* Inner Light Lens */}
          <circle
            cx="50"
            cy="52"
            r="12"
            fill="#FFFFFF"
          />

          {/* Golden Search Heart / House Doorway */}
          <path
            d="M50 44 L42 51 H45 V60 H55 V51 H58 Z"
            fill="#0E1B4D"
          />

          {/* Magnifying Glass Handle */}
          <path
            d="M62 64 L74 76 L78 72 L66 60 Z"
            fill="#F59E0B"
          />
          
          {/* Small Sparkle / Accent */}
          <circle cx="50" cy="30" r="3.5" fill="#F59E0B" />
        </svg>
      </div>

      {/* TYPOGRAPHY: "Waa" (Navy or White) + "loge" (Amber/Orange) */}
      {variant !== 'icon-only' && (
        <div className="flex items-center tracking-tight leading-none font-black font-sans">
          <span
            className={`${textSizes[size]} ${
              isDark ? 'text-white' : 'text-[#0E1B4D]'
            } transition-colors`}
          >
            Waa
          </span>
          <span className={`${textSizes[size]} text-[#F59E0B]`}>
            loge
          </span>

          {showCountryBadge && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md bg-amber-500/10 text-[9px] font-bold text-amber-700 dark:text-amber-300 ml-1.5 uppercase">
              Bénin
            </span>
          )}
        </div>
      )}
    </div>
  );
};
