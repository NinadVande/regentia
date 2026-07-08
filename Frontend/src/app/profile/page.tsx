'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { User as UserIcon, Mail, Phone, Shield, Edit2, CheckCircle2, X } from 'lucide-react';
import { isValidMobile } from '@/services/auth';

export default function ProfilePage() {
  const { user, updateProfile, actionLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || '');
  const [error, setError] = useState<string | null>(null);

  if (!user) return null; // DashboardLayout redirects automatically

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || fullName.trim().length < 2) {
      setError('Full Name must be at least 2 characters.');
      return;
    }

    if (!isValidMobile(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const res = await updateProfile(fullName.trim(), mobileNumber);
    if (res.success) {
      setIsEditing(false);
    } else {
      setError(res.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100 p-6 md:p-8 space-y-6 text-left">
        {/* Header Block */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-xl font-extrabold text-regentia-navy tracking-tight">My Profile</h1>
            <p className="text-xs text-slate-400 mt-1 font-sans">Manage your personal details and academic credentials.</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => {
                setFullName(user.fullName);
                setMobileNumber(user.mobileNumber);
                setIsEditing(true);
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>

        {isEditing ? (
          /* Editing Form state */
          <form onSubmit={handleSave} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                id="edit-fullname"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={actionLoading}
              />
              <Input
                id="edit-mobile"
                label="Mobile Number"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setError(null);
                }}
                variant="outline"
                disabled={actionLoading}
                className="flex items-center gap-1.5"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                disabled={actionLoading}
                className="flex items-center gap-1.5"
              >
                {actionLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          /* View state profile information details */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Left Detail Panel */}
            <div className="space-y-4">
              <div className="flex gap-4.5 items-start">
                <div className="p-2.5 bg-regentia-light rounded-xl text-regentia-blue shrink-0">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Full Name</p>
                  <p className="text-base font-bold text-regentia-navy mt-0.5">{user.fullName}</p>
                </div>
              </div>

              <div className="flex gap-4.5 items-start">
                <div className="p-2.5 bg-regentia-light rounded-xl text-regentia-blue shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email Address</p>
                  <p className="text-base font-bold text-regentia-navy mt-0.5">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Right Detail Panel */}
            <div className="space-y-4">
              <div className="flex gap-4.5 items-start">
                <div className="p-2.5 bg-regentia-light rounded-xl text-regentia-blue shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mobile Number</p>
                  <p className="text-base font-bold text-regentia-navy mt-0.5">+91 {user.mobileNumber}</p>
                </div>
              </div>

              <div className="flex gap-4.5 items-start">
                <div className="p-2.5 bg-regentia-light rounded-xl text-regentia-blue shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Academic Role</p>
                  <p className="text-base font-bold text-regentia-navy mt-0.5">{user.role || 'RESEARCHER'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
