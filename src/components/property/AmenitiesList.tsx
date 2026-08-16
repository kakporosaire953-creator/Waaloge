import React from 'react';
import { 
  Droplet, 
  Zap, 
  Wifi, 
  ShieldCheck, 
  ShowerHead, 
  CookingPot, 
  Wind, 
  Sparkles, 
  KeyRound, 
  Check, 
  Bike,
  Sun
} from 'lucide-react';

interface AmenitiesListProps {
  amenities: string[];
  waterSupply: string;
  electricityType: string;
}

export const AmenitiesList: React.FC<AmenitiesListProps> = ({
  amenities,
  waterSupply,
  electricityType
}) => {
  const getIconForAmenity = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('eau') || lower.includes('bâche') || lower.includes('surpresseur')) return <Droplet className="w-4 h-4 text-sky-500" />;
    if (lower.includes('woyofal') || lower.includes('compteur') || lower.includes('cie') || lower.includes('sbee')) return <Zap className="w-4 h-4 text-amber-500" />;
    if (lower.includes('wifi') || lower.includes('fibre') || lower.includes('internet')) return <Wifi className="w-4 h-4 text-indigo-500" />;
    if (lower.includes('gardien') || lower.includes('sécurité') || lower.includes('caméra') || lower.includes('digicode')) return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    if (lower.includes('douche') || lower.includes('eau') || lower.includes('sanitaire') || lower.includes('chauffe-eau')) return <ShowerHead className="w-4 h-4 text-blue-500" />;
    if (lower.includes('cuisine') || lower.includes('kitchenette') || lower.includes('plaque')) return <CookingPot className="w-4 h-4 text-orange-500" />;
    if (lower.includes('clim') || lower.includes('split') || lower.includes('brasseur')) return <Wind className="w-4 h-4 text-cyan-500" />;
    if (lower.includes('parking') || lower.includes('moto') || lower.includes('scooter')) return <Bike className="w-4 h-4 text-slate-600" />;
    if (lower.includes('balcon') || lower.includes('terrasse')) return <Sun className="w-4 h-4 text-amber-500" />;
    return <Check className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {amenities.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              {getIconForAmenity(item)}
            </div>
            <span className="leading-snug">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
