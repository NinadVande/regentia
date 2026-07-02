'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, ChevronRight, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  title: string;
  amount: number;
  purchaseDate: string;
  status: 'Success' | 'Pending' | 'Failed';
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (user?.email) {
      const savedOrders = localStorage.getItem(`orders_${user.email}`);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (e) {
          console.error('Error loading orders:', e);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } else {
      setOrders([]);
    }
  }, [user]);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left font-sans">
        {/* Header Block */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-regentia-navy tracking-tight">Order History</h1>
            <p className="text-xs text-slate-400 mt-1 font-sans">View transaction receipts, invoices, and billing history.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
            <div className="h-20 w-20 rounded-full bg-regentia-light flex items-center justify-center text-regentia-blue mb-5">
              <ShoppingBag className="h-10 w-10 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-regentia-navy">No order records found</h3>
            <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed font-sans">
              You haven&apos;t placed any orders yet. Visit our services page to enroll in medical research programs.
            </p>
            <Link href="/services" className="mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Browse Programs</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          /* Table of Orders (Desktop) & Cards List (Mobile) */
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Course/Service</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Purchase Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4.5 font-mono text-xs text-slate-400 font-bold">{order.id}</td>
                      <td className="px-6 py-4.5 text-regentia-navy font-extrabold">{order.title}</td>
                      <td className="px-6 py-4.5 text-slate-600 font-mono">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4.5 text-slate-500 font-normal font-sans">
                        {new Date(order.purchaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4.5">
                        <span 
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            order.status === 'Success' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : order.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                              : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}
                        >
                          {order.status === 'Success' && <CheckCircle2 className="h-3 w-3" />}
                          {order.status === 'Pending' && <RefreshCw className="h-3 w-3 animate-spin" />}
                          {order.status === 'Failed' && <AlertCircle className="h-3 w-3" />}
                          <span>{order.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-center">
                        <button className="p-2 hover:bg-slate-100 text-regentia-blue hover:text-regentia-navy rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 text-xs">
                          <FileText className="h-4 w-4" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List View */}
            <div className="block md:hidden divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order.id} className="p-5 space-y-4 hover:bg-slate-50/20 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-extrabold text-regentia-navy text-sm leading-snug">{order.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1 font-bold">Order: {order.id}</p>
                    </div>
                    <span 
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'Success' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                          : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}
                    >
                      <span>{order.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-slate-50">
                    <div>
                      <span className="text-slate-400 font-medium font-sans">Amount Paid</span>
                      <p className="font-bold text-slate-700 mt-0.5 font-mono">₹{order.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium font-sans">Purchase Date</span>
                      <p className="font-bold text-slate-700 mt-0.5 font-sans">
                        {new Date(order.purchaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button className="w-full sm:w-auto h-9 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold text-regentia-blue flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span>Download Receipt Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
