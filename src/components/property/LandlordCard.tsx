import React from 'react';
import { Landlord } from '../../types';
import { ShieldCheck, Clock, CheckCircle2, PhoneCall } from 'lucide-react';

interface LandlordCardProps {
  landlord: Landlord;
  onOpenWhatsApp?: () => void;
}

export const LandlordCard: React.FC<LandlordCardProps> = ({ landlord, onOpenWhatsApp }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-center gap-3.5">
        <div className="relative">
          {landlord.avatar ? (
            <img
              src={landlord.avatar}
              alt={landlord.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center">
              {landlord.name.charAt(0)}
            </div>
          )}
          {landlord.verified && (
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white" title="Identité vérifiée">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
            {landlord.name}
          </h4>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {landlord.verifiedBadgeText}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Taux de réponse</span>
          <span className="font-bold text-slate-800 text-sm">{landlord.responseRate}%</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-400 block text-[11px]">Temps de réponse</span>
          <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {landlord.responseTime}
          </span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
        Les visites organisées sur Waaloge sont encadrées sans intermédiaire informel. Aucun paiement n'est exigé avant la visite.
      </div>
    </div>
  );
};
