import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookings } from '../../contexts/BookingsContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  BedDouble, 
  ShowerHead, 
  Wifi, 
  Droplets, 
  DoorOpen, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play
} from 'lucide-react';

interface PropertyCarouselProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onOpenBooking: (property: Property) => void;
}

export const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  properties,
  onSelectProperty,
  onOpenBooking
}) => {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useBookings();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Group properties in pairs or cards depending on index
  const items = properties.slice(0, 6);
  const total = items.length;

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlay && total > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, total, currentIndex]);

  if (total === 0) return null;

  const currentProperty = items[currentIndex];

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Main Chic Featured Card Showcase */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl min-h-[460px] flex flex-col lg:flex-row">
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProperty.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col lg:flex-row"
          >
            {/* Left / Media Column */}
            <div className="lg:w-7/12 relative aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] overflow-hidden bg-slate-900 group">
              <img
                src={currentProperty.images[0]}
                alt={currentProperty.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                  currentProperty.availability === 'disponible'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#D97706] text-white'
                }`}>
                  {currentProperty.availability === 'disponible' ? t('popular_available') : t('popular_soon')}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{language === 'fr' ? '100% Vérifié' : '100% Verified'}</span>
                </span>
              </div>

              {/* Favorite Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(currentProperty.id);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 hover:text-rose-500 hover:bg-white shadow-lg transition-all active:scale-90 cursor-pointer"
                aria-label="Ajouter aux favoris"
              >
                <Heart className={`w-5 h-5 ${isFavorite(currentProperty.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
              </button>

              {/* Distance Bottom Left Badge */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{currentProperty.distanceToCampus}</span>
                </span>
              </div>
            </div>

            {/* Right / Content Details Column */}
            <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div className="space-y-4">
                {/* Micro Tag & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {currentProperty.type.toUpperCase()}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <span className="text-[#D97706]">★</span>
                    <span>{currentProperty.rating}</span>
                    <span className="text-slate-400 font-normal">({currentProperty.reviewsCount})</span>
                  </div>
                </div>

                {/* Title & Neighborhood */}
                <div>
                  <h3 
                    onClick={() => onSelectProperty(currentProperty.id)}
                    className="text-xl sm:text-2xl font-black text-[#0B132B] hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {currentProperty.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentProperty.neighborhood}</span>
                  </p>
                </div>

                {/* Description excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {currentProperty.description}
                </p>

                {/* Amenities Badges Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <BedDouble className="w-4 h-4 text-[#D97706]" />
                    <span className="truncate">{currentProperty.surface} m² • {currentProperty.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="truncate">{currentProperty.waterSupply === '24h/24' ? 'Eau 24h/24' : 'Château autonome'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <Wifi className="w-4 h-4 text-emerald-500" />
                    <span className="truncate">Wi-Fi haut débit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="truncate">{currentProperty.nearestUniversity}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Price & Booking CTA */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Loyer mensuel</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight">
                      {currentProperty.price.toLocaleString('fr-FR')} {currentProperty.currency}
                    </span>
                    <span className="text-xs text-slate-500">{t('popular_per_month')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProperty(currentProperty.id)}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Détails
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(currentProperty)}
                    className="px-5 py-2.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{t('popular_book_visit')}</span>
                    <ArrowRight className="w-4 h-4 text-[#D97706]" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Chic Carousel Controls Bar */}
      <div className="flex items-center justify-between gap-4 mt-4 px-2">
        {/* Left: Auto-play toggle & Index indicator */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2 rounded-xl bg-white border border-stone-200 text-slate-600 hover:text-slate-900 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
            title={isAutoPlay ? t('carousel_pause') : t('carousel_auto_play')}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-blue-600" /> : <Play className="w-3.5 h-3.5 text-[#D97706]" />}
          </button>

          <span className="text-xs font-semibold text-slate-500">
            <strong className="text-[#0B132B] font-bold">{currentIndex + 1}</strong> / {total}
          </span>
        </div>

        {/* Center: Pagination Dots with Animated Fill */}
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-[#D97706]'
                  : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Aller au slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Next / Prev Chic Glass Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label={t('carousel_prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition-all shadow-2xs active:scale-95 cursor-pointer"
            aria-label={t('carousel_next')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
