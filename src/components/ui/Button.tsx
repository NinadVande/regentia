import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'white';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

export default function Button({
  className = "",
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-regentia-blue/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  
  const variants = {
    default: "bg-regentia-navy text-white hover:bg-regentia-blue hover:shadow-lg hover:shadow-regentia-blue/10",
    outline: "border border-slate-200 bg-transparent text-regentia-navy hover:bg-slate-50 hover:border-slate-300",
    secondary: "bg-regentia-light text-regentia-blue hover:bg-regentia-light/80",
    ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
    link: "text-regentia-blue underline-offset-4 hover:underline bg-transparent p-0 h-auto",
    white: "bg-white text-regentia-navy hover:bg-slate-50 hover:shadow-lg hover:shadow-white/10"
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-sm md:text-base",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
