import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { Building2, Compass, Heart, CalendarCheck2, User as UserIcon } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onNavigate }) => {
  const { t } = useLanguage();
  const { favorites, bookings } = useBookings();

  const activeBookingsCount = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;

  const navItems = [
    { id: 'home', label: t('nav_home'), icon: Building2 },
    { id: 'explore', label: t('nav_explore'), icon: Compass },
    { id: 'favorites', label: t('nav_favorites'), icon: Heart, count: favorites.length },
    { id: 'dashboard', label: t('nav_bookings'), icon: CalendarCheck2, count: activeBookingsCount },
    { id: 'profile', label: t('nav_profile'), icon: UserIcon }
  ];

  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-lg px-2 py-1.5 pb-safe"
    >
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                isActive ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-amber-600' : 'stroke-[1.75]'}`} />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
