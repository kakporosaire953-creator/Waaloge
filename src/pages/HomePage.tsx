/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property, SearchFilters, CityId } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { PropertyCarousel } from '../components/common/PropertyCarousel';
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
  BookOpen,
  Clock,
  ChevronRight,
} from 'lucide-react';

import ctaStudentImg from '../assets/images/cta_student_books_1786912237396.jpg';
import heroStudentImg from '../assets/images/hero_student_classroom_1786912397937.jpg';

const HERO_STUDENT_IMG = heroStudentImg;
const CTA_STUDENT_IMG = ctaStudentImg;

/* ── Zigzag step images ── */
const STEP_IMGS = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80',
];

/* ── Step accent colors — full class strings for Tailwind scanner ── */
const STEP_ACCENTS = [
  { ring: 'ring-amber-300',   text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',   num: 'text-amber-600'   },
  { ring: 'ring-blue-300',    text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',    num: 'text-blue-600'    },
  { ring: 'ring-emerald-300', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', num: 'text-emerald-600' },
  { ring: 'ring-violet-300',  text: 'text-violet-700',  bg: 'bg-violet-50',  border: 'border-violet-200',  num: 'text-violet-600'  },
];


/* ── Animation variants ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
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

  const handleQuickNeighborhoodSearch = (neighborhoodName: string) => {
    onSearch({
      neighborhood: neighborhoodName,
    });
    onNavigate('explore');
  };

  /* Pre-computed step data */
  const stepData = [
    { num: '01', title: t('step_1_title'), desc: t('step_1_desc'), img: STEP_IMGS[0], accent: STEP_ACCENTS[0] },
    { num: '02', title: t('step_2_title'), desc: t('step_2_desc'), img: STEP_IMGS[1], accent: STEP_ACCENTS[1] },
    { num: '03', title: t('step_3_title'), desc: t('step_3_desc'), img: STEP_IMGS[2], accent: STEP_ACCENTS[2] },
    { num: '04', title: t('step_4_title'), desc: t('step_4_desc'), img: STEP_IMGS[3], accent: STEP_ACCENTS[3] },
  ];

  /* Pre-computed guide data */
  const guideData = [
    {
      img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      category: t('guide_1_category'), time: t('guide_1_read_time'), title: t('guide_1_title'),
      color: 'text-blue-600 bg-blue-50',
    },
    {
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      category: t('guide_2_category'), time: t('guide_2_read_time'), title: t('guide_2_title'),
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
      category: t('guide_3_category'), time: t('guide_3_read_time'), title: t('guide_3_title'),
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  return (
    <div className="relative space-y-24 sm:space-y-32 pb-28 overflow-x-hidden">

      {/* ── Ambient background glows ── */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[520px] h-[520px] bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-[460px] h-[460px] bg-blue-200/15 rounded-full blur-3xl" />
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* 1. HERO                                             */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative pt-6 sm:pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left: Headline + Search */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>{t('hero_badge')}</span>
            </div>

            {/* ── Editorial headline ── */}
            <h1 className="font-editorial text-[2.6rem] sm:text-6xl lg:text-[4.25rem] text-[#0B132B] leading-[1.03] tracking-tight">
              {t('hero_title_1')}{' '}
              <span className="text-[#F59E0B]">{t('hero_title_2')}</span>{' '}
              {t('hero_title_3')}
            </h1>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              {t('hero_subtitle')}
            </p>

            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="bg-stone-50 hover:bg-white p-2.5 rounded-2xl border border-stone-200 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
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

                <div className="bg-stone-50 hover:bg-white p-2.5 rounded-2xl border border-stone-200 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
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

                <div className="bg-stone-50 hover:bg-white p-2.5 rounded-2xl border border-stone-200 focus-within:border-[#F59E0B] focus-within:bg-white transition-all">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
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

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0B132B] hover:bg-[#1a2744] text-white font-bold text-sm rounded-2xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#F59E0B]" />
                <span>{t('hero_search_cta')}</span>
              </button>
            </form>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80',
                ].map((src, i) => (
                  <img key={i} className="w-8 h-8 rounded-full ring-2 ring-white object-cover" src={src} alt="" referrerPolicy="no-referrer" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">{t('hero_social_proof')}</p>
            </div>
          </motion.div>

          {/* Right: Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-4 bg-gradient-to-tr from-[#F59E0B]/30 via-amber-300/20 to-blue-600/20 rounded-3xl blur-2xl -z-10"
              />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.5 },
                  x: { delay: 0.4, duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 },
                }}
                className="absolute -top-3 -right-2 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-lg flex items-center gap-1.5 text-xs font-black text-[#0B132B]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Étudiante 2026</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group"
              >
                <img
                  src={HERO_STUDENT_IMG}
                  alt="Étudiante Waaloge"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-black/20 to-transparent" />

                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#D97706]">
                      <CalendarCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">{t('hero_badge_stat_title')}</span>
                      <span className="text-base font-black text-slate-900">{t('hero_badge_stat_val')}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Gratuit</span>
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 2. FEATURED PROPERTIES CAROUSEL                     */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-100">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{t('popular_badge')}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#0B132B] leading-tight">
              {t('popular_title')}{' '}
              <span className="text-[#F59E0B]">{t('popular_title_highlight')}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0B132B] transition-colors cursor-pointer group shrink-0"
          >
            <span>{t('popular_view_all')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <PropertyCarousel
          properties={properties}
          onSelectProperty={onSelectProperty}
          onOpenBooking={onOpenBooking}
        />
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 3. EDITORIAL ZIGZAG — COMMENT ÇA MARCHE            */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {t('how_section_badge')}
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#0B132B] leading-tight">
            {t('how_section_title')}{' '}
            <span className="text-[#F59E0B]">{t('how_section_title_highlight')}</span>
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">{t('how_section_desc')}</p>
        </div>

        {/* Zigzag container */}
        <div className="relative">
          {/* Vertical connecting line — desktop only */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-28 bottom-28 w-px pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #e2c96c, #d1d5db, #c4b5fd, transparent)' }}
          />

          <div className="space-y-20 sm:space-y-24 lg:space-y-32">
            {stepData.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  variants={itemVariants}
                  className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-0`}
                >
                  {/* ── Image half ── */}
                  <div className={`w-full lg:w-1/2 flex justify-center ${isLeft ? 'lg:justify-end lg:pr-20' : 'lg:justify-start lg:pl-20'}`}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                    >
                      {/* Large faded step number behind image */}
                      <span
                        className={`absolute -top-10 ${isLeft ? '-left-6' : '-right-6'} font-editorial text-[7rem] sm:text-[9rem] leading-none ${step.accent.num} opacity-[0.07] select-none pointer-events-none`}
                      >
                        {step.num}
                      </span>

                      {/* Organic image shape */}
                      <div
                        className={`w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 overflow-hidden ring-4 ${step.accent.ring} ring-offset-4 ring-offset-[#FAF9F6] shadow-2xl bg-slate-100`}
                        style={{ borderRadius: '40% 60% 55% 45% / 45% 55% 60% 40%' }}
                      >
                        <img
                          src={step.img}
                          alt={step.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Step badge pill */}
                      <div className={`absolute -bottom-4 ${isLeft ? '-right-4' : '-left-4'} ${step.accent.bg} ${step.accent.border} border-2 px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2`}>
                        <span className={`font-editorial text-lg leading-none ${step.accent.text}`}>{step.num}</span>
                        <span className="text-[11px] font-bold text-slate-400 tracking-wider">/ 04</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* ── Content half ── */}
                  <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pl-20' : 'lg:pr-20'} text-center lg:text-left`}>
                    <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${step.accent.bg} ${step.accent.border} border text-xs font-bold ${step.accent.text} uppercase tracking-wider`}>
                        Étape {step.num}
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#0B132B] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 4. NEIGHBORHOOD & CAMPUS GUIDE                      */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <NeighborhoodExplorer onSelectNeighborhood={handleQuickNeighborhoodSearch} />
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 5. ASYMMETRIC EDITORIAL — POURQUOI WAALOGE          */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
      >
        {/* Header — left-aligned editorial */}
        <div className="space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {t('trust_badge')}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#0B132B] leading-tight max-w-xl">
              {t('trust_title')}{' '}
              <span className="text-[#F59E0B]">{t('trust_title_highlight')}</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed shrink-0">
              Waaloge simplifie la recherche et remet l'humain au centre.
            </p>
          </div>
        </div>

        {/* ── Asymmetric editorial grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Block 01 — Large dark feature card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 relative overflow-hidden rounded-[2rem] bg-[#0B132B] text-white min-h-[360px] lg:min-h-[460px] flex flex-col justify-end p-8 sm:p-10 group"
          >
            {/* Giant editorial number watermark */}
            <span className="absolute top-4 right-6 font-editorial text-[11rem] leading-none text-white/[0.035] select-none pointer-events-none">
              01
            </span>
            {/* Warm glow spot */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
            {/* Gradient over image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/55 to-[#0B132B]/10 z-10" />
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
              alt="Propriétaires certifiés"
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Content */}
            <div className="relative z-20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white leading-snug">
                {t('trust_1_title')}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm">{t('trust_1_desc')}</p>
            </div>
          </motion.div>

          {/* Blocks 02 & 03 — Stacked right column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[2rem] bg-blue-50 border border-blue-100 p-7 flex flex-col justify-between min-h-[200px] group"
            >
              <span className="absolute top-2 right-4 font-editorial text-[6rem] leading-none text-blue-200/50 select-none pointer-events-none">
                02
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center mb-4">
                <CalendarCheck2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-xl sm:text-2xl text-[#0B132B] leading-snug">{t('trust_2_title')}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{t('trust_2_desc')}</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[2rem] bg-emerald-50 border border-emerald-100 p-7 flex flex-col justify-between min-h-[200px] group"
            >
              <span className="absolute top-2 right-4 font-editorial text-[6rem] leading-none text-emerald-200/50 select-none pointer-events-none">
                03
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-xl sm:text-2xl text-[#0B132B] leading-snug">{t('trust_3_title')}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{t('trust_3_desc')}</p>
              </div>
            </motion.div>
          </div>

          {/* Block 04 — Full-width horizontal strip */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 relative overflow-hidden rounded-[2rem] border border-amber-100 bg-gradient-to-r from-amber-50 via-amber-50/50 to-white p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 group"
          >
            <span className="absolute top-0 right-8 font-editorial text-[9rem] leading-none text-amber-100/90 select-none pointer-events-none">
              04
            </span>
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
              <Coins className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1 relative z-10 space-y-2 text-center sm:text-left">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B132B] leading-snug">{t('trust_4_title')}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{t('trust_4_desc')}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B132B] text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Explorer <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 6. STUDENT LIFE GUIDES                              */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('guides_badge')}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#0B132B] leading-tight">
              {t('guides_title')}{' '}
              <span className="text-[#F59E0B]">{t('guides_title_highlight')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">{t('guides_subtitle')}</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#0B132B] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>Voir tous les guides</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guideData.map((guide, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onNavigate('about')}
              className="bg-white rounded-[1.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={guide.img}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className={`${guide.color} px-2 py-0.5 rounded-md`}>{guide.category}</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.time}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1 pt-3">
                  {t('guide_read_more')} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 7. FAQ ACCORDION                                    */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
      >
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            {t('faq_badge')}
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#0B132B]">
            {t('faq_title')}{' '}
            <span className="text-[#F59E0B]">{t('faq_title_highlight')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">{t('faq_subtitle')}</p>
        </div>
        <FaqAccordion />
      </motion.section>

      {/* ════════════════════════════════════════════════════ */}
      {/* 8. HIGH-CONVERSION CTA BANNER                       */}
      {/* ════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0B132B] text-white p-8 sm:p-14 border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F59E0B]">Waaloge 2026</span>
              <h2 className="font-editorial text-4xl sm:text-6xl text-white leading-[1.03]">
                {t('cta_title_1')}{' '}
                <span className="text-[#F59E0B]">{t('cta_title_2')}</span>{' '}
                {t('cta_title_3')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">{t('cta_subtitle')}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B132B] font-black text-sm rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
                >
                  <span>{t('cta_explore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  {t('cta_how')}
                </button>
              </div>
            </div>

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

