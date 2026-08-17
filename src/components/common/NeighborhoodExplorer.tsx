import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  MapPin, 
  Bus, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  Coins,
  Building2,
  Clock
} from 'lucide-react';

interface NeighborhoodExplorerProps {
  onSelectNeighborhood: (neighborhoodName: string) => void;
}

interface DistrictInfo {
  id: string;
  name: string;
  campusName: string;
  walkingTime: string;
  avgRent: string;
  safetyScore: string;
  vibe: string;
  image: string;
  description: string;
  busLines: string[];
}

export const NeighborhoodExplorer: React.FC<NeighborhoodExplorerProps> = ({ onSelectNeighborhood }) => {
  const { t, language } = useLanguage();

  const districts: DistrictInfo[] = [
    {
      id: 'zogona',
      name: 'Zogona',
      campusName: 'Université Joseph Ki-Zerbo (UJKZ)',
      walkingTime: '5-10 min à pied',
      avgRent: '45 000 - 85 000 FCFA',
      safetyScore: '9.4 / 10',
      vibe: 'Quartier étudiant vibrant, maquis, photocopieuses et bibliothèques.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=700&q=80',
      description: 'Le cœur battant de la vie universitaire. Parfait pour les étudiants qui souhaitent se rendre en amphi à pied et profiter d’une ambiance studieuse et dynamique.',
      busLines: ['Ligne 4 SOTRACO', 'Ligne 11', 'Taxis verts']
    },
    {
      id: 'ouaga2000',
      name: 'Ouaga 2000',
      campusName: 'Écoles Supérieures & Instituts privés',
      walkingTime: '15-20 min',
      avgRent: '90 000 - 180 000 FCFA',
      safetyScore: '9.8 / 10',
      vibe: 'Résidentiel, très sécurisé, moderne et calme.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
      description: 'Quartier haut de gamme et paisible, très prisé par les étudiants en masters et écoles de commerce pour son calme absolu et sa sécurité renforcée.',
      busLines: ['Ligne Express 2', 'Taxis privés']
    },
    {
      id: 'koulouba',
      name: 'Koulouba / Centre-Ville',
      campusName: 'Faculté de Médecine & Écoles de gestion',
      walkingTime: '10 min',
      avgRent: '60 000 - 120 000 FCFA',
      safetyScore: '9.2 / 10',
      vibe: 'Central, commerces, banques et transports directs.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
      description: 'Idéal pour être à proximité immédiate de tous les services administratifs, hôpitaux universitaires et centres culturels.',
      busLines: ['Ligne 1 SOTRACO', 'Ligne 3', 'Gare centrale']
    },
    {
      id: 'calavi',
      name: 'Abomey-Calavi / UAC',
      campusName: 'Campus Universitaire d’Abomey-Calavi',
      walkingTime: '8-12 min à pied',
      avgRent: '40 000 - 75 000 FCFA',
      safetyScore: '9.1 / 10',
      vibe: 'Immense campus, résidences récentes et commerces bon marché.',
      image: 'https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=700&q=80',
      description: 'Proximité immédiate du plus grand campus universitaire. Très grand choix de studios indépendants et de chambres bien ventilées.',
      busLines: ['Bus Campus UAC', 'Taxis collectifs', 'Zémidjans']
    }
  ];

  const [activeDistrict, setActiveDistrict] = useState<DistrictInfo>(districts[0]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('neighborhood_badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight">
            {t('neighborhood_title')} <span className="text-[#D97706]">{t('neighborhood_title_highlight')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            {t('neighborhood_subtitle')}
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {districts.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDistrict(d)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeDistrict.id === d.id
                  ? 'bg-[#0B132B] text-white shadow-md'
                  : 'bg-stone-100 hover:bg-stone-200 text-slate-700'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main District Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDistrict.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Photo & Overlay */}
          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] overflow-hidden bg-slate-900">
            <img
              src={activeDistrict.image}
              alt={activeDistrict.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs uppercase font-bold text-[#D97706] tracking-wider block">
                {activeDistrict.campusName}
              </span>
              <h3 className="text-2xl font-black">{activeDistrict.name}</h3>
            </div>
          </div>

          {/* Details & Metrics */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeDistrict.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <span className="text-[11px] text-slate-400 font-medium block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D97706]" />
                    À pied du campus
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block">
                    {activeDistrict.walkingTime}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <span className="text-[11px] text-slate-400 font-medium block flex items-center gap-1">
                    <Coins className="w-3 h-3 text-emerald-500" />
                    {t('neighborhood_avg_rent')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block">
                    {activeDistrict.avgRent}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-400 font-medium block flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    {t('neighborhood_safety')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 mt-1 block">
                    {activeDistrict.safetyScore}
                  </span>
                </div>
              </div>

              {/* Transit & Vibe */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Bus className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong>{t('neighborhood_transit')} :</strong> {activeDistrict.busLines.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span><strong>{t('neighborhood_vibe')} :</strong> {activeDistrict.vibe}</span>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => onSelectNeighborhood(activeDistrict.name)}
                className="px-5 py-2.5 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>{t('neighborhood_see_listings')}</span>
                <ArrowRight className="w-4 h-4 text-[#D97706]" />
              </button>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
