'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { isValidEmail } from '@/services/auth';

export default function LoginPage() {
  const { login, actionLoading } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Error states
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await login(email, password, rememberMe);
    if (!res.success) {
      setErrors({ general: res.message });
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
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
            Access Regentia&apos;s medical research courses, study tools, and academic services.
          </p>
        </div>

        {/* Login Card (Glassmorphism) */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold animate-pulse-slow">
                {errors.general}
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
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@example.com"
                  disabled={actionLoading}
                  className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-3.5 py-2 text-sm text-slate-800 transition-all outline-none
                    placeholder:text-slate-400
                    focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-red-500 mt-0.5">{errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-regentia-blue hover:text-regentia-navy transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••"
                  disabled={actionLoading}
                  className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-10.5 py-2 text-sm text-slate-800 transition-all outline-none
                    placeholder:text-slate-400
                    focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500 mt-0.5">{errors.password}</span>
              )}
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-regentia-blue focus:ring-regentia-blue/20"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-500 select-none">
                Remember me
              </label>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 h-11 text-base flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/80 px-3 text-slate-400 font-semibold tracking-wider bg-white">
                OR
              </span>
            </div>
          </div>

          {/* Link to Signup */}
          <div className="text-center">
            <p className="text-xs font-medium text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-bold text-regentia-blue hover:text-regentia-navy transition-colors underline-offset-4 hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
