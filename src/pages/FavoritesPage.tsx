import React from 'react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useBookings } from '../contexts/BookingsContext';
import { PropertyCard } from '../components/property/PropertyCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Heart, Search } from 'lucide-react';

interface FavoritesPageProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  properties,
  onSelectProperty,
  onNavigate
}) => {
  const { t } = useLanguage();
  const { favorites } = useBookings();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 sm:py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 pb-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200"
        >
          <div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#0B132B] flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 shrink-0" />
              <span>{t('favorites_title')}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {favoriteProperties.length} logement{favoriteProperties.length > 1 ? 's' : ''} sauvegardé{favoriteProperties.length > 1 ? 's' : ''} dans ta liste
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('explore')}
              leftIcon={<Search className="w-4 h-4" />}
            >
              Explorer d'autres logements
            </Button>
          )}
        </motion.div>

      {favoriteProperties.length === 0 ? (
        <EmptyState
          title={t('favorites_empty_title')}
          description={t('favorites_empty_desc')}
          actionLabel="Découvrir les logements"
          onAction={() => onNavigate('explore')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favoriteProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};
