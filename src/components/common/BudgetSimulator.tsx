import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Calculator, Sparkles, TrendingDown, ArrowRight, ShieldCheck, Zap, Droplets, Utensils, Bus } from 'lucide-react';

interface BudgetSimulatorProps {
  onSearchBudget: (maxBudget: number) => void;
}

export const BudgetSimulator: React.FC<BudgetSimulatorProps> = ({ onSearchBudget }) => {
  const { t, language } = useLanguage();

  const [rent, setRent] = useState<number>(75000);
  const [utilities, setUtilities] = useState<number>(10000);
  const [food, setFood] = useState<number>(45000);
  const [transport, setTransport] = useState<number>(15000);

  const total = rent + utilities + food + transport;

  // Percentage calculations
  const rentPercent = Math.round((rent / total) * 100) || 0;
  const utilPercent = Math.round((utilities / total) * 100) || 0;
  const foodPercent = Math.round((food / total) * 100) || 0;
  const transPercent = Math.round((transport / total) * 100) || 0;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-[#0B132B] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden relative">
      {/* Decorative ambient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>{t('calc_badge')}</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          {t('calc_title')} <span className="text-[#F59E0B]">{t('calc_title_highlight')}</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          {t('calc_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 relative z-10 items-center">
        
        {/* Left: Sliders */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rent Slider */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                {t('calc_rent_label')}
              </span>
              <span className="text-sm font-black text-[#F59E0B]">
                {rent.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value))}
              className="w-full accent-[#F59E0B] cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
            />
          </div>

          {/* Utilities Slider */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                {t('calc_energy_label')}
              </span>
              <span className="text-sm font-black text-blue-400">
                {utilities.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="30000"
              step="1000"
              value={utilities}
              onChange={(e) => setUtilities(Number(e.target.value))}
              className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
            />
          </div>

          {/* Food Slider */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                {t('calc_food_label')}
              </span>
              <span className="text-sm font-black text-emerald-400">
                {food.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="100000"
              step="5000"
              value={food}
              onChange={(e) => setFood(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
            />
          </div>

          {/* Transport Slider */}
          <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                {t('calc_transport_label')}
              </span>
              <span className="text-sm font-black text-purple-400">
                {transport.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40000"
              step="2500"
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
            />
          </div>

        </div>

        {/* Right: Results Gauge & Action */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between space-y-6">
          
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              {t('calc_total_budget')}
            </span>
            
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {total.toLocaleString('fr-FR')} <span className="text-[#F59E0B] text-xl">FCFA</span>
            </div>

            {/* Distribution Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex mt-4 border border-white/10">
              <div style={{ width: `${rentPercent}%` }} className="bg-[#F59E0B] transition-all duration-300" title={`Loyer: ${rentPercent}%`} />
              <div style={{ width: `${utilPercent}%` }} className="bg-blue-400 transition-all duration-300" title={`Charges: ${utilPercent}%`} />
              <div style={{ width: `${foodPercent}%` }} className="bg-emerald-400 transition-all duration-300" title={`Repas: ${foodPercent}%`} />
              <div style={{ width: `${transPercent}%` }} className="bg-purple-400 transition-all duration-300" title={`Transport: ${transPercent}%`} />
            </div>

            {/* Legend Pills */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>Loyer ({rentPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>Charges ({utilPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Nourriture ({foodPercent}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Transport ({transPercent}%)</span>
              </div>
            </div>
          </div>

          {/* Student Pro Tip */}
          <div className="bg-[#F59E0B]/15 border border-[#F59E0B]/30 p-3.5 rounded-2xl text-xs space-y-1">
            <span className="font-bold text-[#F59E0B] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t('calc_tip_title')}
            </span>
            <p className="text-slate-200 text-[11px] leading-relaxed">
              {t('calc_tip_desc')}
            </p>
          </div>

          {/* Direct CTA */}
          <button
            type="button"
            onClick={() => onSearchBudget(rent)}
            className="w-full py-3 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B132B] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('calc_cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
