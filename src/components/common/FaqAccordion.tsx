import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

interface FaqItem {
  id: string;
  qKey: 'faq_q1' | 'faq_q2' | 'faq_q3' | 'faq_q4';
  aKey: 'faq_a1' | 'faq_a2' | 'faq_a3' | 'faq_a4';
}

export const FaqAccordion: React.FC = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('1');

  const items: FaqItem[] = [
    { id: '1', qKey: 'faq_q1', aKey: 'faq_a1' },
    { id: '2', qKey: 'faq_q2', aKey: 'faq_a2' },
    { id: '3', qKey: 'faq_q3', aKey: 'faq_a3' },
    { id: '4', qKey: 'faq_q4', aKey: 'faq_a4' },
  ];

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border rounded-2xl transition-all ${
              isOpen
                ? 'bg-white border-amber-200 shadow-md ring-1 ring-amber-100'
                : 'bg-stone-50/70 hover:bg-stone-50 border-stone-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <span className={`text-sm sm:text-base font-bold ${
                isOpen ? 'text-[#0B132B]' : 'text-slate-700'
              }`}>
                {t(item.qKey)}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                isOpen ? 'rotate-180 bg-amber-100 text-[#D97706]' : 'bg-stone-200/80 text-slate-500'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100/80 mt-1">
                    {t(item.aKey)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
