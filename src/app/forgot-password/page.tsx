'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { Mail, ArrowLeft, Loader2, ArrowRight } from 'lucide-react';
import { isValidEmail } from '@/services/auth';

export default function ForgotPasswordPage() {
  const { forgotPassword, actionLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const res = await forgotPassword(email);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-slate-50/30 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-regentia-light/40 blur-3xl opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-slate-200/40 blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        {/* Logo and Headings */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Logo className="mb-4" />
          </Link>
          <h2 className="text-2xl font-extrabold text-regentia-navy tracking-tight mt-2 text-center">
            Reset your password
          </h2>
          <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
            Enter your email and we&apos;ll dispatch a link to securely recover your account.
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="name@example.com"
                  disabled={actionLoading}
                  className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-3.5 py-2 text-sm text-slate-800 transition-all outline-none
                    placeholder:text-slate-400
                    focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                />
              </div>
            </div>

            {/* Send Link Button */}
            <Button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 h-11 text-sm md:text-base flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Go Back Link */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-regentia-blue transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
