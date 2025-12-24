'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold text-gray-900">Médoc.</div>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Médoc. All rights reserved.</p>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">Login</Link>
          <Link href="/auth/register" className="text-sm text-gray-600 hover:text-gray-900">Join</Link>
          <Link href="/pages/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
