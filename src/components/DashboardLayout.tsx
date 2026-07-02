'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { User, BookOpen, ShoppingBag, Settings, LogOut, Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Protect route
  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  // Seed default courses and orders if none exist
  useEffect(() => {
    if (mounted && user) {
      const savedCourses = localStorage.getItem('regentia_courses');
      if (!savedCourses) {
        const defaultCourses = [
          {
            id: 'crs_1',
            title: 'Network Meta-Analysis Course',
            purchaseDate: '2026-06-15',
            status: 'Active',
            iconName: 'Network',
            description: 'Learn advanced methodologies for conducting and interpreting Network Meta-Analysis using evidence-based research practices.'
          },
          {
            id: 'crs_2',
            title: 'Meta-Analysis Course',
            purchaseDate: '2026-05-10',
            status: 'Active',
            iconName: 'BarChart3',
            description: 'Comprehensive training on systematic reviews, statistical methods, and pairwise meta-analysis for healthcare research.'
          }
        ];
        localStorage.setItem('regentia_courses', JSON.stringify(defaultCourses));
      }

      const savedOrders = localStorage.getItem('regentia_orders');
      if (!savedOrders) {
        const defaultOrders = [
          {
            id: 'ORD-98273',
            title: 'Network Meta-Analysis Course',
            amount: 10000,
            purchaseDate: '2026-06-15',
            status: 'Success'
          },
          {
            id: 'ORD-98112',
            title: 'Meta-Analysis Course',
            amount: 10000,
            purchaseDate: '2026-05-10',
            status: 'Success'
          }
        ];
        localStorage.setItem('regentia_orders', JSON.stringify(defaultOrders));
      }
    }
  }, [mounted, user]);

  if (!mounted || loading || !user) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-regentia-blue animate-spin" />
        <span className="mt-4 text-sm text-slate-500 font-sans">Checking authorization...</span>
      </div>
    );
  }

  const menuItems = [
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'My Courses', href: '/my-courses', icon: BookOpen },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/40 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-6 w-full">
          {/* User Info Brief Card (Glassmorphism feel) */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-5 shadow-sm shadow-slate-100 flex items-center gap-4">
            <img
              src={user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
              alt={user.fullName}
              className="h-14 w-14 rounded-full bg-slate-100 border border-slate-100 shadow-sm"
            />
            <div className="overflow-hidden text-left">
              <h4 className="font-extrabold text-regentia-navy text-base leading-snug truncate">
                {user.fullName}
              </h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
              <span className="inline-flex mt-2 items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-regentia-light text-regentia-blue border border-regentia-blue/10">
                {user.role || 'RESEARCHER'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm shadow-slate-100 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-regentia-navy text-white shadow-md shadow-regentia-navy/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-regentia-navy'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="h-px bg-slate-100 my-2" />
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50/50 hover:text-rose-700 transition-all cursor-pointer text-left w-full"
            >
              <LogOut className="h-4.5 w-4.5 text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="lg:col-span-9 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
