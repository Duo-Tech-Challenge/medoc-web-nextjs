'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath: string;
  onLogout: () => void;
  userRole: 'admin' | 'pharmacy';
}

export default function Sidebar({
  items,
  activePath,
  onLogout,
  userRole,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">
            MEDOC {userRole === 'admin' ? 'Admin' : 'Pharmacy'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <ul className="space-y-2">
            {items.map((item) => {
              const isActive = activePath === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-5 h-5">{item.icon}</span>
                      {item.label}
                    </span>
                    {item.badge !== undefined && (
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
