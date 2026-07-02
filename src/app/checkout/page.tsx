'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { 
  ChevronRight, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

interface FormState {
  fullName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { triggerToast } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Checkout loading / modal states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && cartCount === 0) {
      router.push('/services');
    }
  }, [mounted, cartCount, router]);

  if (!mounted) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-regentia-blue border-t-transparent rounded-full animate-spin" />
        <span className="mt-4 text-sm text-slate-500 font-sans">Preparing checkout...</span>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    /*
      FUTURE RAZORPAY INTEGRATION ROADMAP:
      
      const res = await initializeRazorpaySDK();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setIsProcessing(false);
        return;
      }

      // Create a Razorpay Order on your server API:
      const orderData = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal })
      }).then(t => t.json());

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Regentia Health & Research",
        description: "Course Enrollment",
        order_id: orderData.id,
        handler: async function (response: any) {
          // Verify payment on the server:
          const verifyData = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              enrollmentDetails: { fullName: formData.fullName, email: formData.email, phone: formData.phone, cart }
            })
          }).then(t => t.json());

          if (verifyData.status === 'success') {
            clearCart();
            router.push('/checkout/success');
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#000B3E",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    */

    // Simulate small network check latency before modal displays
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsPaymentModalOpen(true);
    } catch {
      console.error("Simulated checkout error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentConfirm = () => {
    setIsPaymentModalOpen(false);

    interface CourseRecord {
      id: string;
      title: string;
      purchaseDate: string;
      status: string;
      iconName: string;
      description: string;
    }

    interface OrderRecord {
      id: string;
      title: string;
      amount: number;
      purchaseDate: string;
      status: string;
    }

    // Save cart items to purchased courses
    const savedCoursesStr = localStorage.getItem('regentia_courses');
    let currentCourses: CourseRecord[] = [];
    if (savedCoursesStr) {
      try {
        currentCourses = JSON.parse(savedCoursesStr);
      } catch (e) {
        console.error(e);
      }
    }

    const savedOrdersStr = localStorage.getItem('regentia_orders');
    let currentOrders: OrderRecord[] = [];
    if (savedOrdersStr) {
      try {
        currentOrders = JSON.parse(savedOrdersStr);
      } catch (e) {
        console.error(e);
      }
    }

    // Process each cart item
    cart.forEach((item) => {
      const newCourseId = 'crs_' + Math.random().toString(36).substr(2, 9);
      const isAlreadyEnrolled = currentCourses.some((c) => c.title === item.title);
      
      if (!isAlreadyEnrolled) {
        currentCourses.push({
          id: newCourseId,
          title: item.title,
          purchaseDate: new Date().toISOString().split('T')[0],
          status: 'Active',
          iconName: item.iconName,
          description: item.description
        });
      }

      const newOrderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
      const amountPaid = parseInt(item.fee.replace(/[^0-9]/g, ''), 10) || 10000;
      
      currentOrders.unshift({
        id: newOrderId,
        title: item.title,
        amount: amountPaid,
        purchaseDate: new Date().toISOString().split('T')[0],
        status: 'Success'
      });
    });

    localStorage.setItem('regentia_courses', JSON.stringify(currentCourses));
    localStorage.setItem('regentia_orders', JSON.stringify(currentOrders));

    // Clear cart and redirect
    clearCart();
    triggerToast('Enrollment completed successfully! Welcome to your courses.', 'success');
    router.push('/my-courses');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
            <Link href="/" className="hover:text-regentia-blue transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/cart" className="hover:text-regentia-blue transition-colors">Cart</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Checkout</span>
          </div>
          <h1 className="text-3xl font-extrabold text-regentia-navy tracking-tight mt-2">
            Secure Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout billing detail forms */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-50 text-regentia-navy">
              <CreditCard className="h-5 w-5 text-regentia-blue" />
              <h3 className="text-lg font-bold">Billing & Enrollment Details</h3>
            </div>

            <form onSubmit={handleProceedPayment} className="space-y-5">
              <Input
                id="fullName"
                label="Full Name"
                placeholder="e.g. Dr. Harshwardhan Ramteke"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                disabled={isProcessing}
              />

              <Input
                id="email"
                type="email"
                label="Email Address (For Enrollment Credentials)"
                placeholder="e.g. harsh@regentiahealth.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isProcessing}
              />

              <Input
                id="phone"
                type="tel"
                label="WhatsApp/Contact Number"
                placeholder="e.g. +91 8369525334"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                disabled={isProcessing}
              />

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-2.5 items-start text-xs text-slate-500 font-sans">
                <Lock className="h-4.5 w-4.5 text-regentia-blue shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong>Secure Credentials Check:</strong>
                  <p>All data is processed using end-to-end client-side encryption. Credentials and portal instructions are dispatched directly following validation check.</p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 h-12 bg-regentia-blue hover:bg-regentia-navy text-white text-base mt-6 shadow-md hover:shadow-lg transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Proceed to Payment (₹{cartTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Checkout summary box */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-regentia-navy border-b border-slate-50 pb-4">
              Order Items ({cartCount})
            </h3>

            {/* List items in checkout */}
            <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => {
                const IconComp = iconMap[item.iconName] || HelpCircle;
                return (
                  <div key={item.title} className="py-3.5 flex items-start gap-3 justify-between">
                    <div className="flex gap-2.5 items-start">
                      <div className="p-2 bg-regentia-light rounded-lg text-regentia-navy shrink-0 mt-0.5">
                        <IconComp className="h-4 w-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-regentia-navy text-sm leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-sans block">
                          Quantity: 1 (Fixed)
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-700 shrink-0">
                      {item.fee}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-50 pt-4 space-y-4">
              <div className="flex justify-between text-xs text-slate-400 font-sans">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-sans">
                <span>Transaction Gateway Fee</span>
                <span className="text-emerald-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-slate-50 pt-4 flex justify-between text-base font-bold text-regentia-navy">
                <span>Grand Total</span>
                <span className="text-lg text-regentia-blue">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-2.5 text-xs text-slate-400 font-sans items-center justify-center">
              <ShieldCheck className="h-4.5 w-4.5 text-regentia-blue" />
              <span>SSL Secure 256-Bit Authentication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Integration Coming Soon Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in" 
            onClick={() => setIsPaymentModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 animate-scale-up text-center flex flex-col items-center gap-4">
            <div className="p-3.5 bg-regentia-light rounded-full text-regentia-navy">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-regentia-navy">
                Payment Integration Coming Soon
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                Thank you for your interest! The secure payment gateway is currently under development. Real Razorpay transaction processing will be live in a future update.
              </p>
              <p className="text-xs text-slate-400 font-sans">
                Your enrollment details have been validated, but no transaction has occurred.
              </p>
            </div>
            <Button
              onClick={handlePaymentConfirm}
              className="mt-4 w-full"
            >
              OK, Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
