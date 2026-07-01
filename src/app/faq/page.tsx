import React from 'react';
import type { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, our research philosophy, and collaboration pathways.',
};

export default function FAQPage() {
  const faqItems = [
    {
      id: 'collaborate',
      question: 'Who can collaborate with Regentia?',
      answer: 'We collaborate with a wide array of healthcare organizations, including academic medical centers, clinical sponsors, pharmaceutical companies, healthcare startups, private clinics, and independent medical investigators. Our multidisciplinary framework enables us to work with both regional partners in India and global sponsors.',
    },
    {
      id: 'areas',
      question: 'What research areas do you support?',
      answer: 'Our core competencies include clinical trials coordination, observational studies, epidemiological database design, biostatistical analysis, digital health validation protocols (such as AI diagnostic models and wearable trackers), and systematic evidence synthesis (literature reviews, meta-analyses, and clinical indicators formulation). We do not provide academic editing or publishing assistance.',
    },
    {
      id: 'how-collaborate',
      question: 'How can organizations collaborate with you?',
      answer: 'Organizations can initiate collaboration by submitting an inquiry via our contact form or emailing our research team. We will arrange an initial consultation to evaluate the research scope, determine protocol requirements, formulate a methodology outline, and discuss ethics board review parameters.',
    },
    {
      id: 'contact',
      question: 'How do I contact Regentia?',
      answer: 'You can email us directly at regentiahealthandresearch@gmail.com, call us at +91 8369525334, or submit an inquiry through the form on our Contact page. Our registered office is located at H. No. 481, Kutubshah Nagar, Gittikhadan Chowk, Katol Road, Nagpur – 440013, Maharashtra, India.',
    },
    {
      id: 'philosophy',
      question: 'What is your research philosophy?',
      answer: 'Our philosophy is built on absolute scientific integrity, ethical accountability, and evidence-based outcomes. We believe clinical investigations should always prioritize participant safety and data accuracy. We ensure that every study protocol is rigorously designed to prevent standard research bias, delivering findings that can be replicated and integrated into patient care.',
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
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Frequently Asked Questions</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            FAQ & Support
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Get answers to general inquiries about our research domains, collaboration guidelines, and organizational practices.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-regentia-navy tracking-tight">
              General Inquiries
            </h2>
            <div className="h-1 w-12 bg-regentia-blue rounded-full my-1" />
            <p className="text-sm text-slate-500 font-sans max-w-md">
              Browse through our commonly asked questions to understand how we operate and partner on research.
            </p>
          </div>

          {/* Accordion Component */}
          <Accordion items={faqItems} className="mt-4" />
        </div>
      </section>
    </div>
  );
}
