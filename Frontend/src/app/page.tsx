import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Timeline from '@/components/Timeline';
import FounderCard from '@/components/FounderCard';
import ServiceCard from '@/components/ServiceCard';
import {
  FileSearch,
  ShieldAlert,
  Scale,
  Users2,
  ActivitySquare,
  Network,
  ClipboardList,
  Stethoscope,
  FlaskConical,
  Layers,
  Settings,
  Globe,
  ArrowRight,
  TrendingUp,
  Award,
  BarChart3,
  BookOpen,
  HelpCircle
} from 'lucide-react';

export default function Home() {
  const whyRegentia = [
    {
      title: 'Evidence-Based Research',
      description: 'Our methodologies prioritize empirical validation and verifiable clinical outcomes above all.',
      icon: FileSearch,
    },
    {
      title: 'Scientific Integrity',
      description: 'Strict adherence to rigorous research standards, transparency, and data accuracy.',
      icon: ShieldAlert,
    },
    {
      title: 'Ethical Practices',
      description: 'Committed to upholding international guidelines (Declaration of Helsinki, ICH-GCP) in all clinical research.',
      icon: Scale,
    },
    {
      title: 'Expert Research Team',
      description: 'Led by qualified medical professionals and multidisciplinary investigators with clinical backgrounds.',
      icon: Users2,
    },
    {
      title: 'Healthcare Innovation',
      description: 'Pioneering new approaches to study designs, healthcare delivery, and medical technologies.',
      icon: ActivitySquare,
    },
    {
      title: 'Collaborative Research',
      description: 'Partnering with global academic hubs, healthcare organizations, and pharmaceutical innovators.',
      icon: Network,
    },
  ];

  const researchExpertise = [
    {
      title: 'Clinical Research',
      description: 'Executing clinical trials and observational studies under rigorous validation standards.',
      icon: ClipboardList,
    },
    {
      title: 'Medical Research',
      description: 'Investigating pathology mechanisms, drug efficacy metrics, and clinical treatments.',
      icon: Stethoscope,
    },
    {
      title: 'Healthcare Innovation',
      description: 'Evaluating digital healthcare systems, AI diagnostic models, and medical devices.',
      icon: FlaskConical,
    },
    {
      title: 'Evidence Synthesis',
      description: 'Conducting comprehensive literature reviews, meta-analyses, and systematic healthcare reports.',
      icon: Layers,
    },
    {
      title: 'Research Methodology',
      description: 'Designing customized biostatistics plans, clinical protocols, and robust study frameworks.',
      icon: Settings,
    },
    {
      title: 'Scientific Collaboration',
      description: 'Connecting healthcare centers to form collaborative research networks and studies.',
      icon: Globe,
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* About Preview Section */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">About the Organization</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              A Trusted Partner in Global Healthcare Research
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Established in 2024, REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED was founded on the principle that modern medicine must be driven by strict scientific excellence and ethical rigor.
            </p>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Our multidisciplinary approach allows us to address complex clinical and epidemiological challenges, providing validated research studies that shape clinical protocols and medical technologies.
            </p>
            <div className="mt-2">
              <Link href="/about">
                <Button variant="outline" className="flex items-center gap-2">
                  <span>Read More About Us</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card hoverEffect={false} className="bg-white border-slate-100 p-6 flex gap-4">
              <Award className="h-8 w-8 text-regentia-blue shrink-0" />
              <div>
                <h4 className="font-semibold text-regentia-navy mb-1.5 text-base">Scientific Excellence</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                  Rigorous clinical study designs, meticulous data capture, and precise statistics.
                </p>
              </div>
            </Card>
            <Card hoverEffect={false} className="bg-white border-slate-100 p-6 flex gap-4">
              <Scale className="h-8 w-8 text-regentia-blue shrink-0" />
              <div>
                <h4 className="font-semibold text-regentia-navy mb-1.5 text-base">Ethical Research Practices</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                  Strict adherence to ethical oversight and international participant-protection guidelines.
                </p>
              </div>
            </Card>
            <Card hoverEffect={false} className="bg-white border-slate-100 p-6 flex gap-4">
              <FileSearch className="h-8 w-8 text-regentia-blue shrink-0" />
              <div>
                <h4 className="font-semibold text-regentia-navy mb-1.5 text-base">Evidence-Based Focus</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                  Generating high-fidelity medical studies that can be replicated and integrated.
                </p>
              </div>
            </Card>
            <Card hoverEffect={false} className="bg-white border-slate-100 p-6 flex gap-4">
              <ActivitySquare className="h-8 w-8 text-regentia-blue shrink-0" />
              <div>
                <h4 className="font-semibold text-regentia-navy mb-1.5 text-base">Healthcare Innovation</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                  Evaluating new therapeutics, diagnostic solutions, and health analytics tools.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Regentia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Our Strengths</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              Why Healthcare Leaders Choose Regentia
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              We connect scientific clinical expertise with technical execution to drive trusted healthcare studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyRegentia.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6 md:p-8 hover:shadow-lg hover:shadow-regentia-blue/5 border-slate-100 group">
                  <div className="h-12 w-12 rounded-xl bg-regentia-light flex items-center justify-center mb-6 group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6 text-regentia-navy group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-lg font-bold text-regentia-navy mb-3 group-hover:text-regentia-blue transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Programs & Support</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              Featured Services & Training Courses
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Explore our core methodologies and research courses designed for clinical investigators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Network Meta-Analysis Course',
                description: 'Learn advanced methodologies for conducting and interpreting Network Meta-Analysis using evidence-based research practices.',
                fee: '₹10,000',
                iconName: 'Network',
              },
              {
                title: 'Meta-Analysis Course',
                description: 'Comprehensive training on systematic reviews, statistical methods, and pairwise meta-analysis for healthcare research.',
                fee: '₹10,000',
                iconName: 'BarChart3',
              },
              {
                title: 'Online Research',
                description: 'Learn research methodology, study design, literature review, protocol development, and evidence-based healthcare research.',
                fee: '₹10,000',
                iconName: 'BookOpen',
              },
              {
                title: 'Research Support',
                description: 'End-to-end research guidance, including study planning, data analysis, methodology consultation, and research mentoring.',
                fee: '₹10,000',
                iconName: 'HelpCircle',
              }
            ].map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                fee={service.fee}
                iconName={service.iconName}
                isDetailed={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="flex items-center gap-2 mx-auto">
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Expertise Section */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Scope of Expertise</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              Our Research Competencies
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Specialized clinical investigation workflows designed to produce reliable outcomes and publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchExpertise.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6 bg-white border-slate-100/80 shadow-sm flex items-start gap-5 hover:border-regentia-blue/30 group">
                  <div className="p-2.5 rounded-lg bg-regentia-light shrink-0 text-regentia-navy group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-regentia-navy group-hover:text-regentia-blue transition-colors text-base md:text-lg">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research Workflow Section (Timeline) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Methodology</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              Our Structured Research Workflow
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              From study formulation to impact: how we maintain scientific validity at every phase.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-regentia-navy text-white relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-regentia-blue blur-[100px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-mono">2024</span>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-300 uppercase">Established</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-mono">100%</span>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-300 uppercase">Research Driven</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-mono">100%</span>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-300 uppercase">Ethical Practices</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono py-1 sm:py-2.5">Multi-disciplinary</span>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-slate-300 uppercase">Healthcare Focus</span>
          </div>
        </div>
      </section>

      {/* Founders Section Preview */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Leadership Team</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-regentia-navy tracking-tight">
              Founding Leadership & Co-Founders
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full" />
            <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
              Meet our co-founders driving scientific excellence and evidence-based innovation.
            </p>
          </div>

          <FounderCard />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-br from-regentia-navy to-regentia-dark text-white rounded-3xl p-8 md:p-12 lg:p-16 text-center flex flex-col items-center gap-6 shadow-xl relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-regentia-blue/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-xs font-bold uppercase tracking-widest text-regentia-blue bg-white/10 px-3 py-1 rounded-full relative z-10">
              Collaboration & Inquiry
            </span>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl relative z-10">
              Ready to Collaborate in Healthcare Research?
            </h3>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans relative z-10">
              Whether you are an academic investigator, clinical trials sponsor, or digital health innovator, we provide the ethical protocol design and methodology oversight you need.
            </p>
            
            <div className="mt-4 relative z-10">
              <Link href="/contact">
                <Button variant="white" size="lg" className="flex items-center gap-2 shadow-lg shadow-white/5">
                  <span>Contact Us</span>
                  <ArrowRight className="h-4 w-4 text-regentia-navy" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
