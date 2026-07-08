import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the terms and conditions of REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, outlining site usage policies and research collaboration guidelines.',
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'July 1, 2026';

  return (
    <div className="w-full flex flex-col">
      {/* Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center gap-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Legal Disclosures</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-sans">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-slate max-w-none text-slate-600 font-sans">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">1. Agreement to Terms</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                By accessing or browsing this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions. If you do not agree to these terms, please discontinue using this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">2. Intellectual Property Rights</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                All content, trademarks, logos, illustrations, diagrams, and written text displayed on this website are the exclusive intellectual property of REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, unless explicitly stated otherwise. No part of this site may be replicated, redistributed, or utilized for commercial purposes without our prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">3. Disclaimers</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                The information provided on this website is for general informational and corporate purposes only. It does not constitute medical advice, diagnostic recommendations, or clinical guidance. For patient emergencies or clinical consulting, please consult a qualified physician or healthcare provider.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">4. Collaboration and Protocol Agreements</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                Any collaboration, clinical trial coordination, database structure, or biostatistics services provided by Regentia are governed by individual, legally binding Clinical Study Agreements (CSAs), Sponsor Contracts, or Memorandums of Understanding (MoUs). The contents of this website do not represent a binding contract to execute clinical studies.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">5. Limitation of Liability</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED will not be held liable for any damages arising out of the use or inability to use this website, including data loss, site downtime, or reliance on information presented herein.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">6. Jurisdiction and Governing Law</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                These Terms & Conditions are governed by and construed in accordance with the laws of India. Any legal disputes or claims arising under these terms will be subject to the exclusive jurisdiction of the courts located in Nagpur, Maharashtra, India.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">7. Contact Information</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                If you have questions regarding these Terms & Conditions, please contact our legal counsel at <a href="mailto:regentiahealthandresearch@gmail.com" className="text-regentia-blue hover:underline font-medium">regentiahealthandresearch@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
