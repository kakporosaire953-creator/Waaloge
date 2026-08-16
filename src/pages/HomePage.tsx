import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property, SearchFilters, CityId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { PropertyCarousel } from '../components/common/PropertyCarousel';
import { BudgetSimulator } from '../components/common/BudgetSimulator';
import { NeighborhoodExplorer } from '../components/common/NeighborhoodExplorer';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { 
  Search, 
  MapPin, 
  Coins, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  CalendarCheck2, 
  Users, 
  Zap,
  Droplets,
  BookOpen,
  Clock,
  ChevronRight
} from 'lucide-react';

import ctaStudentImg from '../assets/images/cta_student_books_1786912237396.jpg';
import heroStudentImg from '../assets/images/hero_student_study_group_1786913429143.jpg';

// Authentic Student Hero & CTA Imagery
const HERO_STUDENT_IMG = heroStudentImg;
const CTA_STUDENT_IMG = ctaStudentImg;

// Harmonious Section Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.65, 
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
};

interface HomePageProps {
  properties: Property[];
  onSearch: (filters: Partial<SearchFilters>) => void;
  onSelectProperty: (id: string) => void;
  onNavigate: (tab: string) => void;
  onOpenBooking: (property: Property) => void;
  selectedCity: CityId;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  onSearch,
  onSelectProperty,
  onNavigate,
  onOpenBooking,
  selectedCity
}) => {
  const { t, language } = useLanguage();

  // Search Bar Local States
  const [neighborhood, setNeighborhood] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      neighborhood: neighborhood.trim() || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      type: propertyType !== 'all' ? (propertyType as any) : undefined,
    });
    onNavigate('explore');
  };

  const handleQuickBudgetSearch = (maxBudgetVal: number) => {
    onSearch({
      maxPrice: maxBudgetVal,
    });
    onNavigate('explore');
  };

  const handleQuickNeighborhoodSearch = (neighborhoodName: string) => {
    onSearch({
      neighborhood: neighborhoodName,
    });
    onNavigate('explore');
  };

  return (
    <div className="relative space-y-20 sm:space-y-28 pb-24 overflow-x-hidden">
      
      {/* Ambient background glow accents for page-wide visual harmony */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-[450px] h-[450px] bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative pt-4 sm:pt-8 md:pt-10 pb-4 max-w-7xl mx-auto px-3.5 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & Search Console */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-50/90 backdrop-blur-sm border border-amber-200/80 text-amber-900 text-[11px] sm:text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>{t('hero_badge')}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0B132B] tracking-tight leading-[1.15] sm:leading-[1.1]">
              {t('hero_title_1')}{' '}
              <span className="text-[#F59E0B] underline decoration-[#F59E0B]/30 underline-offset-4 sm:underline-offset-8">
                {t('hero_title_2')}
              </span>{' '}
              {t('hero_title_3')}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              {t('hero_subtitle')}
            </p>

            {/* Compact Search Console */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/50 space-y-3 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                
                {/* Neighborhood Input */}
                <div className="bg-stone-50/80 hover:bg-stone-50 p-2.5 rounded-xl sm:rounded-2xl border border-stone-200/70 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F59E0B]" />
                    {t('hero_field_neighborhood')}
                  </label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder={t('hero_field_neighborhood_placeholder')}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none mt-0.5"
                  />
                </div>

                {/* Housing Type Select */}
                <div className="bg-stone-50/80 hover:bg-stone-50 p-2.5 rounded-xl sm:rounded-2xl border border-stone-200/70 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Home className="w-3 h-3 text-blue-500" />
                    {t('hero_field_type')}
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none mt-0.5 cursor-pointer"
                  >
                    <option value="all">{t('hero_type_all')}</option>
                    <option value="studio">{t('hero_type_studio')}</option>
                    <option value="chambre">{t('hero_type_chambre')}</option>
                    <option value="appartement">{t('hero_type_appartement')}</option>
                    <option value="colocation">{t('hero_type_colocation')}</option>
                  </select>
                </div>

                {/* Max Budget Input */}
                <div className="bg-stone-50/80 hover:bg-stone-50 p-2.5 rounded-xl sm:rounded-2xl border border-stone-200/70 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                    <Coins className="w-3 h-3 text-emerald-500" />
                    {t('hero_field_max_budget')}
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Ex: 80 000 FCFA"
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none mt-0.5"
                  />
                </div>

              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('hero_search_cta')}</span>
              </button>
            </form>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80"
                  alt="Student 1"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Student 2"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80"
                  alt="Student 3"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                {t('hero_social_proof')}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 relative mt-4 lg:mt-0"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Animated pulsating gradient glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.06, 1],
                  opacity: [0.35, 0.6, 0.35]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-4 bg-gradient-to-tr from-[#F59E0B]/30 via-amber-300/20 to-blue-600/20 rounded-3xl blur-2xl -z-10" 
              />

              {/* Floating Top-Right Mini Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.5 },
                  x: { delay: 0.4, duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute -top-2.5 -right-1.5 sm:-top-3 sm:-right-2 z-20 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-amber-200/80 shadow-lg flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0B132B]"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F59E0B]" />
                <span>Étudiants 2026</span>
              </motion.div>

              {/* Main Image Frame with Gentle Floating Motion */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-slate-900 group"
              >
                <img
                  src={HERO_STUDENT_IMG}
                  alt="Étudiants Waaloge"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-black/15 to-transparent" />

                {/* Floating Bottom Card */}
                <motion.div 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/50 shadow-xl flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706] shadow-xs shrink-0">
                      <CalendarCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase tracking-wider block truncate">
                        {t('hero_badge_stat_title')}
                      </span>
                      <span className="text-xs sm:text-base font-black text-slate-900 block truncate">
                        {t('hero_badge_stat_val')}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold border border-emerald-200 shadow-2xs flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
                    <span>100% Gratuit</span>
                  </span>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </motion.section>
              
              {/* Animated pulsating gradient glow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.06, 1],
                  opacity: [0.35, 0.6, 0.35]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -inset-4 bg-gradient-to-tr from-[#F59E0B]/30 via-amber-300/20 to-blue-600/20 rounded-3xl blur-2xl -z-10" 
              />

              {/* Floating Top-Right Mini Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.5 },
                  x: { delay: 0.4, duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-lg flex items-center gap-1.5 text-xs font-black text-[#0B132B]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Étudiants 2026</span>
              </motion.div>

              {/* Main Image Frame with Gentle Floating Motion */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group"
              >
                <img
                  src={HERO_STUDENT_IMG}
                  alt="Étudiants Waaloge"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-black/15 to-transparent" />

                {/* Floating Bottom Card */}
                <motion.div 
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706] shadow-xs">
                      <CalendarCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                        {t('hero_badge_stat_title')}
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {t('hero_badge_stat_val')}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shadow-2xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Gratuit</span>
                  </span>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 2. CHIC FEATURED PROPERTIES CAROUSEL */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{t('popular_badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B] tracking-tight">
              {t('popular_title')} <span className="text-[#F59E0B]">{t('popular_title_highlight')}</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <span>{t('popular_view_all')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Chic Property Carousel with Animations */}
        <PropertyCarousel
          properties={properties}
          onSelectProperty={onSelectProperty}
          onOpenBooking={onOpenBooking}
        />
      </motion.section>

      {/* ========================================================================= */}
      {/* 3. THE 4-STEP STUDENT JOURNEY */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-gradient-to-br from-stone-50/90 via-stone-50/60 to-amber-50/30 rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
              {t('how_section_badge')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B]">
              {t('how_section_title')} <span className="text-[#F59E0B]">{t('how_section_title_highlight')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('how_section_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-200 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-[#D97706] font-black text-lg flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('step_1_title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step_1_desc')}</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-700 font-black text-lg flex items-center justify-center shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('step_2_title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step_2_desc')}</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-700 font-black text-lg flex items-center justify-center shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('step_3_title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step_3_desc')}</p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-purple-200 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-purple-700 font-black text-lg flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">{t('step_4_title')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t('step_4_desc')}</p>
            </motion.div>

          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE STUDENT BUDGET SIMULATOR */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <BudgetSimulator onSearchBudget={handleQuickBudgetSearch} />
      </motion.section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE NEIGHBORHOOD & CAMPUS GUIDE */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <NeighborhoodExplorer onSelectNeighborhood={handleQuickNeighborhoodSearch} />
      </motion.section>

      {/* ========================================================================= */}
      {/* 6. TRUST & SAFETY CHARTER */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            {t('trust_badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B132B]">
            {t('trust_title')} <span className="text-[#F59E0B]">{t('trust_title_highlight')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('trust_1_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('trust_1_desc')}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('trust_2_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('trust_2_desc')}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('trust_3_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('trust_3_desc')}</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t('trust_4_title')}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t('trust_4_desc')}</p>
          </motion.div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 7. STUDENT LIFE GUIDES & PRACTICAL TIPS */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('guides_badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight">
              {t('guides_title')} <span className="text-[#F59E0B]">{t('guides_title_highlight')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('guides_subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Voir tous les guides</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Guide 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onNavigate('about')}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
                alt="Guide 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {t('guide_1_category')}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('guide_1_read_time')}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {t('guide_1_title')}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 pt-3">
                {t('guide_read_more')} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Guide 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onNavigate('about')}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                alt="Guide 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {t('guide_2_category')}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('guide_2_read_time')}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {t('guide_2_title')}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 pt-3">
                {t('guide_read_more')} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Guide 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => onNavigate('about')}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                alt="Guide 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                    {t('guide_3_category')}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('guide_3_read_time')}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {t('guide_3_title')}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 pt-3">
                {t('guide_read_more')} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 8. FAQ ACCORDION */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
      >
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
            {t('faq_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B]">
            {t('faq_title')} <span className="text-[#F59E0B]">{t('faq_title_highlight')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('faq_subtitle')}
          </p>
        </div>

        <FaqAccordion />
      </motion.section>

      {/* ========================================================================= */}
      {/* 9. HIGH-CONVERSION CTA BANNER */}
      {/* ========================================================================= */}
      <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#0B132B] text-white p-8 sm:p-14 border border-slate-800 shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F59E0B]">
                Waaloge 2026
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {t('cta_title_1')} <span className="text-[#F59E0B]">{t('cta_title_2')}</span> {t('cta_title_3')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {t('cta_subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="px-6 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B132B] font-black text-sm rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <span>{t('cta_explore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  {t('cta_how')}
                </button>
              </div>
            </div>

            {/* Right student circle showcase */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#F59E0B] shadow-2xl bg-slate-800">
                  <img
                    src={CTA_STUDENT_IMG}
                    alt="Étudiante Waaloge"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute -bottom-2 -left-2 bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 border border-stone-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>100% Vérifié</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.section>

    </div>
  );
};
