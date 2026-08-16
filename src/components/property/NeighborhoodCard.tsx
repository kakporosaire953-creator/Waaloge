import React from 'react';
import { MapPin, Bus, Footprints, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';

interface NeighborhoodCardProps {
  neighborhood: string;
  distanceToCampus: string;
  transportInfo: string[];
  safetyNotes: string;
  nearestUniversity: string;
}

export const NeighborhoodCard: React.FC<NeighborhoodCardProps> = ({
  neighborhood,
  distanceToCampus,
  transportInfo,
  safetyNotes,
  nearestUniversity
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Quartier & Environnement</span>
          </div>
          <h4 className="text-base font-bold text-slate-900">{neighborhood}</h4>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secteur étudiant sûr
          </span>
        </div>
      </div>

      {/* Proximity highlight */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
          <Footprints className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-900">{distanceToCampus}</div>
          <div className="text-xs text-slate-600">Établissement référent : {nearestUniversity}</div>
        </div>
      </div>

      {/* Transport lines */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Bus className="w-3.5 h-3.5 text-slate-500" />
          <span>Liaisons & Transports</span>
        </div>
        <ul className="space-y-1.5">
          {transportInfo.map((info, idx) => (
            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span>{info}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety notes */}
      {safetyNotes && (
        <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
          <span className="font-semibold text-slate-800">Conseil d'installation :</span>
          <p className="leading-relaxed">{safetyNotes}</p>
        </div>
      )}
    </div>
  );
};
