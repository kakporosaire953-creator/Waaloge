import React from 'react';
import { ShieldCheck, Heart, Users, MapPin, CheckCircle, ArrowRight, Building, Award } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 sm:py-16 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            <span>Notre Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B132B] tracking-tight">
            Simplifier la vie étudiante, <span className="text-[#F59E0B]">une chambre à la fois</span>.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Waaloge est la première plateforme dédiée au logement étudiant, garantissant des logements vérifiés sur place, des visites sécurisées et zéro mauvaise surprise.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">100% Vérifié</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chaque chambre, studio et appartement fait l’objet d’une visite de certification physique par notre équipe terrain.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">Proche des campus</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Des logements stratégiquement situés pour réduire le temps de transport et vous permettre de vous concentrer sur vos études.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B]">Accompagnement humain</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              De la recherche initiale jusqu'à la remise des clés, notre équipe vous guide pas à pas.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#FFF8F0] p-8 rounded-3xl border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0B132B]">Prêt à trouver votre logement ?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Rejoignez plus de 5 000 étudiants ayant trouvé leur chez-soi avec Waaloge.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer shrink-0"
          >
            Explorer les logements
          </button>
        </div>

      </div>
    </div>
  );
};
