'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
  ShoppingCart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Network,
  BarChart3,
  BookOpen,
  HelpCircle,
};

interface ServiceCardProps {
  title: string;
  description: string;
  fee: string;
  iconName: string;
  features?: string[];
  isDetailed?: boolean;
}

export default function ServiceCard({
  title,
  description,
  fee,
  iconName,
  features = [],
  isDetailed = false,
}: ServiceCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const IconComponent = iconMap[iconName] || HelpCircle;

  const handleAddToCart = () => {
    addToCart({ title, fee, iconName, description });
  };

  const handleBuyNow = () => {
    addToCart({ title, fee, iconName, description });
    router.push('/checkout');
  };

  if (isDetailed) {
    return (
      <Card className="p-8 border-slate-100/80 bg-white hover:border-regentia-blue/20 hover:shadow-lg hover:shadow-regentia-blue/5 flex flex-col justify-between gap-6 group animate-fade-in-up">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-regentia-light rounded-xl text-regentia-navy group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
                <IconComponent className="h-6 w-6" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-regentia-navy group-hover:text-regentia-blue transition-colors">
                {title}
              </h3>
            </div>
            
            {/* Fee Badge */}
            <span className="text-sm font-extrabold text-regentia-blue bg-regentia-light px-3 py-1 rounded-full whitespace-nowrap">
              {fee}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-sans">
            {description}
          </p>

          {/* Features List */}
          {features.length > 0 && (
            <div className="space-y-2 mt-2">
              <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Key Modules & Focus</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-sans">
                {features.map((feat) => (
                  <li key={feat} className="flex gap-2 items-center">
                    <CheckCircle2 className="h-4 w-4 text-regentia-blue shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4 mt-4">
          <Button 
            variant="outline" 
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2.5 text-xs md:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
          <Button 
            variant="default" 
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-1.5 py-2.5 text-xs md:text-sm bg-regentia-navy text-white hover:bg-regentia-blue"
          >
            <span>Buy Now</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  // Compact card representation (e.g. for Home Page grid)
  return (
    <Card className="p-6 bg-white border-slate-100 flex flex-col justify-between h-full group hover:border-regentia-blue/20">
      <div>
        <div className="flex justify-between items-start gap-2 mb-5">
          <div className="p-2.5 rounded-lg bg-regentia-light text-regentia-navy group-hover:bg-regentia-blue group-hover:text-white transition-colors duration-300">
            <IconComponent className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-regentia-blue bg-regentia-light px-2.5 py-0.5 rounded-full">
            {fee}
          </span>
        </div>
        <h4 className="font-bold text-regentia-navy group-hover:text-regentia-blue transition-colors text-base mb-2 leading-snug">
          {title}
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed font-sans mb-4">
          {description}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-1 text-[11px] py-2 h-9 px-2"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>Add to Cart</span>
        </Button>
        <Button 
          variant="default" 
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-1 text-[11px] py-2 h-9 px-2 animate-pulse hover:animate-none"
        >
          <span>Buy Now</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
