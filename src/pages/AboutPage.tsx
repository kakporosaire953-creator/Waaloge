import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ShieldCheck, 
  Heart, 
  Users, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Building2, 
  Award,
  Sparkles,
  Lock,
  Globe,
  Compass,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 sm:py-16 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{language === 'fr' ? 'Notre Vision 2026' : 'Our 2026 Vision'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B132B] tracking-tight leading-tight">
            {language === 'fr' 
              ? 'Simplifier la vie étudiante, ' 
              : 'Empowering student journeys, '}
            <span className="text-[#F59E0B]">
              {language === 'fr' ? 'une chambre à la fois.' : 'one room at a time.'}
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'fr'
              ? "Waaloge est la première plateforme certifiée dédiée au logement étudiant, garantissant des visites physiques réelles, la transparence sur les compteurs d'eau/électricité et 0 commission occulte."
              : 'Waaloge is the premier certified platform dedicated to student housing, ensuring on-site verified visits, absolute utility transparency, and zero hidden fees.'}
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-[#0B132B] block">5 000+</span>
            <span className="text-xs text-slate-500 font-medium">Étudiants accompagnés</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-[#F59E0B] block">100%</span>
            <span className="text-xs text-slate-500 font-medium">Logements audités</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">0 FCFA</span>
            <span className="text-xs text-slate-500 font-medium">Frais de visite</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 block">4.9 / 5</span>
            <span className="text-xs text-slate-500 font-medium">Satisfaction étudiante</span>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              {language === 'fr' ? '100% Vérifié sur le terrain' : '100% On-Site Inspected'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'fr'
                ? 'Nos agents se rendent dans chaque logement pour vérifier la réalité des photos, le bon fonctionnement des sanitaires et l’état du réseau électrique.'
                : 'Our field teams personally inspect every property to verify photos, bathroom functionality, and electricity grid reliability.'}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              {language === 'fr' ? 'Proche des campus' : 'Campus-First Locations'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'fr'
                ? 'Des logements stratégiquement sélectionnés à moins de 15 minutes à pied ou en transport direct des facultés et grandes écoles.'
                : 'Strategically curated homes within 15 minutes walk or direct transit from main universities and institutes.'}
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">
              {language === 'fr' ? 'Accompagnement humain' : 'Caring Student Support'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'fr'
                ? "De la recherche initiale jusqu'à la remise des clés et la signature du bail, notre équipe vous répond 7j/7 sur WhatsApp."
                : 'From the initial search to lease signing and key handover, our dedicated team is reachable 7/7 on WhatsApp.'}
            </p>
          </motion.div>
        </div>

        {/* Landlord Certification program banner */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Programme Propriétaire Certifié</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">Tu es bailleur ou gestionnaire d’immeuble ?</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Publie tes chambres et studios étudiants sur Waaloge pour trouver des locataires sérieux sans intermédiaire opaque.
              </p>
            </div>
            
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B132B] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer shrink-0"
            >
              Rejoindre le réseau bailleur
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#FFF8F0] p-8 sm:p-10 rounded-3xl border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">
              {language === 'fr' ? 'Prêt à trouver ton logement ?' : 'Ready to find your student home?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {language === 'fr'
                ? 'Rejoins plus de 5 000 étudiants ayant trouvé leur chez-soi avec Waaloge.'
                : 'Join over 5,000 students who found their housing with Waaloge.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="px-6 py-3.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>{t('nav_explore')}</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
