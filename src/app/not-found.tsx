import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-slate-50/50 py-24 px-4">
      <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-md shadow-slate-100/50 text-center flex flex-col items-center gap-6 animate-fade-in-up">
        {/* Warning Icon */}
        <div className="h-16 w-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-inner">
          <AlertCircle className="h-8 w-8" />
        </div>

        {/* 404 Text */}
        <div className="space-y-2">
          <span className="text-sm font-extrabold tracking-widest text-regentia-blue uppercase">Error 404</span>
          <h1 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed font-sans mt-2">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Please verify the URL or return to safety.
          </p>
        </div>

        {/* Return buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Contact Us</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
