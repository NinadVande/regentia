import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the professional training courses and research support programs offered by REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, Nagpur.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Network Meta-Analysis Course',
      description: 'Learn advanced methodologies for conducting and interpreting Network Meta-Analysis using evidence-based research practices. Focuses on multi-treatment comparisons, statistical models, and evidence rank logic.',
      fee: '₹10,000',
      iconName: 'Network',
      features: [
        'Multi-treatment comparison modeling',
        'Direct and indirect evidence synthesis',
        'Bayesian and Frequentist approaches',
        'Practical biostatistical datasets'
      ]
    },
    {
      title: 'Meta-Analysis Course',
      description: 'Comprehensive training on systematic reviews, statistical methods, and pairwise meta-analysis for healthcare research. Perfect for medical students and clinicians seeking high-level evidence generation.',
      fee: '₹10,000',
      iconName: 'BarChart3',
      features: [
        'Systematic review protocol authoring',
        'Forest plots & heterogeneity models',
        'Risk of bias evaluations',
        'Publication bias calculations'
      ]
    },
    {
      title: 'Research Course',
      description: 'Learn research methodology, study design, literature review, protocol development, and evidence-based healthcare research. Built to establish a strong scientific foundation for clinical investigators.',
      fee: '₹10,000',
      iconName: 'BookOpen',
      features: [
        'Observational vs Experimental designs',
        'Ethical protocol design (Declaration of Helsinki)',
        'Sample size calculations',
        'Clinical registry submissions'
      ]
    },
    {
      title: 'Research Support',
      description: 'End-to-end research guidance, including study planning, data analysis, methodology consultation, and research mentoring. Structured for departments, medical colleges, and trial sponsors.',
      fee: '₹10,000',
      iconName: 'HelpCircle',
      features: [
        'Custom protocol feasibility studies',
        'Statistical analysis plan (SAP) design',
        'Clinical registry compliance oversight',
        'Multidisciplinary clinical mentoring'
      ]
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
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Education & Guidance</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Professional Programs & Research Support
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Acquire advanced evidence synthesis skills or seek methodology oversight from our expert medical research investigators.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Our Offerings</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight font-sans">
              Rigorous Training for Clinical Researchers
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Our courses and support services are designed to satisfy international scientific standards, establishing valid clinical methodologies.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                fee={service.fee}
                iconName={service.iconName}
                features={service.features}
                isDetailed={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Program Disclaimers & Ethics statement */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center flex flex-col items-center gap-6">
          <div className="p-3 bg-white rounded-full border border-slate-100 shadow-sm text-regentia-navy">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-regentia-navy">Academic Integrity Notice</h3>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
            Our courses focus strictly on data analysis methodologies, research protocols, and statistical tools. REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED does not write manuscripts, author theses, provide academic certificates of convenience, or provide journal publication guarantees. All training materials are authored to develop independent scientific competency in accordance with regional Indian regulatory standards and global GCP ethics guidelines.
          </p>
        </div>
      </section>
    </div>
  );
}
