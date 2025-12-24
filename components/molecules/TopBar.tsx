'use client';

import { useState } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';

interface TopBarProps {
  userEmail: string;
  userRole: string;
  notificationCount?: number;
  onProfileClick?: () => void;
}

export default function TopBar({
  userEmail,
  userRole,
  notificationCount = 0,
  onProfileClick,
}: TopBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="fixed md:relative top-0 left-0 right-0 md:left-64 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30 md:z-20">
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Welcome back,</p>
        <p className="text-sm font-semibold text-gray-900">
          {userEmail.split('@')[0]}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={18} className="text-blue-600" />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <p className="text-xs text-gray-600">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </p>
              <p className="text-sm font-medium text-gray-900">{userEmail}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={() => {
                  onProfileClick?.();
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm font-medium border-b border-gray-200"
              >
                Profile Settings
              </button>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
