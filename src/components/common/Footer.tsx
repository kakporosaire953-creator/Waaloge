import React from 'react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Facebook, 
  Instagram, 
  Linkedin,
  Globe
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Logo, Bio & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo
              variant="full"
              theme="dark"
              size="lg"
              onClick={() => onNavigate('home')}
            />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t('footer_bio')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D97706] hover:text-[#0B132B] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D97706] hover:text-[#0B132B] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D97706] hover:text-[#0B132B] text-slate-300 flex items-center justify-center transition-colors font-bold text-xs"
                aria-label="TikTok"
              >
                <span>tk</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#D97706] hover:text-[#0B132B] text-slate-300 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_nav_title')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav_explore')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav_how_it_works')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav_about')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Aide & Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_help_title')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_faq')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_contact')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_terms')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_privacy')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Légal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_legal_title')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_legal_notices')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_cgu')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('footer_data_protection')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Télécharge l'app (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t('footer_app_title')}
            </h4>
            <p className="text-[11px] text-slate-400">
              {t('footer_app_soon')}
            </p>

            <div className="space-y-2 pt-1">
              {/* Google Play Store Badge Button */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer select-none">
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.91 1.91 0 0 1-.22-.924V2.738c0-.34.08-.658.22-.924zm11.236 11.238l2.585 2.586-11.758 6.786 9.173-9.372zm2.585-2.586l-2.585 2.586-9.173-9.372 11.758 6.786zm1.053 1.053l3.036 1.753c.87.502.87 1.324 0 1.826l-3.036 1.753-2.121-2.122 2.121-2.21z" />
                </svg>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block leading-tight">{t('footer_app_store_available')}</span>
                  <span className="text-xs font-bold text-white block leading-tight">Google Play</span>
                </div>
              </div>

              {/* Apple App Store Badge Button */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer select-none">
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.66-.99 1.72-.88 2.74 1.01.08 2.02-.51 2.59-1.24z" />
                </svg>
                <div className="text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block leading-tight">{t('footer_app_store_download')}</span>
                  <span className="text-xs font-bold text-white block leading-tight">App Store</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 <strong className="text-slate-400">Waaloge</strong>. {t('footer_rights')}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t('footer_tagline')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
