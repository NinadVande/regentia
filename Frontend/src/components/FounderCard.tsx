import React from 'react';
import Image from 'next/image';
import { User2 } from 'lucide-react';
import { Card } from './ui/Card';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


interface Founder {
  name: string;
  credentials: string;
  role: string;
  bio: string;
  linkedin: string;
  image?: string;
  imagePosition?: string;
}

export default function FounderCard() {
  const founders: Founder[] = [
    {
      name: 'Dr. Rakshanda Khan',
      credentials: 'MBBS',
      role: 'Co-Founder',
      bio: 'Commitment to ethical healthcare research and evidence-based medicine. Dr. Khan guides Regentia\'s protocols, ensuring every clinical investigation aligns with global safety and research integrity standards.',
      linkedin: 'https://www.linkedin.com/in/khanrakhshanda/',
      image: '/images/founders/rakshanda.jpg',
      imagePosition: 'object-top',
    },
    {
      name: 'Dr. Harshwardhan Ramteke',
      credentials: 'MBBS',
      role: 'Co-Founder',
      bio: 'Focusing on research excellence, healthcare innovation, and advancing medical science through global collaboration. Dr. Ramteke is dedicated to creating evidence-based clinical workflows.',
      linkedin: 'https://www.linkedin.com/in/harshawardhanramteke/',
      image: '/images/founders/harshwardhan.png',
      imagePosition: 'object-center',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {founders.map((founder) => (
        <Card key={founder.name} className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start text-center md:text-left">
          {/* Avatar Placeholder or Photograph */}
          {founder.image ? (
            <div className="w-44 h-44 rounded-xl border border-slate-100 overflow-hidden shrink-0 shadow-sm relative bg-slate-50 animate-fade-in-up">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                quality={100}
                priority
                unoptimized
                className={`object-cover ${founder.imagePosition || 'object-center'}`}
              />
              <span className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Active Core Investigator" />
            </div>
          ) : (
            <div className="w-44 h-44 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-inner relative">
              <User2 className="h-10 w-10 text-slate-400" />
              <span className="absolute bottom-1.5 right-1.5 h-3.5 w-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Active Core Investigator" />
            </div>
          )}

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between h-full gap-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                <h4 className="text-xl font-bold text-regentia-navy">
                  {founder.name}, <span className="text-sm font-medium text-slate-500 font-sans">{founder.credentials}</span>
                </h4>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-regentia-blue self-center sm:self-start transition-colors"
                  aria-label={`${founder.name} LinkedIn Profile`}
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-regentia-blue bg-regentia-light px-2.5 py-1 rounded-full inline-block mb-3">
                {founder.role}
              </span>
              <p className="text-sm text-slate-500 leading-relaxed font-sans mt-2">
                {founder.bio}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
