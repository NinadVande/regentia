import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const textColorClass = light ? 'text-white' : 'text-regentia-navy';
  const barColorClass = light ? 'bg-white' : 'bg-regentia-navy';

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Top Text 'Regentia' */}
      <div className="relative pb-1">
        <span className={`text-2xl md:text-3xl font-semibold tracking-tight ${textColorClass} font-sans relative inline-block`}>
          Regentia
          {/* Custom thick underline under "Rege" */}
          <span className={`absolute bottom-0 left-0 w-[55%] h-[3px] md:h-[3.5px] ${barColorClass}`}></span>
        </span>
      </div>
      {/* Bottom Text 'HEALTH & RESEARCH' */}
      <div className={`text-[8.5px] md:text-[9.5px] font-bold tracking-[0.18em] ${textColorClass} uppercase self-end -mt-0.5 pl-6 font-sans`}>
        Health & Research
      </div>
    </div>
  );
}
