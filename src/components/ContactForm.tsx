'use client';

import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization or Institute is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-slate-50 border border-emerald-100 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 animate-fade-in-up">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
        <h3 className="text-xl font-bold text-regentia-navy">Message Sent Successfully</h3>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
          Thank you for reaching out to REGENTIA HEALTH AND RESEARCH PRIVATE LIMITED. Our research collaboration and communications team will contact you shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitStatus('idle')}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-100/80 rounded-2xl p-6 md:p-8 shadow-md shadow-slate-100/50">
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 text-red-700 text-sm items-center">
          <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Full Name"
          placeholder="e.g. Dr. Jane Smith"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="e.g. jane.smith@institute.org"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="e.g. +91 9876543210"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          id="organization"
          label="Organization / Institute"
          placeholder="e.g. Nagpur Medical College"
          value={formData.organization}
          onChange={handleChange}
          error={errors.organization}
        />
      </div>

      <Textarea
        id="message"
        label="Message"
        placeholder="Please describe your research inquiry, collaboration proposal, or question in detail..."
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 h-11"
      >
        <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Message'}</span>
        {!isSubmitting && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
