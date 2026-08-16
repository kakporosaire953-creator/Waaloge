import React, { useState } from 'react';
import { Property, CityId, PropertyType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingsContext';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  CalendarCheck, 
  MessageSquareHeart, 
  Lock, 
  Heart, 
  ArrowRight,
  TrendingUp,
  Wifi,
  ShowerHead,
  BedDouble,
  Droplets,
  DoorOpen,
  UtensilsCrossed,
  Layers,
  Sparkles
} from 'lucide-react';

// Hero & CTA student portrait image paths
const HERO_STUDENT_IMG = 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1000&q=85';
const CTA_STUDENT_IMG = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=85';

interface HomePageProps {
  properties: Property[];
  selectedCity: CityId;
  onSelectProperty: (id: string) => void;
  onNavigate: (tab: string, propertyId?: string) => void;
  onSearch: (params: { query?: string; neighborhood?: string; type?: PropertyType | 'all'; minPrice?: number; maxPrice?: number }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  selectedCity,
  onSelectProperty,
  onNavigate,
  onSearch
}) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useBookings();

  // Search Bar Form State
  const [searchLocation, setSearchLocation] = useState('');
  const [searchMinBudget, setSearchMinBudget] = useState('50000');
  const [searchMaxBudget, setSearchMaxBudget] = useState('150000');
  const [searchType, setSearchType] = useState<PropertyType | 'all'>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query: searchLocation || undefined,
      type: searchType,
      minPrice: searchMinBudget ? parseInt(searchMinBudget) : undefined,
      maxPrice: searchMaxBudget ? parseInt(searchMaxBudget) : undefined
    });
    onNavigate('explore');
  };

  const handlePropertyClick = (id: string) => {
    if (!isAuthenticated) {
      onNavigate('auth', id);
    } else {
      onSelectProperty(id);
    }
  };

  // 4 popular properties (matches the image)
  const popularProperties = properties.slice(0, 4);

  return (
    <div className="bg-[#FAF9F6] text-slate-900 overflow-x-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (EXACT MATCH WITH DESIGN) */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Pill, Subtitle & Search Console */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-semibold tracking-tight border border-blue-100">
              <span>Logement étudiant en toute confiance</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[#0B132B] tracking-tight leading-[1.12]">
              Ton prochain<br />
              chez-toi<br />
              <span className="text-[#F59E0B]">commence ici.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Trouve un <strong className="font-semibold text-slate-900">logement</strong> adapté à ta vie étudiante, découvre ton futur quartier et réserve ta visite avant même d'arriver.
            </p>

            {/* FLOATING SEARCH BAR CARD (EXACT 4 FIELDS + BUTTON) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-100 mt-6">
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Field 1: Quartier */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-900 block">
                      Quartier
                    </label>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      placeholder="Ex: Zogona, Ouaga 2000"
                      className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
                    />
                  </div>

                  {/* Field 2: Budget min. */}
                  <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-3">
                    <label className="text-xs font-bold text-slate-900 block">
                      Budget min.
                    </label>
                    <select
                      value={searchMinBudget}
                      onChange={(e) => setSearchMinBudget(e.target.value)}
                      className="w-full text-xs sm:text-sm text-slate-700 bg-transparent border-0 p-0 focus:ring-0 focus:outline-none cursor-pointer"
                    >
                      <option value="0">0 FCFA</option>
                      <option value="30000">30 000 FCFA</option>
                      <option value="50000">50 000 FCFA</option>
                      <option value="75000">75 000 FCFA</option>
                    </select>
                  </div>

                  {/* Field 3: Budget max. */}
                  <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-3">
                    <label className="text-xs font-bold text-slate-900 block">
                      Budget max.
                    </label>
                    <select
                      value={searchMaxBudget}
                      onChange={(e) => setSearchMaxBudget(e.target.value)}
                      className="w-full text-xs sm:text-sm text-slate-700 bg-transparent border-0 p-0 focus:ring-0 focus:outline-none cursor-pointer"
                    >
                      <option value="100000">100 000 FCFA</option>
                      <option value="150000">150 000 FCFA</option>
                      <option value="200000">200 000 FCFA</option>
                      <option value="300000">300 000 FCFA</option>
                    </select>
                  </div>

                  {/* Field 4: Type de logement */}
                  <div className="space-y-1 sm:border-l sm:border-slate-100 sm:pl-3">
                    <label className="text-xs font-bold text-slate-900 block">
                      Type de logement
                    </label>
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value as PropertyType | 'all')}
                      className="w-full text-xs sm:text-sm text-slate-700 bg-transparent border-0 p-0 focus:ring-0 focus:outline-none cursor-pointer truncate"
                    >
                      <option value="all">Chambre, Studio, Appart...</option>
                      <option value="studio">Studio</option>
                      <option value="chambre">Chambre</option>
                      <option value="appartement">Appartement</option>
                      <option value="colocation">Colocation</option>
                    </select>
                  </div>

                </div>

                {/* Bottom Row / Search CTA Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0B132B] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-white" />
                    <span>Rechercher</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Social Proof Stack (Avatars + 5 000 étudiants) */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80"
                  alt="Student 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Student 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80"
                  alt="Student 3"
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Rejoint par plus de <strong className="font-bold text-[#0B132B] underline decoration-[#F59E0B]">5 000</strong> étudiants à travers le pays
              </p>
            </div>

          </div>

          {/* Right Column: Hero Portrait Mask with Arched Top & Floating Badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-t-[180px] rounded-b-[40px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src={HERO_STUDENT_IMG}
                alt="Étudiant souriant Waaloge"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* FLOATING STATS BADGE (Visites réservées 12 450+ 📈) */}
            <div className="absolute bottom-6 right-0 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Visites réservées
                </span>
                <span className="text-lg sm:text-xl font-black text-[#0B132B] block tracking-tight">
                  12 450+
                </span>
              </div>
              
              {/* Green trend line chart icon */}
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: COMMENT ÇA MARCHE (4 ÉTAPES) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                COMMENT ÇA MARCHE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight">
                Un parcours simple en <span className="text-[#F59E0B]">4 étapes</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Waaloge te guide à chaque étape pour trouver et visiter le logement qui te correspond, en toute sérénité.
            </p>
          </div>

          {/* 4 Connected Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1: Je cherche */}
            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200/60 shadow-xs hover:shadow-md transition-all relative flex flex-col items-start text-left">
              {/* Step Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                <div className="relative">
                  <Search className="w-6 h-6 text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
                </div>
              </div>

              {/* Step Number Tag */}
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold mb-3">
                01
              </span>

              <h3 className="text-base font-bold text-[#0B132B] mb-2">
                Je cherche
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Je renseigne mon quartier, mon budget et le type de logement que je recherche.
              </p>
            </div>

            {/* Step 2: Je découvre */}
            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200/60 shadow-xs hover:shadow-md transition-all relative flex flex-col items-start text-left">
              {/* Step Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                <div className="relative">
                  <Layers className="w-6 h-6 text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
                </div>
              </div>

              {/* Step Number Tag */}
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold mb-3">
                02
              </span>

              <h3 className="text-base font-bold text-[#0B132B] mb-2">
                Je découvre
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Je consulte les photos, les équipements, les avis et la distance avec mon campus.
              </p>
            </div>

            {/* Step 3: Je réserve */}
            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200/60 shadow-xs hover:shadow-md transition-all relative flex flex-col items-start text-left">
              {/* Step Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                <div className="relative">
                  <CalendarCheck className="w-6 h-6 text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
                </div>
              </div>

              {/* Step Number Tag */}
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold mb-3">
                03
              </span>

              <h3 className="text-base font-bold text-[#0B132B] mb-2">
                Je réserve
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Je choisis un créneau disponible pour visiter le logement sans me déplacer.
              </p>
            </div>

            {/* Step 4: Je m'installe */}
            <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-stone-200/60 shadow-xs hover:shadow-md transition-all relative flex flex-col items-start text-left">
              {/* Step Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-2xs">
                <div className="relative">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full" />
                </div>
              </div>

              {/* Step Number Tag */}
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold mb-3">
                04
              </span>

              <h3 className="text-base font-bold text-[#0B132B] mb-2">
                Je m'installe
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Je rencontre le logement dans la réalité et je poursuis mon installation sereinement.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: LOGEMENTS POPULAIRES (EXACT 4 CARDS AS IN THE MOCKUP) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              LOGEMENTS POPULAIRES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight">
              Des logements qui pourraient <span className="text-[#F59E0B]">te correspondre</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>Voir tous les logements</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProperties.map((prop, idx) => {
            const isFav = isFavorite(prop.id);
            return (
              <div
                key={prop.id}
                onClick={() => handlePropertyClick(prop.id)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Status Badge */}
                  <div className="absolute top-3 left-3">
                    {prop.availability === 'disponible' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-xs">
                        Disponible
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#F59E0B] text-white text-[11px] font-bold shadow-xs">
                        Bientôt libre
                      </span>
                    )}
                  </div>

                  {/* Top Right Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prop.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white shadow-xs transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : ''}`} />
                  </button>

                  {/* Bottom Distance Pill (e.g. 📍 1,2 km) */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-bold text-slate-800 shadow-xs">
                      <MapPin className="w-3 h-3 text-[#F59E0B]" />
                      {idx === 0 && '1,2 km'}
                      {idx === 1 && '2,5 km'}
                      {idx === 2 && '3,1 km'}
                      {idx === 3 && '1,9 km'}
                      {idx > 3 && `${prop.campusMinutesWalk} min`}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B132B] truncate group-hover:text-blue-600 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {prop.neighborhood}
                    </p>

                    {/* Price */}
                    <div className="mt-3">
                      <span className="text-base sm:text-lg font-black text-blue-700">
                        {prop.price.toLocaleString('fr-FR')} {prop.currency}
                      </span>
                      <span className="text-xs text-slate-500"> / mois</span>
                    </div>
                  </div>

                  {/* Amenities Row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    {idx === 0 && (
                      <>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-slate-400" /> Studio
                        </span>
                        <span className="flex items-center gap-1">
                          <ShowerHead className="w-3.5 h-3.5 text-slate-400" /> 1 SDB
                        </span>
                        <span className="flex items-center gap-1">
                          <Wifi className="w-3.5 h-3.5 text-slate-400" /> Wi-Fi
                        </span>
                      </>
                    )}

                    {idx === 1 && (
                      <>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-slate-400" /> Chambre
                        </span>
                        <span className="flex items-center gap-1">
                          <ShowerHead className="w-3.5 h-3.5 text-slate-400" /> 1 SDB
                        </span>
                        <span className="flex items-center gap-1">
                          <Droplets className="w-3.5 h-3.5 text-slate-400" /> Eau 24h/24
                        </span>
                      </>
                    )}

                    {idx === 2 && (
                      <>
                        <span className="flex items-center gap-1">
                          <DoorOpen className="w-3.5 h-3.5 text-slate-400" /> 2 pièces
                        </span>
                        <span className="flex items-center gap-1">
                          <ShowerHead className="w-3.5 h-3.5 text-slate-400" /> 2 SDB
                        </span>
                        <span className="flex items-center gap-1">
                          <UtensilsCrossed className="w-3.5 h-3.5 text-slate-400" /> Cuisine
                        </span>
                      </>
                    )}

                    {idx === 3 && (
                      <>
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-3.5 h-3.5 text-slate-400" /> Studio
                        </span>
                        <span className="flex items-center gap-1">
                          <ShowerHead className="w-3.5 h-3.5 text-slate-400" /> 1 SDB
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Balcon
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: VALUE PROPOSITIONS (4 PILLARS) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
            
            {/* Pillar 1 */}
            <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] mb-1">
                Logements vérifiés
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tous les logements sont vérifiés par notre équipe pour ta sécurité.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] mb-1">
                Visites organisées
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Réserve en ligne et choisis le créneau qui te convient.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <MessageSquareHeart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] mb-1">
                Accompagnement humain
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Notre équipe est disponible pour t'accompagner à chaque étape.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="pt-4 sm:pt-0 sm:px-4 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] mb-1">
                Paiement sécurisé
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paiement mobile money ou en main propre, validé par l'admin.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: TESTIMONIALS (CE QUE DISENT LES ÉTUDIANTS) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              ILS NOUS FONT CONFIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight">
              Ce que disent <span className="text-[#F59E0B]">les étudiants</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>Voir tous les avis</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Review 1: Aminata K. */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-3xl text-blue-500 font-serif leading-none block mb-3">“</span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Grâce à Waaloge, j'ai trouvé mon studio avant même d'arriver à Ouaga. La visite s'est très bien passée et le logement est exactement comme sur les photos !
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Aminata K."
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">Aminata K.</h4>
                  <p className="text-[11px] text-slate-400">Étudiante en Génie Civil</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                <span className="text-[#F59E0B]">★★★★★</span>
                <span>5.0</span>
              </div>
            </div>
          </div>

          {/* Review 2: Issa T. */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-3xl text-blue-500 font-serif leading-none block mb-3">“</span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Le processus de réservation est simple et l'équipe est vraiment réactive. Je recommande à tous les nouveaux étudiants !
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Issa T."
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">Issa T.</h4>
                  <p className="text-[11px] text-slate-400">Étudiant en Informatique</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                <span className="text-[#F59E0B]">★★★★★</span>
                <span>5.0</span>
              </div>
            </div>
          </div>

          {/* Review 3: Mariam D. */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-3xl text-blue-500 font-serif leading-none block mb-3">“</span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                J'ai pu comparer plusieurs logements et choisir celui qui correspondait à mon budget et mon emplacement. Très bonne expérience.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Mariam D."
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">Mariam D.</h4>
                  <p className="text-[11px] text-slate-400">Étudiante en Droit</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                <span className="text-[#F59E0B]">★★★★★</span>
                <span>5.0</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: BOTTOM CALL TO ACTION BANNER (PRÊT À TROUVER TON PROCHAIN CHEZ-TOI ?) */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFF8F0] rounded-3xl p-6 sm:p-10 border border-amber-100 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B132B] tracking-tight leading-tight">
                Prêt à trouver ton<br />
                prochain <span className="text-[#F59E0B]">chez-toi</span> ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Rejoins des milliers d'étudiants et réserve ta visite dès aujourd'hui.
              </p>
            </div>

            {/* Center: Student Cutout Image */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-40 sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-amber-50/50">
                <img
                  src={CTA_STUDENT_IMG}
                  alt="Étudiante avec sac et téléphone"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="w-full py-3 px-6 bg-[#0B132B] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-center"
              >
                Explorer les logements
              </button>

              <button
                type="button"
                onClick={() => onNavigate('how-it-works')}
                className="w-full py-3 px-6 bg-white hover:bg-slate-50 text-[#0B132B] border border-[#0B132B]/30 text-xs sm:text-sm font-bold rounded-xl transition-all active:scale-98 cursor-pointer text-center"
              >
                Comment ça marche ?
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
