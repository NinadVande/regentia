'use client';

import React from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-regentia-light/50 blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-slate-50 blur-3xl opacity-40 -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column (Text & CTAs) */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-regentia-light border border-regentia-blue/10 rounded-full px-3.5 py-1 text-xs font-semibold text-regentia-blue select-none">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Established 2024 • Ethical Scientific Inquiry</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-regentia-navy leading-[1.1] font-sans">
            Advancing Healthcare Through Research & <span className="text-regentia-blue">Scientific Excellence</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl font-sans">
            REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED is dedicated to advancing evidence-based healthcare through innovative research, scientific collaboration, ethical practices, and impactful healthcare solutions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mt-2">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column (High-Fidelity SVG Medical/AI Visualization) */}
        <div className="lg:col-span-6 flex justify-center items-center relative">
          <div className="w-full max-w-[500px] h-[350px] md:h-[450px] relative animate-float">
            {/* SVG Visual Canvas */}
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-regentia-navy drop-shadow-2xl"
            >
              {/* Scientific Grid Pattern */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="1" />
                </pattern>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0052cc" />
                  <stop offset="100%" stopColor="#000B3E" />
                </linearGradient>
                <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A1C4FD" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#C2E9FB" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <rect width="500" height="500" fill="url(#grid)" rx="24" />

              {/* Glowing background aura */}
              <circle cx="250" cy="250" r="180" fill="url(#lightGrad)" />

              {/* DNA Double Helix strands */}
              <g className="dna-strand" stroke="url(#blueGrad)" strokeWidth="2.5" opacity="0.8">
                {/* Back strand */}
                <path d="M 120 180 C 170 120, 230 380, 280 320 C 330 260, 390 120, 440 220" fill="none" strokeDasharray="4 4" />
                {/* Front strand */}
                <path d="M 120 220 C 170 320, 230 120, 280 180 C 330 240, 390 380, 440 180" fill="none" />
                
                {/* Connector lines (rungs) */}
                <line x1="150" y1="185" x2="150" y2="215" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="180" y1="168" x2="180" y2="225" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="210" y1="172" x2="210" y2="210" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="240" y1="210" x2="240" y2="265" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="270" y1="230" x2="270" y2="280" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="300" y1="240" x2="300" y2="270" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="330" y1="210" x2="330" y2="260" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="360" y1="180" x2="360" y2="268" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
                <line x1="390" y1="180" x2="390" y2="240" stroke="rgba(0, 82, 204, 0.4)" strokeWidth="1.5" />
              </g>

              {/* Floating Molecule nodes */}
              <g className="molecules">
                {/* Node 1 */}
                <circle cx="150" cy="200" r="10" fill="#0052cc" />
                <circle cx="150" cy="200" r="16" stroke="#0052cc" strokeWidth="1" opacity="0.3" />
                {/* Node 2 */}
                <circle cx="280" cy="230" r="14" fill="#000B3E" />
                <circle cx="280" cy="230" r="22" stroke="#000B3E" strokeWidth="1" opacity="0.2" />
                {/* Node 3 */}
                <circle cx="390" cy="210" r="8" fill="#0052cc" />
                
                {/* Inter-connections */}
                <line x1="150" y1="200" x2="280" y2="230" stroke="rgba(0, 11, 62, 0.15)" strokeWidth="1.5" />
                <line x1="280" y1="230" x2="390" y2="210" stroke="rgba(0, 11, 62, 0.15)" strokeWidth="1.5" />
              </g>

              {/* Data Visualization / Tech overlay */}
              <g className="data-viz" opacity="0.9">
                {/* Rounded card shapes floating */}
                <rect x="290" y="320" width="130" height="70" rx="12" fill="white" stroke="rgba(226,232,240,0.8)" strokeWidth="1.5" />
                <text x="305" y="342" fill="#000B3E" fontSize="9" fontWeight="bold" fontFamily="sans-serif">DATA MODELING</text>
                
                {/* Little bar chart inside floating card */}
                <rect x="305" y="355" width="12" height="20" rx="2" fill="#0052cc" />
                <rect x="323" y="350" width="12" height="25" rx="2" fill="#000B3E" />
                <rect x="341" y="360" width="12" height="15" rx="2" fill="#E2E8F0" />
                <rect x="359" y="345" width="12" height="30" rx="2" fill="#0052cc" />

                {/* Analytical Ring */}
                <circle cx="160" cy="330" r="40" stroke="rgba(226, 232, 240, 0.8)" strokeWidth="4" />
                <circle cx="160" cy="330" r="40" stroke="#0052cc" strokeWidth="4" strokeDasharray="180 360" strokeLinecap="round" />
                <text x="146" y="334" fill="#000B3E" fontSize="11" fontWeight="bold" fontFamily="sans-serif">92%</text>
                <text x="133" y="385" fill="#64748B" fontSize="9" fontWeight="medium" fontFamily="sans-serif">ANALYSIS PRECISE</text>
              </g>

              {/* Floating atoms / molecules */}
              <circle cx="110" cy="120" r="4" fill="#0052cc" opacity="0.6" />
              <circle cx="350" cy="110" r="6" fill="#000B3E" opacity="0.4" />
              <circle cx="430" cy="310" r="5" fill="#0052cc" opacity="0.5" />
              <circle cx="210" cy="80" r="3" fill="#64748B" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
