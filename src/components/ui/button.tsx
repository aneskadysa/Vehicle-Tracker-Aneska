// src/components/ui/button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  size?: 'default' | 'icon';
}

export const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

  const variants = {
    default: 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]',
    outline: 'border border-[#4B4B4B] text-white hover:bg-[#3A3A3A]',
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
