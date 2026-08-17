import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Clock, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

export interface GuideItem {
  id: string;
  category: string;
  readTime: string;
  title: string;
  image: string;
  colorClass: string;
}

interface GuidesCarouselProps {
  onNavigate: (tab: string) => void;
}

export const GuidesCarousel: React.FC<GuidesCarouselProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const guides: GuideItem[] = [
    {
      id: '1',
      category: t('guide_1_category'),
      readTime: t('guide_1_read_time'),
      title: t('guide_1_title'),
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80',
      colorClass: 'text-blue-600 bg-blue-50 border border-blue-200'
    },
    {
      id: '2',
      category: t('guide_2_category'),
      readTime: t('guide_2_read_time'),
      title: t('guide_2_title'),
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80',
      colorClass: 'text-emerald-600 bg-emerald-50 border border-emerald-200'
    },
    {
      id: '3',
      category: t('guide_3_category'),
      readTime: t('guide_3_read_time'),
      title: t('guide_3_title'),
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=700&q=80',
      colorClass: 'text-purple-600 bg-purple-50 border border-purple-200'
    },
    {
      id: '4',
      category: 'Vie Pratique',
      readTime: '4 min',
      title: 'Gestion du budget étudiant : électricité, eau et transport sans surprise',
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=700&q=80',
      colorClass: 'text-amber-600 bg-amber-50 border border-amber-200'
    },
    {
      id: '5',
      category: 'Colocation',
      readTime: '6 min',
      title: 'Comment réussir sa première colocation entre étudiants à l’université',
      image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=700&q=80',
      colorClass: 'text-rose-600 bg-rose-50 border border-rose-200'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <BookOpen className="w-4 h-4 text-[#F59E0B]" />
          <span>{guides.length} guides pratiques pour la vie étudiante</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-amber-400 text-slate-700 hover:text-slate-950 shadow-xs hover:shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            aria-label="Guide précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-amber-400 text-slate-700 hover:text-slate-950 shadow-xs hover:shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            aria-label="Guide suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {guides.map((guide, index) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => onNavigate('about')}
            className="min-w-[280px] sm:min-w-[340px] max-w-[360px] bg-white rounded-[1.75rem] border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between shrink-0 snap-start"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className={`px-2.5 py-1 rounded-lg ${guide.colorClass}`}>
                    {guide.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-[#0B132B] group-hover:text-blue-600 transition-colors leading-snug">
                  {guide.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#F59E0B]">
                <span>{t('guide_read_more')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
