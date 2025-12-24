'use client';


import Link from 'next/link';
import { Button, Input } from '@/components/atoms';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
           <p className="text-gray-500 mt-2">Join Medoc today</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <Input label="First Name" placeholder="John" />
             <Input label="Last Name" placeholder="Doe" />
          </div>
          
          <Input 
             label="Email"
             type="email" 
             placeholder="you@example.com"
          />
          
          <Input 
             label="Password"
             type="password" 
             placeholder="••••••••"
          />
          
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
             <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200 bg-white">
                 <option value="user">Patient / User</option>
                 <option value="pharmacy">Pharmacy Owner</option>
             </select>
          </div>

          <Button variant="primary" className="w-full mt-2">
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
