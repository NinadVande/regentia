'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { Lock, Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react';
import { checkPasswordStrength } from '@/services/auth';

export default function ResetPasswordPage() {
  const { resetPassword, actionLoading } = useAuth();

  // Form states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Live password strength calculated dynamically during render
  const strength = checkPasswordStrength(password);

  // Error states
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (strength.score < 2) {
      newErrors.password = 'Please enter a stronger password (at least Fair).';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await resetPassword(password);
    if (!res.success) {
      setErrors({ general: res.message });
    }
  };

  // Rule verification indicators
  const rules = [
    { text: '8+ Characters', met: password.length >= 8 },
    { text: 'Uppercase Letter', met: /[A-Z]/.test(password) },
    { text: 'Number (0-9)', met: /[0-9]/.test(password) },
    { text: 'Special Symbol', met: /[^A-Za-z0-9]/.test(password) }
  ];

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
            Set your new password
          </h2>
          <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
            Create a unique, secure password to safeguard your scientific research profile.
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold">
                {errors.general}
              </div>
            )}

            {/* New Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                New Password
              </label>
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

              {/* Password Strength Indicator Visual Panel */}
              {password && (
                <div className="mt-2 space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl animate-fade-in-up">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    <span>Password Strength:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] text-white ${
                        strength.score === 1
                          ? 'bg-rose-500'
                          : strength.score === 2
                          ? 'bg-amber-500'
                          : strength.score === 3
                          ? 'bg-yellow-500'
                          : 'bg-emerald-500'
                      }`}
                    >
                      {strength.label}
                    </span>
                  </div>

                  {/* Visual representation meter */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index <= strength.score ? strength.color : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                    {rules.map((rule) => (
                      <div key={rule.text} className="flex items-center gap-1.5 text-[10px]">
                        <div
                          className={`h-3.5 w-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                            rule.met
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                              : 'bg-white border-slate-200 text-slate-300'
                          }`}
                        >
                          {rule.met && <Check className="h-2 w-2 stroke-[3]" />}
                        </div>
                        <span className={`font-medium ${rule.met ? 'text-slate-600' : 'text-slate-400'}`}>
                          {rule.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {errors.password && (
                <span className="text-xs text-red-500 mt-0.5">{errors.password}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="••••••••"
                  disabled={actionLoading}
                  className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-10.5 py-2 text-sm text-slate-800 transition-all outline-none
                    placeholder:text-slate-400
                    focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-red-500 mt-0.5">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Reset password button */}
            <Button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 h-11 text-base flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Saving changes...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Go Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-500 hover:text-regentia-blue transition-colors underline-offset-4 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
