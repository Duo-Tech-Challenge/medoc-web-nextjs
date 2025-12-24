'use client';

import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Settings } from 'lucide-react';
import DashboardLayout from '@/components/organisms/DashboardLayout';

const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/pharmacy',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Inventory',
    href: '/pharmacy/inventory',
    icon: <Package size={20} />,
  },
  {
    label: 'Orders',
    href: '/pharmacy/orders',
    icon: <ShoppingCart size={20} />,
    badge: 3,
  },
  {
    label: 'Settings',
    href: '/pharmacy/settings',
    icon: <Settings size={20} />,
  },
];

export default function PharmacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      userEmail="pharma@medoc.com"
      userRole="pharmacy"
      notificationCount={3}
      onLogout={() => console.log('logout')}
    >
      {children}
    </DashboardLayout>
  );
}
