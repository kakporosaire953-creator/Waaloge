import React, { useState, useRef, useEffect } from 'react';
import { CITIES } from '../../data/neighborhoods';
import { CityId } from '../../types';
import { MapPin, ChevronDown, Check } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: CityId;
  onSelectCity: (cityId: CityId) => void;
  variant?: 'header' | 'search';
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onSelectCity,
  variant = 'header'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCity = CITIES.find(c => c.id === selectedCity) || CITIES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-xl text-left transition-all ${
          variant === 'header'
            ? 'px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 text-xs sm:text-sm font-semibold border border-slate-200/80'
            : 'w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 shadow-xs'
        }`}
        aria-expanded={isOpen}
      >
        <MapPin className={`shrink-0 ${variant === 'header' ? 'w-3.5 h-3.5 text-amber-600' : 'w-4 h-4 text-amber-600'}`} />
        <span className="truncate">{currentCity.name}, {currentCity.country}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-auto" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-40 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Choisir la ville d'études
          </div>
          {CITIES.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => {
                onSelectCity(city.id);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                city.id === selectedCity ? 'font-bold text-amber-900 bg-amber-50/60' : 'text-slate-700'
              }`}
            >
              <div>
                <div className="font-semibold">{city.name}</div>
                <div className="text-[11px] text-slate-400">{city.country} • {city.currency}</div>
              </div>
              {city.id === selectedCity && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
