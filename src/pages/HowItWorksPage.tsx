import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { 
  Building2, 
  Search, 
  MapPin, 
  CalendarCheck2, 
  Key, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall,
  ArrowRight,
  Droplet,
  Zap
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenAssistant
}) => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: 'Je cherche mon futur logement',
      desc: 'Accède à des annonces rigoureusement vérifiées sur le terrain à Abomey-Calavi et Cotonou. Filtre par proximité avec ton campus (UAC, ENEAM, EPAC, ISM...), budget et critères essentiels (compteur SBEE individuel, eau de forage 24/7).',
      icon: Search
    },
    {
      step: '02',
      title: 'Je découvre le quartier et son ambiance',
      desc: 'Consulte nos fiches quartiers détaillées pour connaître les temps de marche jusqu’aux amphis, les lignes de bus ou de taxi clando, et les repères utiles pour la vie étudiante.',
      icon: MapPin
    },
    {
      step: '03',
      title: 'Je réserve ma visite sans frais',
      desc: 'Choisis le jour et le créneau horaire qui te conviennent parmi les disponibilités du propriétaire. La visite est 100% gratuite et encadrée. Aucun paiement préalable par Orange Money ou Wave n’est requis.',
      icon: CalendarCheck2
    },
    {
      step: '04',
      title: 'Je visite et je m’installe',
      desc: 'Rends-toi au point de rendez-vous convenu avec le bailleur. Vérifie l’état des lieux, signe ton contrat de bail et récupère tes clés en toute tranquillité.',
      icon: Key
    }
  ];

  const safetyRules = [
    "Ne versez JAMAIS d'argent pour 'réserver' une visite ou obtenir une clé avant d'avoir visité physiquement le logement.",
    "Exigez toujours un contrat de bail écrit et un reçu signé lors du versement de la caution.",
    "Vérifiez sur place le fonctionnement des robinets (pression d'eau) et le compteur électrique.",
    "En cas de doute ou de comportement inhabituel d'un interlocuteur, signalez-le immédiatement à l'équipe Waaloge."
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 pb-24 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>La méthode Waaloge</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Comment fonctionne Waaloge ?
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Nous avons repensé la recherche de logement étudiant pour la rendre transparente, sûre et accessible à tous les jeunes d’Afrique francophone.
        </p>
      </div>

      {/* 4 Steps Section */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center">
          Le parcours étudiant en 4 étapes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4 relative overflow-hidden group hover:border-slate-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-base">
                    {s.step}
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Anti-Scam Guide */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Charte de sécurité & Anti-arnaque</h3>
            <p className="text-xs text-slate-400">Ce que tout étudiant doit savoir avant de signer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safetyRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Un doute sur une annonce ou un comportement suspect ?
          </span>
          <a
            href="https://wa.me/221770000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            Contacter la permanence WhatsApp
          </a>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900">
          Prêt à trouver ton prochain chez-toi ?
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('explore')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explorer les logements vérifiés
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onOpenAssistant}
          >
            Poser une question à l'assistant
          </Button>
        </div>
      </div>
    </div>
  );
};
