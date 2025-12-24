'use client';

import React from 'react';
import { BarChart3, Users, FileText } from 'lucide-react';
import DashboardLayout from '@/components/organisms/DashboardLayout';

const sidebarItems = [
  {
    label: 'Overview',
    href: '/admin',
    icon: <BarChart3 size={20} />,
  },
  {
    label: 'Pharmacies',
    href: '/admin/pharmacies',
    icon: <Users size={20} />,
  },
  {
    label: 'Requests',
    href: '/admin/requests',
    icon: <FileText size={20} />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    // TODO: Implement logout logic
    alert('Logout clicked');
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      userEmail="admin@medoc.com"
      userRole="admin"
      notificationCount={5}
      onLogout={handleLogout}
    >
      {children}
    </DashboardLayout>
  );
}
