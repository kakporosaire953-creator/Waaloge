import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  PhoneCall, 
  ShieldCheck, 
  Bot, 
  User as UserIcon,
  HelpCircle,
  Clock
} from 'lucide-react';

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, propertyId?: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isNegotiationWarning?: boolean;
  time: string;
}

export const AssistantDrawer: React.FC<AssistantDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_01',
      sender: 'bot',
      text: "Bonjour ! Je suis ton conseiller étudiant Waaloge. Je peux t'aider à comprendre comment réserver une visite, t'expliquer le fonctionnement de l'eau et de l'électricité (Woyofal) ou te guider vers les quartiers proches de ton université.",
      time: 'Maintenant'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "Comment réserver une visite ?",
    "C'est quoi le compteur Woyofal ?",
    "Y a-t-il des frais d'agence cachés ?",
    "Puis-je négocier le prix du loyer ?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let botResponse = "";
      let isNegWarning = false;

      // Negotiation detection (MANDATORY RULE)
      if (
        lower.includes('négocier') || 
        lower.includes('reduction') || 
        lower.includes('rabais') || 
        lower.includes('moins cher') || 
        lower.includes('diminuer le prix') ||
        lower.includes('discuter le prix') ||
        lower.includes('négociation')
      ) {
        isNegWarning = true;
        botResponse = "Waaloge n'effectue aucune négociation de prix automatique à la place du propriétaire. Les tarifs affichés sont fixés par les bailleurs. Pour formuler une offre ou discuter de conditions particulières (période d'essai, modalité de paiement), nous t'orientons vers l'échange direct avec le gestionnaire sur WhatsApp.";
      } else if (lower.includes('comment réserver') || lower.includes('réservation') || lower.includes('visite')) {
        botResponse = "Pour réserver une visite : 1) Sélectionne le logement qui t'intéresse, 2) Clique sur 'Réserver une visite gratuite', 3) Choisis le jour et l'heure de ton choix, 4) Valide tes coordonnées. Tu recevras une confirmation par SMS et WhatsApp dès que le bailleur valide !";
      } else if (lower.includes('woyofal') || lower.includes('compteur') || lower.includes('électricité')) {
        botResponse = "Le compteur Woyofal est le système de prépaiement d'électricité de la Senelec (Sénégal). Avec un compteur individuel, tu recharges selon ta consommation sans litige avec d'autres locataires. Chaque fiche logement Waaloge précise s'il s'agit d'un compteur individuel ou partagé.";
      } else if (lower.includes('frais') || lower.includes('payer') || lower.includes('avance') || lower.includes('arnaque')) {
        botResponse = "Sur Waaloge, TOUTES les visites sont 100% GRATUITES. Aucun propriétaire ni intermédiaire n'a le droit de te demander de l'argent avant la visite physique et la signature en bonne et due forme d'un contrat de bail.";
      } else if (lower.includes('quartier') || lower.includes('ucad') || lower.includes('campus')) {
        botResponse = "Autour de l'UCAD à Dakar, les quartiers les plus prisés sont Point E et Fann (5 à 10 min à pied, très calmes), ainsi que Fass et Médina (très proches et plus économiques). À Abidjan, Cocody Danga est le secteur idéal pour l'UFHB.";
      } else {
        botResponse = "Waaloge est là pour simplifier ton installation étudiante. Tu peux explorer nos annonces vérifiées, filtrer par quartier et budget, et réserver un créneau de visite en quelques clics sans intermédiaire informel.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg_bot_${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          isNegotiationWarning: isNegWarning,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{t('assistant_title')}</h3>
              <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Conseils & orientation étudiante
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200/80 overflow-x-auto flex gap-1.5 shrink-0">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                }`}
              >
                <p>{m.text}</p>

                {/* WhatsApp redirect button if negotiation detected */}
                {m.isNegotiationWarning && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <a
                      href="https://wa.me/221770000000?text=Bonjour,%20je%20souhaite%20discuter%20des%20modalit%C3%A9s%20pour%20un%20logement%20Waaloge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {t('assistant_cta_whatsapp')}
                    </a>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 w-fit text-slate-400 text-xs">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('assistant_input_placeholder')}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors shrink-0"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
