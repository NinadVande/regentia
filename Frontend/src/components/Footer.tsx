import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

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

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Our Services', href: '/services' },
      { name: 'Our Research', href: '/research' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Frequently Asked Questions', href: '/faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm mt-auto">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Branding & Bio (4 columns) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/">
            <Logo light className="h-10" />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED is a premium healthcare research organization established in 2024. We are dedicated to advancing evidence-based healthcare through scientific excellence, ethical practices, and collaborative investigation.
          </p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="h-8 w-8 rounded-full border border-slate-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>


        {/* Quick Links (3 columns) */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {links.explore.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info (4 columns) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-white font-semibold tracking-wider text-xs uppercase">Contact Information</h4>
          <ul className="flex flex-col gap-3.5">
            <li className="flex gap-3 items-start">
              <MapPin className="h-4 w-4 text-regentia-blue/80 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                H. No. 481, Kutubshah Nagar,<br />
                Gittikhadan Chowk, Katol Road,<br />
                Nagpur – 440013, Maharashtra, India
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-4 w-4 text-regentia-blue/80 shrink-0" />
              <a href="tel:+918369525334" className="hover:text-white transition-colors">
                +91 8369525334
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="h-4 w-4 text-regentia-blue/80 shrink-0" />
              <a href="mailto:regentiahealthandresearch@gmail.com" className="hover:text-white transition-colors break-all">
                regentiahealthandresearch@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-slate-900 bg-slate-950/50 py-6 text-slate-500 text-xs px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED. All Rights Reserved.</p>
          <div className="flex gap-6">
            {links.legal.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-slate-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
