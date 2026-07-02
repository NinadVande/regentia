import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy of REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED, detailing participant data privacy, data security, and compliance.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'July 1, 2026';

  return (
    <div className="w-full flex flex-col">
      {/* Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center gap-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Legal Disclosures</span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-sans">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 prose prose-slate max-w-none text-slate-600 font-sans">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">1. Introduction</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects the privacy of our website visitors, research collaborators, and clinical trial participants. This Privacy Policy details how we collect, store, utilize, and protect your information when you visit our website, submit inquiries, or participate in our medical and clinical studies.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">2. Information Collection</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans mb-3">
                We collect personal information through two main channels:
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base space-y-2.5 font-sans">
                <li>
                  <strong>Communication Details:</strong> Name, email address, phone number, and organization details submitted through our contact form.
                </li>
                <li>
                  <strong>Research & Clinical Data:</strong> Patient or volunteer parameters collected during primary clinical trials and studies. Such data is strictly governed by clinical trial protocol sheets, individual Informed Consent Forms (ICFs), and institutional ethics boards.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">3. Data Usage Principles</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans mb-3">
                All personal and clinical data is collected and utilized solely for specified scientific purposes:
              </p>
              <ul className="list-disc pl-5 text-sm md:text-base space-y-2.5 font-sans">
                <li>To address research collaborations, scientific inquiries, and professional communication.</li>
                <li>To compile biostatistical parameters for clinical registry studies.</li>
                <li>To satisfy compliance, drug registry protocols, and ethics board reporting specifications.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">4. Participant Privacy and Anonymization</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                In all medical and clinical studies conducted by Regentia, patient identifiers are strictly de-identified (anonymized) at the source of data capture, unless explicitly required and authorized by participant consent. We comply with Indian health privacy standards and global GCP guidelines to ensure study data contains no unapproved patient identifiers.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">5. Information Disclosure</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                We do not sell, rent, or trade personal data. We disclose information only to regulatory bodies, ethics committees, or research sponsors when required by law or specified within the study&apos;s protocol guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">6. Security Measures</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                We implement industry-standard technical security controls, including SSL database encryption and strict server access permissions, to safeguard both contact submissions and research records against unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-regentia-navy mb-4">7. Contact and Inquiries</h2>
              <p className="text-sm md:text-base leading-relaxed font-sans">
                If you have questions regarding this Privacy Policy or wish to request data deletion (for website submissions), please contact us at <a href="mailto:regentiahealthandresearch@gmail.com" className="text-regentia-blue hover:underline font-medium">regentiahealthandresearch@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
