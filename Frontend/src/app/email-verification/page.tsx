'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { Loader2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function EmailVerificationPage() {
  const { verifyEmail } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const performVerification = async () => {
      const res = await verifyEmail();
      if (res.success) {
        setVerified(true);
      }
    };
    performVerification();
  }, [verifyEmail]);

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
          {!verified ? (
            <>
              {/* Checking State */}
              <div className="relative h-20 w-20 mb-6 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-regentia-blue animate-spin" />
                <div className="absolute inset-0 rounded-full border-2 border-slate-100 border-t-regentia-blue animate-pulse" />
              </div>

              <h2 className="text-xl font-extrabold text-regentia-navy tracking-tight mb-2">
                Verifying your email...
              </h2>
              
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-sans">
                Please wait a moment while we validate your security credentials and set up your research workspace.
              </p>
            </>
          ) : (
            <>
              {/* Verified State */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="h-20 w-20 mb-6 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100"
              >
                <ShieldCheck className="h-10 w-10 text-emerald-600 animate-bounce" />
              </motion.div>

              <h2 className="text-2xl font-extrabold text-regentia-navy tracking-tight mb-2">
                Email Verified!
              </h2>
              
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6 font-sans">
                Thank you. Your email address has been successfully validated. You now have full access to Regentia.
              </p>

              <Link href="/" className="w-full">
                <Button className="w-full py-3 h-11 text-sm font-semibold flex items-center justify-center gap-2">
                  <span>Go to Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
