'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg ${className}`} {...props}>
      {children}
    </div>
  );
};
