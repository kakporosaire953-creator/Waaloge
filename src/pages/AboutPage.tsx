import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Building2, 
  Sparkles,
  FileCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 sm:py-16 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 pb-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{language === 'fr' ? 'Notre Vision 2026' : 'Our 2026 Vision'}</span>
          </div>
          
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#0B132B] tracking-tight leading-tight">
            {language === 'fr' 
              ? 'Simplifier la vie étudiante, ' 
              : 'Empowering student journeys, '}
            <span className="text-[#D97706]">
              {language === 'fr' ? 'une chambre à la fois.' : 'one room at a time.'}
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            {language === 'fr'
              ? "Waaloge est la première plateforme certifiée dédiée au logement étudiant, garantissant des visites physiques réelles, la transparence sur les compteurs d'eau/électricité et 0 commission occulte."
              : 'Waaloge is the premier certified platform dedicated to student housing, ensuring on-site verified visits, absolute utility transparency, and zero hidden fees.'}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="font-editorial text-3xl sm:text-4xl text-[#0B132B] block">5 000+</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Étudiants accompagnés</span>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="font-editorial text-3xl sm:text-4xl text-[#D97706] block">100%</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Logements audités</span>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="font-editorial text-3xl sm:text-4xl text-emerald-600 block">0 FCFA</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Frais de visite</span>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-stone-200 text-center shadow-xs">
            <span className="font-editorial text-3xl sm:text-4xl text-blue-600 block">4.9 / 5</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Satisfaction étudiante</span>
          </motion.div>
        </motion.div>

        {/* Pillars */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#0B132B]">
              {language === 'fr' ? '100% Vérifié sur le terrain' : '100% On-Site Inspected'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === 'fr'
                ? 'Nos agents se rendent dans chaque logement pour vérifier la réalité des photos, le bon fonctionnement des sanitaires et l’état du réseau électrique.'
                : 'Our field teams personally inspect every property to verify photos, bathroom functionality, and electricity grid reliability.'}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#0B132B]">
              {language === 'fr' ? 'Proche des campus' : 'Campus-First Locations'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === 'fr'
                ? 'Des logements stratégiquement sélectionnés à moins de 15 minutes à pied ou en transport direct des facultés et grandes écoles.'
                : 'Strategically curated homes within 15 minutes walk or direct transit from main universities and institutes.'}
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#0B132B]">
              {language === 'fr' ? 'Accompagnement humain' : 'Caring Student Support'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {language === 'fr'
                ? "De la recherche initiale jusqu'à la remise des clés et la signature du bail, notre équipe vous répond 7j/7 sur WhatsApp."
                : 'From the initial search to lease signing and key handover, our dedicated team is reachable 7/7 on WhatsApp.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Landlord Certification program banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B132B] text-white p-8 sm:p-12 rounded-[2rem] border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D97706] uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Programme Propriétaire Certifié</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white">Tu es bailleur ou gestionnaire d’immeuble ?</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Publie tes chambres et studios étudiants sur Waaloge pour trouver des locataires sérieux sans intermédiaire opaque.
              </p>
            </div>
            
            <a
              href="https://wa.me/22997000000"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B132B] font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer shrink-0"
            >
              Rejoindre le réseau bailleur
            </a>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-50/70 p-8 sm:p-10 rounded-[2rem] border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm"
        >
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#0B132B]">
              {language === 'fr' ? 'Prêt à trouver ton logement ?' : 'Ready to find your student home?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'fr'
                ? 'Rejoins plus de 5 000 étudiants ayant trouvé leur chez-soi avec Waaloge.'
                : 'Join over 5,000 students who found their housing with Waaloge.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="px-7 py-3.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>{t('nav_explore')}</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

