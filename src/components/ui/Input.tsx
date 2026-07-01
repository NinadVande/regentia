import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  className = "",
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full h-10 rounded-lg border bg-white px-3.5 py-2 text-sm text-slate-800 transition-all outline-none
          placeholder:text-slate-400
          focus:border-regentia-blue focus:ring-2 focus:ring-regentia-blue/15
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-slate-200'}
          ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
