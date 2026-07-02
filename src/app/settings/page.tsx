'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/ui/Button';
import { 
  Lock, 
  Bell, 
  Trash2, 
  Loader2, 
  CheckCircle2, 
  X, 
  Eye, 
  EyeOff, 
  Moon, 
  Sun,
  ShieldAlert
} from 'lucide-react';

export default function SettingsPage() {
  const { logout, triggerToast } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Preference fields
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [studyNotif, setStudyNotif] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      setPasswordError('Current Password is required.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Confirm Password does not match new password.');
      return;
    }

    setIsSavingPassword(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSavingPassword(false);
    
    // Reset inputs
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    triggerToast('Password changed successfully!', 'success');
  };

  const handleDeleteAccount = async () => {
    setIsDeleteModalOpen(false);
    // Delete account routine
    triggerToast('Account deleted successfully.', 'warning');
    // Call logout to clear mock session and redirect to Home
    logout();
  };

  const handleSavePreferences = () => {
    triggerToast('Preferences saved successfully.', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left font-sans pb-12">
        {/* Header Block */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
          <h1 className="text-xl font-extrabold text-regentia-navy tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-400 mt-1 font-sans">Configure your privacy, updates, preferences, and account controls.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column Left: Change Password Form */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-regentia-navy">
              <Lock className="h-4.5 w-4.5 text-regentia-blue" />
              <h3 className="text-sm md:text-base font-extrabold">Change Password</h3>
            </div>

            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
              {passwordError && (
                <div className="p-2.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold">
                  {passwordError}
                </div>
              )}

              {/* Current Password */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    placeholder="Current Password"
                    disabled={isSavingPassword}
                    className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 pr-10 py-2 text-sm text-slate-800 transition-all outline-none focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    placeholder="New Password"
                    disabled={isSavingPassword}
                    className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 pr-10 py-2 text-sm text-slate-800 transition-all outline-none focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    placeholder="Confirm Password"
                    disabled={isSavingPassword}
                    className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 pr-10 py-2 text-sm text-slate-800 transition-all outline-none focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSavingPassword}
                className="w-full h-10 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                {isSavingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Updating password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Change Password</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Column Right: Preferences & Danger Zone */}
          <div className="space-y-6">
            {/* Preferences Panel */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm shadow-slate-100/50 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-50 text-regentia-navy">
                <Bell className="h-4.5 w-4.5 text-regentia-blue" />
                <h3 className="text-sm md:text-base font-extrabold">Preferences</h3>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Notifications</p>
                <div className="space-y-2.5">
                  <div className="flex items-center">
                    <input
                      id="email-notif"
                      type="checkbox"
                      checked={emailNotif}
                      onChange={(e) => setEmailNotif(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-regentia-blue focus:ring-regentia-blue/20"
                    />
                    <label htmlFor="email-notif" className="ml-2 block text-xs font-semibold text-slate-500 select-none">
                      Email alerts for new study credentials
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="sms-notif"
                      type="checkbox"
                      checked={smsNotif}
                      onChange={(e) => setSmsNotif(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-regentia-blue focus:ring-regentia-blue/20"
                    />
                    <label htmlFor="sms-notif" className="ml-2 block text-xs font-semibold text-slate-500 select-none">
                      WhatsApp/SMS research status messages
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="study-notif"
                      type="checkbox"
                      checked={studyNotif}
                      onChange={(e) => setStudyNotif(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-regentia-blue focus:ring-regentia-blue/20"
                    />
                    <label htmlFor="study-notif" className="ml-2 block text-xs font-semibold text-slate-500 select-none">
                      Updates on collaborative projects
                    </label>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Display Theme</p>
                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    onClick={() => setTheme('light')}
                    className={`h-10 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      theme === 'light'
                        ? 'border-regentia-blue bg-regentia-light text-regentia-blue'
                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    <span>Light Mode</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`h-10 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      theme === 'dark'
                        ? 'border-regentia-blue bg-regentia-light text-regentia-blue'
                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    <span>Dark Mode</span>
                  </button>
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="w-full text-xs h-9">
                Save Preferences
              </Button>
            </div>

            {/* Danger Zone Panel */}
            <div className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm shadow-rose-100/10 space-y-4 bg-rose-50/10">
              <div className="flex items-center gap-2 pb-3 border-b border-rose-50 text-rose-800">
                <Trash2 className="h-4.5 w-4.5 text-rose-500" />
                <h3 className="text-sm md:text-base font-extrabold">Danger Zone</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Once deleted, your account credentials, purchased course access, progress trackers, and receipts will be permanently cleared from the local workspace.
              </p>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full bg-rose-600 text-white hover:bg-rose-700 hover:shadow-rose-100/10 text-xs font-semibold h-10 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Workspace Account</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in" 
            onClick={() => setIsDeleteModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 animate-scale-up text-center flex flex-col items-center gap-4">
            <div className="p-3 bg-rose-100/60 rounded-full text-rose-600">
              <ShieldAlert className="h-8 w-8 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-regentia-navy">
                Delete Account Permanently?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Are you absolutely sure? This action is irreversible. All course progress and credentials stored locally will be permanently wiped.
              </p>
            </div>
            <div className="mt-4 flex gap-3 w-full">
              <Button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                variant="outline"
                className="w-full h-11 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1"
              >
                <X className="h-4.5 w-4.5" />
                <span>Cancel</span>
              </Button>
              <Button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full h-11 bg-rose-600 text-white hover:bg-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1"
              >
                <Trash2 className="h-4.5 w-4.5" />
                <span>Delete Now</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
