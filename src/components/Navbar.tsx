'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Menu, X, ArrowRight, ShoppingCart } from 'lucide-react';
import Logo from './Logo';
import Button from './ui/Button';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Research', href: '/research' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Information Bar */}
      <div className="w-full bg-regentia-navy text-slate-200 text-xs py-2 px-4 border-b border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left Details */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a href="mailto:regentiahealthandresearch@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3 text-regentia-blue/40" />
              <span>regentiahealthandresearch@gmail.com</span>
            </a>
            <a href="tel:+918369525334" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3 text-regentia-blue/40" />
              <span>+91 8369525334</span>
            </a>
          </div>
          {/* Right Details */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="h-3 w-3 text-regentia-blue/40" />
            <span>Nagpur, Maharashtra, India</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-100/50 py-3 border-b border-slate-100'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors py-1.5 ${
                  isActive(link.href)
                    ? 'text-regentia-blue'
                    : 'text-slate-600 hover:text-regentia-navy'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-regentia-blue rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/cart"
              className={`flex items-center gap-2 text-sm font-medium transition-colors py-1.5 relative ${
                pathname === '/cart' ? 'text-regentia-blue' : 'text-slate-600 hover:text-regentia-navy'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-regentia-blue text-white text-[9px] font-extrabold h-4.5 w-4.5 rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            <Link href="/contact">
              <Button className="flex items-center gap-2">
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-regentia-navy transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[105px] bottom-0 bg-white z-40 border-t border-slate-100 animate-fade-in-up flex flex-col p-6">
            <nav className="flex flex-col gap-6 text-lg font-medium mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-2 border-b border-slate-50 transition-colors ${
                    isActive(link.href)
                      ? 'text-regentia-blue font-semibold'
                      : 'text-slate-600 hover:text-regentia-navy'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-3 border-b border-slate-50 flex items-center justify-between transition-colors ${
                  pathname === '/cart' ? 'text-regentia-blue font-semibold' : 'text-slate-600 hover:text-regentia-navy'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                </div>
                {mounted && cartCount > 0 && (
                  <span className="bg-regentia-blue text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center py-3 text-base flex items-center gap-2">
                  <span>Contact Us</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
