'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/molecules/Sidebar';
import TopBar from '@/components/molecules/TopBar';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: Array<{
    label: string;
    href: string;
    icon: ReactNode;
    badge?: number;
  }>;
  userEmail: string;
  userRole: 'admin' | 'pharmacy';
  notificationCount?: number;
  onLogout: () => void;
}

export default function DashboardLayout({
  children,
  sidebarItems,
  userEmail,
  userRole,
  notificationCount = 0,
  onLogout,
}: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activePath={pathname}
        onLogout={onLogout}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* TopBar */}
        <TopBar
          userEmail={userEmail}
          userRole={userRole}
          notificationCount={notificationCount}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
