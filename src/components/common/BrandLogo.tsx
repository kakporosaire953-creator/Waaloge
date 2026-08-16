import React from 'react';
import officialLogoImg from '../../assets/images/waaloge_official_logo_1786912528197.jpg';

export interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  theme?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCountryBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'auto',
  size = 'md',
  showCountryBadge = false,
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-[60px] max-w-[260px]',
    md: 'h-[100px] max-w-[380px]',
    lg: 'h-[120px] max-w-[460px]',
    xl: 'h-[150px] max-w-[550px]'
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${
        isDark ? 'bg-white p-2.5 sm:p-3 rounded-2xl shadow-md border border-white/30' : ''
      } ${className}`}
      title="Waaloge — Ton prochain chez-toi commence ici"
    >
      <img
        src={officialLogoImg}
        alt="Waaloge — Ton prochain chez-toi commence ici"
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 ${
          onClick ? 'group-hover:scale-102' : ''
        }`}
        referrerPolicy="no-referrer"
      />

      {showCountryBadge && (
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-amber-500/15 text-[10px] font-extrabold text-amber-800 border border-amber-300/60 uppercase tracking-wide">
          Bénin
        </span>
      )}
    </div>
  );
};

