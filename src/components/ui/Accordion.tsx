'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item) => {
        const isOpen = openItem === item.id;
        return (
          <div
            key={item.id}
            className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:border-slate-200"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 flex justify-between items-center text-left font-medium text-regentia-navy hover:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-sm md:text-base font-semibold">{item.question}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-regentia-blue' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] border-t border-slate-50' : 'max-h-0'
              }`}
            >
              <div className="px-6 py-4.5 text-sm md:text-base text-slate-500 leading-relaxed bg-white">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
