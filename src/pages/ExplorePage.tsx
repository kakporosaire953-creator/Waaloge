import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Property, SearchFilters } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { FilterSheet } from '../components/property/FilterSheet';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles
} from 'lucide-react';

interface ExplorePageProps {
  properties: Property[];
  filters: SearchFilters;
  onFilterChange: (newFilters: Partial<SearchFilters>) => void;
  onResetFilters: () => void;
  onSelectProperty: (id: string) => void;
  onOpenBooking: (property: Property) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  properties,
  filters,
  onFilterChange,
  onResetFilters,
  onSelectProperty,
  onOpenBooking
}) => {
  const { t } = useLanguage();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply filters
  const filteredProperties = properties.filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.nearestUniversity.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.neighborhood && filters.neighborhood !== 'all') {
      if (p.neighborhood.toLowerCase() !== filters.neighborhood.toLowerCase()) return false;
    }
    if (filters.type && filters.type !== 'all') {
      if (p.type !== filters.type) return false;
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
      if (p.price > filters.maxPrice) return false;
    }
    if (filters.minPrice && filters.minPrice > 0) {
      if (p.price < filters.minPrice) return false;
    }
    if (filters.maxDistanceMinutes && filters.maxDistanceMinutes > 0) {
      if (p.campusMinutesWalk > filters.maxDistanceMinutes) return false;
    }
    return true;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'distance') return a.campusMinutesWalk - b.campusMinutesWalk;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 pb-20">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Catalogue 100% Vérifié</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#0B132B]">
            Trouve ton <span className="text-[#F59E0B]">logement idéal</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore les chambres et studios disponibles près de ton université.
          </p>
        </motion.div>

        {/* Top Search Bar & Mobile Filter Trigger */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between"
        >
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => onFilterChange({ query: e.target.value })}
              placeholder={t('hero_search_placeholder')}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#F59E0B] shadow-xs transition-all"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => onFilterChange({ query: '' })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsMobileFilterOpen(true)}
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              className="flex-1 justify-center"
            >
              {t('filters_title')}
            </Button>

            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
            >
              <option value="relevance">Pertinence</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="distance">Proximité campus</option>
            </select>
          </div>
        </motion.div>

        {/* Main Layout: Filters Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Filter Sidebar (Desktop) & Drawer (Mobile) */}
          <div className="lg:col-span-1">
            <FilterSheet
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={onResetFilters}
              totalResults={sortedProperties.length}
              isOpenMobile={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3 space-y-4">
            {/* Results header & count */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 pb-2 border-b border-stone-200">
              <div>
                <strong className="text-slate-900 font-bold">{sortedProperties.length}</strong> logement{sortedProperties.length > 1 ? 's' : ''} disponible{sortedProperties.length > 1 ? 's' : ''}
                {filters.neighborhood && filters.neighborhood !== 'all' && (
                  <span> à <strong className="text-slate-800">{filters.neighborhood}</strong></span>
                )}
              </div>

              <div className="hidden lg:flex items-center gap-2">
                <span className="text-slate-400">{t('sort_by')} :</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer text-xs"
                >
                  <option value="relevance">{t('sort_relevance')}</option>
                  <option value="price_asc">{t('sort_price_asc')}</option>
                  <option value="price_desc">{t('sort_price_desc')}</option>
                  <option value="distance">{t('sort_distance')}</option>
                  <option value="rating">{t('sort_rating')}</option>
                </select>
              </div>
            </div>

            {/* Listings list */}
            {sortedProperties.length === 0 ? (
              <EmptyState
                title={t('common_no_results')}
                description={t('common_no_results_desc')}
                actionLabel="Réinitialiser les filtres"
                onAction={onResetFilters}
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              >
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={onSelectProperty}
                    onBookNow={onOpenBooking}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

