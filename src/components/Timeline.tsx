import React from 'react';
import { Lightbulb, FileText, Activity, BarChart2, ShieldCheck, Award } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Timeline() {
  const steps: TimelineStep[] = [
    {
      title: 'Research Concept',
      description: 'Identifying critical clinical and healthcare research questions based on current global needs and evidence gaps.',
      icon: Lightbulb,
    },
    {
      title: 'Study Planning',
      description: 'Designing comprehensive, ethical protocols, methodology structures, and seeking board approvals.',
      icon: FileText,
    },
    {
      title: 'Research Execution',
      description: 'Systematic clinical research, healthcare trials, data gathering, and expert collaboration.',
      icon: Activity,
    },
    {
      title: 'Analysis',
      description: 'Advanced healthcare data analytics, statistical modelling, evidence synthesis, and outcomes analysis.',
      icon: BarChart2,
    },
    {
      title: 'Scientific Validation',
      description: 'Strict peer review, research verification, and alignment with global clinical guidelines.',
      icon: ShieldCheck,
    },
    {
      title: 'Impact',
      description: 'Translating research findings into clinical solutions, publications, and practical healthcare policies.',
      icon: Award,
    },
  ];

  return (
    <div className="relative w-full">
      {/* Connector Line (Desktop Only) */}
      <div className="hidden lg:block absolute top-[40px] left-[5%] right-[5%] h-0.5 bg-slate-100" />
      
      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={step.title} className="flex flex-col items-center text-center group">
              {/* Icon Container */}
              <div className="h-[80px] w-[80px] rounded-full border border-slate-100 bg-white flex items-center justify-center shadow-sm relative transition-all duration-300 group-hover:border-regentia-blue/30 group-hover:shadow-md group-hover:shadow-regentia-blue/5">
                {/* Step Counter Indicator */}
                <span className="absolute -top-1 -right-1 bg-regentia-navy text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  0{index + 1}
                </span>
                <IconComponent className="h-7 w-7 text-regentia-navy group-hover:text-regentia-blue transition-colors duration-300" />
              </div>

              {/* Text Container */}
              <div className="mt-4 flex flex-col gap-2 px-2">
                <h4 className="font-semibold text-regentia-navy text-sm md:text-base leading-tight group-hover:text-regentia-blue transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
