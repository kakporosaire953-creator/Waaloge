import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { CityId } from '../../types';
import { BrandLogo } from './BrandLogo';
import { 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  CalendarCheck2, 
  Heart, 
  Bell,
  Sparkles 
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, propertyId?: string) => void;
  selectedCity: CityId;
  onSelectCity: (cityId: CityId) => void;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  selectedCity,
  onSelectCity,
  onOpenAssistant
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { favorites, unreadNotificationsCount, notifications, markNotificationAsRead } = useBookings();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 min-h-[72px] sm:min-h-[86px] md:min-h-[102px] py-1.5 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LEFT: BRAND LOGO */}
        <div className="flex items-center shrink-0">
          <BrandLogo
            variant="full"
            size="md"
            onClick={() => onNavigate('home')}
          />
        </div>

        {/* CENTER: DESKTOP NAVIGATION (I18N TRANSLATED WITH ANIMATED UNDERLINE) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-semibold text-slate-700">
          {[
            { key: 'home', label: t('nav_home') },
            { key: 'explore', label: t('nav_explore') },
            { key: 'how-it-works', label: t('nav_how_it_works') },
            { key: 'about', label: t('nav_about') },
          ].map((navItem) => {
            const isActive = currentTab === navItem.key;
            return (
              <button
                key={navItem.key}
                type="button"
                onClick={() => onNavigate(navItem.key)}
                className={`group relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'text-[#0B132B] font-bold bg-amber-50/80 border border-amber-200/50'
                    : 'text-slate-600 hover:text-[#0B132B] hover:bg-stone-100/70'
                }`}
              >
                <span className="relative z-10">{navItem.label}</span>

                {/* Animated underline drawing from left to right */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] bg-[#D97706] rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* RIGHT: LANGUAGE & AUTH BUTTONS */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-28 bg-white border border-stone-200 rounded-xl shadow-lg py-1 z-50 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('fr');
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                    language === 'fr' ? 'font-bold text-[#F59E0B]' : 'text-slate-700'
                  }`}
                >
                  <span>Français</span>
                  {language === 'fr' && <span>✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    setIsLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                    language === 'en' ? 'font-bold text-[#F59E0B]' : 'text-slate-700'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* If Authenticated: Show Account & Notification Badge */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Favorites */}
              <button
                type="button"
                onClick={() => onNavigate('favorites')}
                className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative cursor-pointer"
                title={t('nav_favorites')}
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2 sm:pl-2 sm:pr-3 py-1 sm:py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-white cursor-pointer shadow-2xs"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F59E0B] text-slate-950 font-bold text-xs flex items-center justify-center overflow-hidden shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-900 hidden sm:block max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-stone-200 shadow-xl py-1.5 z-50 text-xs">
                    <div className="px-3.5 py-2 border-b border-stone-100">
                      <p className="font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                    >
                      <CalendarCheck2 className="w-4 h-4 text-[#F59E0B]" />
                      {t('nav_my_bookings')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      {t('nav_my_account')}
                    </button>
                    <div className="border-t border-stone-100 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-semibold cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav_logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* EXACT BUTTONS FROM DESIGN WITH TRANSLATION */
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('auth')}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                {t('nav_login')}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('auth')}
                className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#F59E0B] hover:bg-[#D97706] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer whitespace-nowrap"
              >
                {t('nav_register')}
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('home');
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
              currentTab === 'home' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t('nav_home')}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('explore');
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
              currentTab === 'explore' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t('nav_explore')}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('how-it-works');
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
              currentTab === 'how-it-works' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t('nav_how_it_works')}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('about');
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
              currentTab === 'about' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t('nav_about')}
          </button>
        </div>
      )}
    </header>
  );
};
