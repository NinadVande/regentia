'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  title: string;
  fee: string;
  iconName: string;
  description: string;
}

export interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => boolean; // Returns true if added, false if duplicate
  removeFromCart: (title: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  toast: ToastState | null;
  triggerToast: (message: string, type: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('regentia_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('regentia_cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const triggerToast = (message: string, type: 'success' | 'info' | 'warning') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (item: CartItem) => {
    const exists = cart.some((cartItem) => cartItem.title === item.title);
    if (exists) {
      triggerToast('This course is already in your cart.', 'warning');
      return false;
    }
    setCart((prev) => [...prev, item]);
    triggerToast(`"${item.title}" successfully added to cart.`, 'success');
    return true;
  };

  const removeFromCart = (title: string) => {
    setCart((prev) => prev.filter((item) => item.title !== title));
    triggerToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    triggerToast('Cart cleared.', 'info');
  };

  // Helper to parse price string to number: "₹10,000" -> 10000
  const getNumericPrice = (priceStr: string) => {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((sum, item) => sum + getNumericPrice(item.fee), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        toast,
        triggerToast,
        hideToast,
      }}
    >
      {children}
      {/* Toast Notification HUD */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl border text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                : toast.type === 'warning'
                ? 'bg-amber-50 border-amber-100 text-amber-800'
                : 'bg-slate-900 border-slate-800 text-white'
            }`}
          >
            {toast.type === 'success' && (
              <svg className="h-5 w-5 text-emerald-500 shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.type === 'warning' && (
              <svg className="h-5 w-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="h-5 w-5 text-regentia-blue shrink-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{toast.message}</span>
            <button
              onClick={hideToast}
              className="ml-2 hover:opacity-70 transition-opacity"
              aria-label="Dismiss toast"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
