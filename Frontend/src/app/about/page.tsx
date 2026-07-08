import React from 'react';
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card';
import FounderCard from '@/components/FounderCard';
import { 
  Building, 
  History, 
  Target, 
  Eye, 
  Compass, 
  Scale, 
  Award, 
  Users, 
  ActivitySquare,
  ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, our history, mission, vision, core values, scientific approach, and leadership team.',
};

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Scientific Integrity',
      description: 'We adhere strictly to validated scientific methodologies and raw data accuracy, ensuring all findings represent reproducible truths.',
      icon: ShieldCheck,
    },
    {
      title: 'Ethical Accountability',
      description: 'Upholding strict participant rights and data privacy in line with ICH-GCP, global ethics boards, and Indian regulatory standards.',
      icon: Scale,
    },
    {
      title: 'Healthcare Impact',
      description: 'Directing our research toward addressing actual public health challenges, clinical gaps, and enhancing patient diagnostics.',
      icon: Target,
    },
    {
      title: 'Methodological Rigor',
      description: 'Designing study protocols with precision, implementing advanced biostatistics, and maintaining strict transparency throughout.',
      icon: Compass,
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Incorporation & Founding',
      description: 'REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED was incorporated in Nagpur, India, with a vision to build a premium, evidence-based healthcare research organization.',
    },
    {
      year: '2025',
      title: 'Expert Panel Formation',
      description: 'Formed a multidisciplinary advisory board of medical specialists, biostatisticians, and clinical trial experts to guide our research protocols.',
    },
    {
      year: '2026',
      title: 'Collaboration Frameworks',
      description: 'Established research and consultation frameworks with regional hospitals, diagnostic labs, and global clinical databases.',
    },
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
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">About the Institute</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Driven by Evidence, Guided by Ethics
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Learn about our founding history, corporate mission, core scientific values, and the expert leadership team.
          </p>
        </div>
      </section>

      {/* Company Overview & History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-regentia-blue">
              <Building className="h-5 w-5" />
              <span className="text-xs uppercase font-extrabold tracking-wider font-sans">Company Overview</span>
            </div>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Advancing Healthcare Research and Scientific Integrity Since 2024
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED is a dedicated healthcare research organization established in 2024. Headquartered in Nagpur, Maharashtra, we address critical healthcare gaps by conducting high-fidelity clinical and epidemiological studies.
            </p>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Our organization is structured to assist healthcare providers, clinical sponsors, and academic researchers in navigating complex protocol designs, biostatistics analysis, and systematic evidence synthesis. We do not provide academic editing or writing services; instead, we operate as a primary and secondary medical research entity.
            </p>
          </div>

          {/* Right Block (History box) */}
          <div className="lg:col-span-5">
            <Card hoverEffect={false} className="bg-slate-50 border-slate-100 p-8 flex flex-col gap-6">
              <div className="flex items-center gap-2.5 text-regentia-navy">
                <History className="h-5 w-5" />
                <h3 className="font-bold text-lg">Our History</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Regentia was established in response to the growing demand for independent research centers in central India capable of bridging local clinical insights with global healthcare standards. Since our incorporation in 2024, we have focused exclusively on clinical methodology, digital health analysis, and evidence-based study protocols.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <Card hoverEffect={false} className="bg-white p-8 border-slate-100/80 shadow-sm flex gap-5 items-start">
            <div className="p-3 bg-regentia-light text-regentia-blue rounded-xl shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-regentia-navy mb-3">Our Mission</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
                To conduct and facilitate rigorous, ethical, and transparent healthcare research that resolves critical clinical questions, advances medical innovation, and informs healthcare policy for the betterment of patient outcomes worldwide.
              </p>
            </div>
          </Card>

          {/* Vision */}
          <Card hoverEffect={false} className="bg-white p-8 border-slate-100/80 shadow-sm flex gap-5 items-start">
            <div className="p-3 bg-regentia-light text-regentia-blue rounded-xl shrink-0">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-regentia-navy mb-3">Our Vision</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
                To be recognized globally as a premium healthcare research center, serving as a beacon of scientific integrity, evidence-based discovery, and clinical excellence that shapes the future of healthcare.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Our Foundation</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Our Core Ethical Values
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              These principles govern every research protocol we author, study we coordinate, and clinical dataset we analyze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-6 border-slate-100 hover:shadow-lg hover:shadow-regentia-blue/5 group">
                  <div className="h-10 w-10 rounded-lg bg-regentia-light text-regentia-navy flex items-center justify-center mb-5 group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-regentia-navy mb-2.5 text-base group-hover:text-regentia-blue transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chronological Timeline from 2024 */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100/60">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Timeline</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Our Development Journey
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
          </div>

          <div className="relative border-l border-slate-200 ml-4 space-y-12">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="relative pl-8 group">
                {/* Year Indicator on timeline */}
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-regentia-blue group-hover:scale-125 transition-transform" />
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-extrabold font-mono text-regentia-blue uppercase">
                    {milestone.year}
                  </span>
                  <h4 className="text-lg font-bold text-regentia-navy">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-2xl mt-1">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Approach & Healthcare Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image/Visual left */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 bg-regentia-light/40 border border-regentia-blue/5 rounded-3xl w-full max-w-[400px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-regentia-navy">
                    <ActivitySquare className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-regentia-navy text-sm font-sans">Research Framework</span>
                </div>
                <div className="space-y-3.5">
                  <div className="h-2 w-full bg-white rounded" />
                  <div className="h-2 w-[85%] bg-white rounded" />
                  <div className="h-2 w-[90%] bg-regentia-blue/40 rounded" />
                  <div className="h-2 w-[70%] bg-white rounded" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                  Regentia operates on clinical indicators, clinical audit registries, and peer-validated statistical methodologies.
                </p>
              </div>
            </div>
          </div>

          {/* Texts right */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Our Approach</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Rigorous Scientific Approach & Healthcare Impact
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Our scientific approach is centered around transparency and rigorous oversight. Every research project begins with a well-defined protocol registered with clinical registries when appropriate.
            </p>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              By focusing on primary data collection and meticulous evidence synthesis, we ensure that our research has a tangible impact on healthcare systems, medical diagnoses, and clinical guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Leadership Team</span>
            <h2 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Our Co-Founders & Leading Investigators
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Meet the medical professionals guiding the scientific vision of Regentia Health and Research.
            </p>
          </div>

          <FounderCard />
        </div>
      </section>
    </div>
  );
}
