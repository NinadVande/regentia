'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingCart, 
  ChevronRight, 
  AlertCircle,
  Network,
  BarChart3,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-regentia-blue border-t-transparent rounded-full animate-spin" />
        <span className="mt-4 text-sm text-slate-500 font-sans">Loading your cart...</span>
      </div>
    );
  }

  const handleRemoveConfirm = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
  };

  const handleClearConfirm = () => {
    clearCart();
    setIsClearCartModalOpen(false);
  };

  if (cartCount === 0) {
    return (
      <div className="w-full flex flex-col min-h-[70vh] bg-white py-16 md:py-24">
        <div className="max-w-md mx-auto px-6 text-center flex flex-col items-center gap-6">
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-full shadow-inner relative text-slate-400">
            <ShoppingCart className="h-16 w-16 stroke-1.5" />
            <span className="absolute -top-1 -right-1 bg-slate-200 h-5 w-5 rounded-full text-xs font-bold text-slate-500 flex items-center justify-center border-2 border-white">
              0
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-regentia-navy">Your cart is currently empty</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-sm">
              You haven't added any professional research courses or support programs to your cart yet.
            </p>
          </div>

          <Link href="/services" className="mt-4">
            <Button size="lg" className="flex items-center gap-2">
              <span>Browse Courses</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
            <Link href="/" className="hover:text-regentia-blue transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services" className="hover:text-regentia-blue transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-600 font-medium">Cart</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <h1 className="text-3xl font-extrabold text-regentia-navy tracking-tight">
              Review Your Cart <span className="text-lg font-medium text-slate-400">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsClearCartModalOpen(true)}
              className="text-red-600 hover:text-red-700 border-slate-200 hover:border-red-100 hover:bg-red-50 flex items-center gap-1.5 self-start sm:self-center"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Cart</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const IconComp = iconMap[item.iconName] || HelpCircle;
              return (
                <div 
                  key={item.title} 
                  className="bg-white border border-slate-100/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 hover:border-regentia-blue/10 transition-all duration-300 group"
                >
                  <div className="flex items-center sm:items-start gap-4">
                    <div className="p-3 bg-regentia-light rounded-xl text-regentia-navy shrink-0">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="font-bold text-regentia-navy text-base leading-snug group-hover:text-regentia-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
                        <span className="text-slate-400 font-sans">Quantity: 1 (Fixed digital license)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t border-slate-50 sm:border-0 shrink-0">
                    <span className="text-base font-bold text-regentia-blue">
                      {item.fee}
                    </span>
                    <button
                      onClick={() => setItemToRemove(item.title)}
                      className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Remove course"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* License disclaimer card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-500 font-sans">
              <AlertCircle className="h-5 w-5 text-slate-400 shrink-0" />
              <p>
                <strong>Digital License Note:</strong> These research courses and programs are digital credentials. Per our corporate guidelines, purchase is restricted to a single license per client account. Duplicate licenses of the same course are disabled.
              </p>
            </div>
          </div>

          {/* Cart summary box */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-regentia-navy border-b border-slate-50 pb-4">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm font-sans">
              <div className="flex justify-between text-slate-500">
                <span>Total Courses</span>
                <span className="font-semibold text-slate-700">{cartCount}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-700">₹{(cartTotal).toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-slate-50 pt-4 flex justify-between text-base font-bold text-regentia-navy">
                <span>Grand Total</span>
                <span className="text-lg text-regentia-blue">₹{(cartTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link href="/checkout" className="block pt-2">
              <Button size="lg" className="w-full flex items-center justify-center gap-2">
                <span>Proceed to Payment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/services" className="block text-center text-xs text-slate-400 hover:text-regentia-blue transition-colors font-sans">
              ← Continue Browsing
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={itemToRemove !== null}
        onClose={() => setItemToRemove(null)}
        onConfirm={handleRemoveConfirm}
        title="Remove Course?"
        description={`Are you sure you want to remove "${itemToRemove}" from your cart?`}
        confirmText="Remove"
        type="danger"
      />

      <ConfirmationModal
        isOpen={isClearCartModalOpen}
        onClose={() => setIsClearCartModalOpen(false)}
        onConfirm={handleClearConfirm}
        title="Clear All Cart Items?"
        description="Are you sure you want to empty your shopping cart? This will delete all pending courses."
        confirmText="Clear Cart"
        type="danger"
      />
    </div>
  );
}
