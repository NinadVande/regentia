'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Mail, Phone, MapPin, Menu, X, ShoppingCart,
  User as UserIcon, BookOpen, ShoppingBag, Settings as SettingsIcon, LogOut, ChevronDown 
} from 'lucide-react';
import Logo from './Logo';
import Button from './ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

            {mounted && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-100 bg-white shadow-sm hover:shadow hover:border-slate-200 transition-all text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                    alt={user.fullName}
                    className="h-7.5 w-7.5 rounded-full bg-slate-100 object-cover border border-slate-100"
                  />
                  <span className="max-w-[100px] truncate">{user.fullName.split(' ')[0]}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 py-2.5 z-50 animate-fade-in-up flex flex-col font-sans">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1 text-left">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-regentia-navy truncate mt-0.5">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-4 py-2 text-xs md:text-sm text-left text-slate-600 hover:bg-regentia-light/50 hover:text-regentia-blue transition-colors flex items-center gap-2.5"
                    >
                      <UserIcon className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      href="/my-courses"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-4 py-2 text-xs md:text-sm text-left text-slate-600 hover:bg-regentia-light/50 hover:text-regentia-blue transition-colors flex items-center gap-2.5"
                    >
                      <BookOpen className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>My Courses</span>
                    </Link>
                    
                    <Link
                      href="/orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-4 py-2 text-xs md:text-sm text-left text-slate-600 hover:bg-regentia-light/50 hover:text-regentia-blue transition-colors flex items-center gap-2.5"
                    >
                      <ShoppingBag className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>Orders</span>
                    </Link>
                    
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-4 py-2 text-xs md:text-sm text-left text-slate-600 hover:bg-regentia-light/50 hover:text-regentia-blue transition-colors flex items-center gap-2.5"
                    >
                      <SettingsIcon className="h-4 w-4 shrink-0 text-slate-400" />
                      <span>Settings</span>
                    </Link>
                    
                    <div className="h-px bg-slate-50 my-1.5" />
                    
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="px-4 py-2 text-xs md:text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors flex items-center gap-2.5 w-full text-left font-semibold cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-regentia-blue transition-colors">
                  Login
                </Link>
                <Link href="/signup">
                  <Button className="h-9 px-4.5 text-xs font-semibold">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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
          <div className="md:hidden fixed inset-x-0 top-[105px] bottom-0 bg-white z-40 border-t border-slate-100 animate-fade-in-up flex flex-col p-6 overflow-y-auto">
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

              {mounted && user && (
                <>
                  <div className="py-2.5 flex items-center gap-3 border-b border-slate-50">
                    <img
                      src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full bg-slate-100"
                    />
                    <div className="text-left">
                      <p className="text-sm font-bold text-regentia-navy leading-snug">{user.fullName}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 border-b border-slate-50 text-slate-600 hover:text-regentia-navy flex items-center gap-3 text-left"
                  >
                    <UserIcon className="h-5 w-5 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/my-courses"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 border-b border-slate-50 text-slate-600 hover:text-regentia-navy flex items-center gap-3 text-left"
                  >
                    <BookOpen className="h-5 w-5 text-slate-400" />
                    <span>My Courses</span>
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 border-b border-slate-50 text-slate-600 hover:text-regentia-navy flex items-center gap-3 text-left"
                  >
                    <ShoppingBag className="h-5 w-5 text-slate-400" />
                    <span>Orders</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 border-b border-slate-50 text-slate-600 hover:text-regentia-navy flex items-center gap-3 text-left"
                  >
                    <SettingsIcon className="h-5 w-5 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                </>
              )}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              {mounted && user ? (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  variant="outline"
                  className="w-full justify-center py-3 text-base flex items-center gap-2 border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer font-semibold"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full justify-center py-3 text-base">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button className="w-full justify-center py-3 text-base">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
