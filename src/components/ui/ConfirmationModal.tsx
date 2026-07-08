'use client';

import React from 'react';
import Button from './Button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-1.5 rounded-lg transition-all"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`p-3.5 rounded-full ${
            type === 'danger' 
              ? 'bg-red-50 text-red-500' 
              : type === 'warning'
              ? 'bg-amber-50 text-amber-500'
              : 'bg-regentia-light text-regentia-blue'
          }`}>
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-regentia-navy">
              {title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              {description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:order-1"
          >
            {cancelText}
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:order-2 ${
              type === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-500/10'
                : type === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700 text-white hover:shadow-amber-500/10'
                : ''
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
