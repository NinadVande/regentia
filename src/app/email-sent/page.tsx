'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { ArrowLeft, Send, CheckCircle2, RotateCcw } from 'lucide-react';

export default function EmailSentPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-slate-50/30 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-regentia-light/40 blur-3xl opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-slate-200/40 blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md z-10 text-center"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Logo className="mb-4" />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/70 p-8 flex flex-col items-center">
          {/* Animated Illustration */}
          <div className="relative h-24 w-24 mb-6 flex items-center justify-center rounded-full bg-regentia-light">
            <Send className="h-10 w-10 text-regentia-blue animate-pulse" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-emerald-100 shadow-sm"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            </motion.div>
          </div>

          <h2 className="text-2xl font-extrabold text-regentia-navy tracking-tight mb-3">
            Check your email
          </h2>
          
          <p className="text-sm text-slate-500 leading-relaxed mb-6 font-sans">
            We&apos;ve sent a password recovery link to your inbox. Follow the directions in the email to set a new password.
          </p>

          <div className="w-full space-y-3">
            <Link href="/login" className="w-full block">
              <Button className="w-full py-3 h-11 text-sm font-semibold flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Login</span>
              </Button>
            </Link>

            <button
              onClick={handleResend}
              disabled={resending || resent}
              className="w-full h-11 border border-slate-100 bg-white hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              {resending ? (
                <>
                  <RotateCcw className="h-4 w-4 animate-spin text-regentia-blue" />
                  <span>Resending instructions...</span>
                </>
              ) : resent ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Email sent successfully!</span>
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  <span>Didn&apos;t receive email? Resend link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
