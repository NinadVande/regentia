import React from 'react';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Building2, Map } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED in Nagpur. Submit a research inquiry, collaboration request, or question.',
};

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Page Header Banner */}
      <section className="bg-slate-950 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Gradients */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-regentia-blue blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Connect With Us</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-sans">
            Reach out to our Nagpur headquarters for collaboration requests, clinical investigations, or research questions.
          </p>
        </div>
      </section>

      {/* Main Split Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Inquiry Form</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-regentia-navy tracking-tight">
                Send a Research Inquiry
              </h2>
              <div className="h-1 w-12 bg-regentia-blue rounded-full my-1" />
            </div>
            <ContactForm />
          </div>

          {/* Right: Company Details & Map (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-regentia-blue">Office Location</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-regentia-navy tracking-tight">
                Headquarters Details
              </h2>
              <div className="h-1 w-12 bg-regentia-blue rounded-full my-1" />
            </div>

            {/* Information Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
              <div className="flex gap-4">
                <Building2 className="h-5 w-5 text-regentia-blue shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-regentia-navy text-sm uppercase tracking-wider mb-1 font-sans">Registered Name</h4>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                    REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-regentia-blue shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-regentia-navy text-sm uppercase tracking-wider mb-1 font-sans">Office Address</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans">
                    H. No. 481, Kutubshah Nagar,<br />
                    Gittikhadan Chowk, Katol Road,<br />
                    Nagpur – 440013, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-regentia-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-regentia-navy text-sm uppercase tracking-wider mb-1 font-sans">Email Contact</h4>
                  <a
                    href="mailto:regentiahealthandresearch@gmail.com"
                    className="text-sm text-regentia-blue hover:underline font-medium break-all"
                  >
                    regentiahealthandresearch@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-regentia-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-regentia-navy text-sm uppercase tracking-wider mb-1 font-sans">Phone Lines</h4>
                  <a
                    href="tel:+918369525334"
                    className="text-sm text-slate-600 hover:text-regentia-navy font-semibold transition-colors"
                  >
                    +91 8369525334
                  </a>
                </div>
              </div>
            </div>

            {/* High-Fidelity SVG Map Placeholder */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-500">
                <Map className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Nagpur Core Area Map</span>
              </div>
              
              <div className="w-full h-[250px] border border-slate-100 rounded-2xl bg-[#E5E9F0] relative overflow-hidden shadow-sm flex items-center justify-center">
                {/* SVG Road network design */}
                <svg className="absolute inset-0 w-full h-full text-white" viewBox="0 0 400 250" fill="none">
                  {/* Grid / Roads */}
                  <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="12" />
                  <line x1="0" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="8" />
                  <line x1="120" y1="0" x2="120" y2="250" stroke="currentColor" strokeWidth="14" />
                  <line x1="280" y1="0" x2="280" y2="250" stroke="currentColor" strokeWidth="8" />
                  <line x1="0" y1="30" x2="400" y2="120" stroke="currentColor" strokeWidth="4" />
                  
                  {/* River or park accent */}
                  <path d="M 0 250 Q 80 200, 150 250" fill="#A1C4FD" opacity="0.4" />
                  
                  {/* Gittikhadan Chowk label */}
                  <text x="50" y="70" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">KATOL ROAD</text>
                  <text x="135" y="110" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">GITTIKHADAN</text>
                </svg>

                {/* Location Pin */}
                <div className="absolute top-[80px] left-[120px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer relative z-10 animate-bounce">
                  <div className="bg-regentia-navy text-white rounded-full p-2.5 shadow-lg shadow-regentia-navy/20 relative">
                    <MapPin className="h-5 w-5 text-white" fill="#0052cc" />
                  </div>
                  {/* Pin Pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 border border-regentia-blue rounded-full animate-ping pointer-events-none opacity-40" />
                </div>
                
                {/* Float address bubble */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-4 py-2.5 shadow-md max-w-xs select-none">
                  <span className="text-[10px] uppercase font-bold text-regentia-blue tracking-wider">Regentia Health</span>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5 leading-normal">
                    Kutubshah Nagar, Katol Road, Nagpur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
