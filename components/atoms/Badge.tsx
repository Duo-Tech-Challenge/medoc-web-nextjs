'use client';

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', size = 'md', className = '', children, ...props }) => {
  const variantStyles = {
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    danger: 'bg-red-100 text-red-800 border border-red-300',
    info: 'bg-blue-100 text-blue-800 border border-blue-300',
    default: 'bg-gray-100 text-gray-800 border border-gray-300',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs font-medium rounded',
    md: 'px-3 py-1.5 text-sm font-medium rounded',
    lg: 'px-4 py-2 text-base font-medium rounded-lg',
  };

  return (
    <span className={`inline-block ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};
