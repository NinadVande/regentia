import React from 'react';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import {
  HeartPulse,
  Activity,
  Lightbulb,
  ShieldCheck,
  Compass,
  LineChart,
  Search,
  Globe2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Research',
  description: 'Explore the core research domains of REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, including clinical trials, medical innovation, evidence-based medicine, and scientific collaboration.',
};

export default function ResearchPage() {
  const researchSections = [
    {
      title: 'Healthcare Research',
      icon: HeartPulse,
      description: 'Investigating patient outcomes, care delivery pathways, and regional health indicators. Our healthcare research provides hospitals and policy makers with empirical data to optimize healthcare operations and diagnostic approaches.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <circle cx="100" cy="50" r="30" fill="currentColor" />
          <path d="M 85 50 H 115 M 100 35 V 65" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="3" />
        </svg>
      )
    },
    {
      title: 'Clinical Research',
      icon: Activity,
      description: 'Designing study protocols and coordinating observational and clinical registry studies. We implement strict oversight to collect raw clinical parameters, ensuring compliance with global clinical guidelines and Indian ICMR protocols.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <path d="M 20 50 L 50 50 L 60 20 L 70 80 L 80 40 L 90 60 L 100 50 L 180 50" fill="none" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2.5" />
        </svg>
      )
    },
    {
      title: 'Medical Innovation',
      icon: Lightbulb,
      description: 'Authoring validation protocols for digital health devices, patient monitors, and AI screening systems. We provide clinical validation feedback to ensure technological innovations meet rigid medical accuracy criteria.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <circle cx="100" cy="50" r="25" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2" fill="none" />
          <circle cx="100" cy="50" r="10" fill="currentColor" />
          <line x1="100" y1="10" x2="100" y2="90" stroke="rgba(0, 82, 204, 0.15)" strokeWidth="1.5" />
          <line x1="60" y1="50" x2="140" y2="50" stroke="rgba(0, 82, 204, 0.15)" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      title: 'Evidence-Based Medicine',
      icon: ShieldCheck,
      description: 'Translating clinical research findings into practical evidence guidelines. We analyze current medical litigations and therapeutics parameters to synthesize guidelines that reduce diagnostic errors and improve care safety.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <rect x="50" y="20" width="100" height="60" rx="6" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2" fill="none" />
          <path d="M 70 40 H 130 M 70 50 H 130 M 70 60 H 100" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: 'Research Methodology',
      icon: Compass,
      description: 'Formulating rigorous protocol structures, hypothesis generation models, and sample size calculations. We help academic and sponsor teams avoid standard methodological pitfalls, securing high internal validity.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <circle cx="100" cy="50" r="28" fill="none" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2" />
          <polygon points="100,32 108,55 100,50 92,55" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Healthcare Data Analysis',
      icon: LineChart,
      description: 'Applying biostatistics, multivariate analysis, regression modelling, and epidemiological data compilation. We structure complex datasets to extract meaningful trends, using verified statistical software libraries.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <path d="M 30 80 Q 70 20, 110 60 T 170 30" fill="none" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="110" cy="60" r="5" fill="currentColor" />
          <circle cx="170" cy="30" r="5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Systematic Investigation',
      icon: Search,
      description: 'Engaging in thorough, systematic reviews and meta-analyses to evaluate the efficacy of medical devices, diagnostic methods, or drug treatments by compiling and evaluating globally published evidence databases.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <circle cx="85" cy="45" r="18" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="2" fill="none" />
          <line x1="98" y1="58" x2="120" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Scientific Collaboration',
      icon: Globe2,
      description: 'Connecting regional healthcare setups, universities, and pharmaceutical sponsors to coordinate joint research panels, trials, and multicenter investigations. We establish trust-bound research alliances.',
      illustration: (
        <svg className="w-full h-24 text-regentia-blue/10 bg-slate-50/50 rounded-lg p-2 border border-slate-100" viewBox="0 0 200 100">
          <circle cx="60" cy="50" r="10" fill="currentColor" />
          <circle cx="140" cy="50" r="10" fill="currentColor" />
          <circle cx="100" cy="30" r="8" fill="rgba(0, 82, 204, 0.4)" />
          <path d="M 60 50 Q 100 30, 140 50 M 60 50 Q 100 70, 140 50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Gradients */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-regentia-blue blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Our Competencies</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Core Research Domains & Methodology
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Discover our primary clinical investigations, healthcare data synthesis frameworks, and medical research methodology.
          </p>
        </div>
      </section>

      {/* Core Research Content Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Areas of Activity</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight font-sans">
              Clinical Competence & Structured Investigations
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Regentia Health and Research coordinates structured scientific investigations focusing on evidence gaps, digital medical designs, and biostatistical analytics.
            </p>
          </div>

          {/* Research Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {researchSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="p-8 border-slate-100 bg-white hover:border-regentia-blue/20 hover:shadow-lg hover:shadow-regentia-blue/5 flex flex-col gap-6 group">
                  {/* Icon & Title */}
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-regentia-light rounded-xl text-regentia-navy group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-regentia-navy group-hover:text-regentia-blue transition-colors">
                      {section.title}
                    </h3>
                  </div>

                  {/* SVG Illustration Container */}
                  <div className="w-full">
                    {section.illustration}
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
                    {section.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimers & Ethics */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center flex flex-col items-center gap-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Statement of Scope</span>
          <h3 className="text-2xl font-bold text-regentia-navy">Research Integrity Notice</h3>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
            REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED acts exclusively as a primary and secondary healthcare investigation center. We do not offer academic tutoring, thesis writing, manuscript editing, journal placement services, or publication shortcuts. Our organization is committed to transparent research that conforms strictly to the Committee on Publication Ethics (COPE) guidelines and clinical research trial registration procedures.
          </p>
        </div>
      </section>
    </div>
  );
}
