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
  const { language, setLanguage } = useLanguage();
  const { favorites, unreadNotificationsCount, notifications, markNotificationAsRead } = useBookings();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-stone-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        {/* LEFT: BRAND LOGO */}
        <div className="flex items-center">
          <BrandLogo
            variant="full"
            size="md"
            onClick={() => onNavigate('home')}
          />
        </div>

        {/* CENTER: DESKTOP NAVIGATION (EXACTLY AS IN THE MOCKUP) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`relative py-2 font-medium transition-colors cursor-pointer ${
              currentTab === 'home'
                ? 'text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Accueil
            {currentTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F59E0B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className={`relative py-2 font-medium transition-colors cursor-pointer ${
              currentTab === 'explore'
                ? 'text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explorer
            {currentTab === 'explore' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F59E0B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('how-it-works')}
            className={`relative py-2 font-medium transition-colors cursor-pointer ${
              currentTab === 'how-it-works'
                ? 'text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comment ça marche
            {currentTab === 'how-it-works' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F59E0B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`relative py-2 font-medium transition-colors cursor-pointer ${
              currentTab === 'about'
                ? 'text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            À propos
            {currentTab === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F59E0B] rounded-full" />
            )}
          </button>
        </nav>

        {/* RIGHT: LANGUAGE & AUTH BUTTONS (EXACTLY AS IN THE MOCKUP) */}
        <div className="flex items-center gap-3">
          
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4 text-slate-500" />
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
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between ${
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
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between ${
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
            <div className="flex items-center gap-2">
              {/* Favorites */}
              <button
                type="button"
                onClick={() => onNavigate('favorites')}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative cursor-pointer"
                title="Mes favoris"
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 bg-white cursor-pointer shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#F59E0B] text-slate-950 font-bold text-xs flex items-center justify-center overflow-hidden shrink-0">
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
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                    >
                      <CalendarCheck2 className="w-4 h-4 text-[#F59E0B]" />
                      Mes réservations
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      Mon compte
                    </button>
                    <div className="border-t border-stone-100 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* EXACT BUTTONS FROM DESIGN: "Se connecter" & "S'inscrire" */
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('auth')}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                Se connecter
              </button>

              <button
                type="button"
                onClick={() => onNavigate('auth')}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#F59E0B] hover:bg-[#D97706] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
              >
                S'inscrire
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
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
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'home' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
            }`}
          >
            Accueil
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('explore');
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'explore' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
            }`}
          >
            Explorer
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('how-it-works');
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'how-it-works' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
            }`}
          >
            Comment ça marche
          </button>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('about');
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
              currentTab === 'about' ? 'bg-amber-50 text-amber-900 font-bold' : 'text-slate-700'
            }`}
          >
            À propos
          </button>
        </div>
      )}
    </header>
  );
};
