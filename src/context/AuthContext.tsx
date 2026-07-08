'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User, AuthResponse } from '@/services/auth';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  actionLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResponse>;
  signup: (fullName: string, email: string, mobileNumber: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (password: string) => Promise<AuthResponse>;
  verifyEmail: () => Promise<AuthResponse>;
  updateProfile: (fullName: string, mobileNumber: string) => Promise<AuthResponse>;
  toast: ToastMessage | null;
  triggerToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle client-side mounting and local storage load to bypass hydration differences
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedUser = localStorage.getItem('regentia_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error restoring session:', e);
        localStorage.removeItem('regentia_user');
      }
    }
    setLoading(false);
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Toast Auto-Dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const login = async (email: string, password: string, rememberMe = false): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.login(email, password, rememberMe);
      if (res.success && res.user) {
        const profileKey = `profile_${res.user.email}`;
        const savedProfileStr = localStorage.getItem(profileKey);
        const activeUser = { ...res.user };

        if (savedProfileStr) {
          try {
            const savedProfile = JSON.parse(savedProfileStr);
            activeUser.fullName = savedProfile.fullName || activeUser.fullName;
            activeUser.mobileNumber = savedProfile.mobileNumber || activeUser.mobileNumber;
          } catch (e) {
            console.error('Error parsing saved profile:', e);
          }
        } else {
          localStorage.setItem(profileKey, JSON.stringify({
            fullName: activeUser.fullName,
            mobileNumber: activeUser.mobileNumber,
            email: activeUser.email
          }));
        }

        setUser(activeUser);
        localStorage.setItem('regentia_user', JSON.stringify(activeUser));
        triggerToast('Welcome back! Login successful.', 'success');
        router.push('/');
      } else {
        triggerToast(res.message, 'error');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred during login.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, mobileNumber: string, password: string): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.signup(fullName, email, mobileNumber, password);
      if (res.success && res.user) {
        const profileKey = `profile_${res.user.email}`;
        localStorage.setItem(profileKey, JSON.stringify({
          fullName: res.user.fullName,
          mobileNumber: res.user.mobileNumber,
          email: res.user.email
        }));

        setUser(res.user);
        localStorage.setItem('regentia_user', JSON.stringify(res.user));
        triggerToast('Registration successful! Check your email to verify.', 'success');
        router.push('/email-verification');
      } else {
        triggerToast(res.message, 'error');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred during signup.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.logout();
      if (res.success) {
        setUser(null);
        localStorage.removeItem('regentia_user');
        triggerToast('You have been logged out successfully.', 'info');
        router.push('/');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred during logout.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      if (res.success) {
        triggerToast('Password reset link sent to your email.', 'success');
        router.push('/email-sent');
      } else {
        triggerToast(res.message, 'error');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const resetPassword = async (password: string): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.resetPassword(password);
      if (res.success) {
        triggerToast('Password reset successfully! Redirecting to login...', 'success');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        triggerToast(res.message, 'error');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const verifyEmail = async (): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      const res = await authService.verifyEmail();
      if (res.success) {
        triggerToast('Email address verified successfully!', 'success');
      } else {
        triggerToast(res.message, 'error');
      }
      return res;
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred during verification.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  const updateProfile = async (fullName: string, mobileNumber: string): Promise<AuthResponse> => {
    setActionLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (user) {
        const updatedUser = { ...user, fullName, mobileNumber };
        setUser(updatedUser);
        localStorage.setItem('regentia_user', JSON.stringify(updatedUser));
        localStorage.setItem(`profile_${user.email}`, JSON.stringify({
          fullName,
          mobileNumber,
          email: user.email
        }));
        triggerToast('Profile updated successfully.', 'success');
        return { success: true, message: 'Profile updated successfully.' };
      }
      return { success: false, message: 'No user session found.' };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'An error occurred updating profile.';
      triggerToast(errMsg, 'error');
      return { success: false, message: errMsg };
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        actionLoading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        updateProfile,
        toast,
        triggerToast,
        hideToast,
      }}
    >
      {children}

      {/* Render Toast Alert Overlay */}
      {mounted && toast && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full animate-fade-in-up px-4 sm:px-0">
          <div
            className={`flex items-start gap-3.5 p-4 rounded-xl shadow-xl border text-sm font-medium transition-all bg-white backdrop-blur-md ${
              toast.type === 'success'
                ? 'border-emerald-100 bg-emerald-50/95 text-emerald-900 shadow-emerald-100/40'
                : toast.type === 'error'
                ? 'border-rose-100 bg-rose-50/95 text-rose-900 shadow-rose-100/40'
                : toast.type === 'warning'
                ? 'border-amber-100 bg-amber-50/95 text-amber-900 shadow-amber-100/40'
                : 'border-slate-100 bg-slate-900/95 text-white shadow-slate-900/20'
            }`}
          >
            {/* Icons */}
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />}

            {/* Message Body */}
            <div className="flex-1 text-xs sm:text-sm font-sans leading-relaxed">
              {toast.message}
            </div>

            {/* Close Button */}
            <button
              onClick={hideToast}
              className={`p-0.5 rounded-lg transition-colors hover:bg-slate-200/50 shrink-0 ${
                toast.type === 'info' ? 'hover:bg-slate-800' : ''
              }`}
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
