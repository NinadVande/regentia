'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2, ArrowRight, Check } from 'lucide-react';
import { isValidEmail, isValidMobile, checkPasswordStrength } from '@/services/auth';

export default function SignupPage() {
  const { signup, actionLoading } = useAuth();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Live password strength calculated dynamically during render
  const strength = checkPasswordStrength(password);

  // Error states
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
    general?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters.';
    }

    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!isValidMobile(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (strength.score < 2) {
      newErrors.password = 'Please enter a stronger password (at least Fair).';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must accept the Terms and Conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await signup(fullName, email, mobileNumber, password);
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
    <div className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-slate-50/30 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-regentia-light/40 blur-3xl opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-slate-200/40 blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg z-10"
      >
        {/* Logo and Headings */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Logo className="mb-4" />
          </Link>
          <h2 className="text-2xl font-extrabold text-regentia-navy tracking-tight mt-2 text-center">
            Create your account
          </h2>
          <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
            Start learning, participating in collaborative research, or scaling your studies.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold animate-pulse-slow">
                {errors.general}
              </div>
            )}

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4.5 w-4.5" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="John Doe"
                  disabled={actionLoading}
                  className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-3.5 py-2 text-sm text-slate-800 transition-all outline-none
                    placeholder:text-slate-400
                    focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                />
              </div>
              {errors.fullName && (
                <span className="text-xs text-red-500 mt-0.5">{errors.fullName}</span>
              )}
            </div>

            {/* Email & Mobile Side by Side on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

              {/* Mobile Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mobileNumber" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="mobileNumber"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      if (errors.mobileNumber) setErrors(prev => ({ ...prev, mobileNumber: undefined }));
                    }}
                    placeholder="9876543210"
                    disabled={actionLoading}
                    className={`w-full h-11 rounded-lg border bg-white pl-10.5 pr-3.5 py-2 text-sm text-slate-800 transition-all outline-none
                      placeholder:text-slate-400
                      focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${errors.mobileNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}`}
                  />
                </div>
                {errors.mobileNumber && (
                  <span className="text-xs text-red-500 mt-0.5">{errors.mobileNumber}</span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Password
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
                <div className="mt-2 space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
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
                Confirm Password
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

            {/* Accept Terms checkbox */}
            <div className="flex flex-col gap-1">
              <div className="flex items-start">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.agreeTerms) setErrors(prev => ({ ...prev, agreeTerms: undefined }));
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-regentia-blue focus:ring-regentia-blue/20"
                />
                <label htmlFor="agree-terms" className="ml-2.5 text-xs text-slate-500 leading-normal select-none font-medium">
                  I accept the{' '}
                  <Link href="/terms" className="font-bold text-regentia-blue hover:text-regentia-navy transition-colors">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-bold text-regentia-blue hover:text-regentia-navy transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeTerms && (
                <span className="text-xs text-red-500 mt-0.5 ml-6.5">{errors.agreeTerms}</span>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={actionLoading}
              className="w-full py-3 h-11 text-base flex items-center justify-center gap-2"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Link to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="font-bold text-regentia-blue hover:text-regentia-navy transition-colors underline-offset-4 hover:underline text-xs"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
