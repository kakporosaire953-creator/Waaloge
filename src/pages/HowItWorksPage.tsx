import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/common/Button';
import { 
  Search, 
  MapPin, 
  CalendarCheck2, 
  Key, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall,
  ArrowRight
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (tab: string) => void;
  onOpenAssistant: () => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenAssistant
}) => {
  const { t, language } = useLanguage();

  const isEn = language === 'en';

  const steps = [
    {
      step: '01',
      title: isEn ? 'Find your future home' : 'Je cherche mon futur logement',
      desc: isEn 
        ? 'Browse verified listings inspected on-site. Filter by proximity to your university campus (UAC, ENEAM, EPAC...), budget, and key utilities (individual meter, 24/7 water).'
        : 'Accède à des annonces rigoureusement vérifiées sur le terrain à Abomey-Calavi, Cotonou ou Ouagadougou. Filtre par proximité avec ton campus (UAC, ENEAM, EPAC...), budget et critères essentiels (compteur individuel, eau 24/7).',
      icon: Search
    },
    {
      step: '02',
      title: isEn ? 'Explore the neighborhood & vibe' : 'Je découvre le quartier et son ambiance',
      desc: isEn 
        ? 'Check out detailed neighborhood guides with walking times to lecture halls, transit routes, and student lifestyle landmarks.'
        : 'Consulte nos fiches quartiers détaillées pour connaître les temps de marche jusqu’aux amphis, les lignes de transport et les repères utiles pour la vie étudiante.',
      icon: MapPin
    },
    {
      step: '03',
      title: isEn ? 'Book your visit' : 'Je réserve ma visite',
      desc: isEn 
        ? 'Select your preferred time slot from the landlord availability calendar. Choose the date and time that suits you best — a small booking fee applies to confirm your visit slot.'
        : 'Choisis le jour et le créneau horaire qui te conviennent parmi les disponibilités du propriétaire. Une petite contribution de réservation est requise pour confirmer ton créneau de visite.',
      icon: CalendarCheck2
    },
    {
      step: '04',
      title: isEn ? 'Visit & move in serenely' : 'Je visite et je m’installe',
      desc: isEn 
        ? 'Meet the landlord at the scheduled location. Verify property condition, sign your lease agreement, and pick up your keys with peace of mind.'
        : 'Rends-toi au point de rendez-vous convenu avec le bailleur. Vérifie l’état des lieux, signe ton contrat de bail et récupère tes clés en toute tranquillité.',
      icon: Key
    }
  ];

  const safetyRules = isEn ? [
    "NEVER pay cash or send unofficial off-platform money to street brokers before a visit.",
    "Always insist on a written lease agreement and a signed receipt when paying any deposit.",
    "Inspect water taps (pressure) and electricity meters on-site before signing.",
    "If you suspect fraud or suspicious behavior, report it immediately to the Waaloge team."
  ] : [
    "Ne versez JAMAIS d'argent liquide ou hors plateforme à des démarcheurs de rue pour visiter un logement.",
    "Exigez toujours un contrat de bail écrit et un reçu signé lors du versement de la caution.",
    "Vérifiez sur place le fonctionnement des robinets (pression d'eau) et le compteur électrique.",
    "En cas de doute ou de comportement inhabituel d'un interlocuteur, signalez-le immédiatement à l'équipe Waaloge."
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 sm:py-16 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 pb-24">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{isEn ? 'The Waaloge Guarantee' : 'La méthode Waaloge'}</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#0B132B] tracking-tight leading-tight">
            {isEn ? 'How does ' : 'Comment fonctionne '}
            <span className="text-[#D97706]">{isEn ? 'Waaloge work?' : 'Waaloge ?'}</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            {isEn 
              ? 'We reinvented student housing search to make it transparent, secure, and accessible to every student across West Africa.'
              : 'Nous avons repensé la recherche de logement étudiant pour la rendre transparente, sûre et accessible à tous les jeunes d’Afrique francophone.'}
          </p>
        </motion.div>

        {/* 4 Steps Section */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          <h2 className="font-editorial text-2xl sm:text-4xl text-[#0B132B] text-center">
            {isEn ? 'The Student Journey in ' : 'Le parcours étudiant en '}
            <span className="text-[#D97706]">{isEn ? '4 Simple Steps' : '4 étapes'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-stone-200 p-7 shadow-xs space-y-4 relative overflow-hidden group hover:border-amber-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-[#D97706] flex items-center justify-center font-editorial text-xl shadow-xs">
                      {s.step}
                    </div>
                    <div className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100 text-slate-500">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 leading-snug">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trust & Anti-Scam Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0B132B] rounded-[2rem] p-7 sm:p-12 text-white space-y-8 shadow-2xl border border-slate-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-slate-950 flex items-center justify-center font-bold shadow-md">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                {isEn ? 'Safety & Anti-Scam Charter' : 'Charte de sécurité & Anti-arnaque'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {isEn ? 'Essential guidelines before signing any lease' : 'Ce que tout étudiant doit savoir avant de signer'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
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

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              {isEn ? 'Need help or suspicious about a listing?' : 'Un doute sur une annonce ou un comportement suspect ?'}
            </span>
            <a
              href="https://wa.me/22997000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isEn ? 'Contact WhatsApp Support 24/7' : 'Contacter la permanence WhatsApp'}</span>
            </a>
          </div>
        </motion.div>

        {/* CTA Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 pt-4"
        >
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B132B]">
            {isEn ? 'Ready to find your student home?' : 'Prêt à trouver ton prochain chez-toi ?'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('explore')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isEn ? 'Explore Verified Housing' : 'Explorer les logements vérifiés'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenAssistant}
            >
              {isEn ? 'Ask AI Student Assistant' : "Poser une question à l'assistant"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
