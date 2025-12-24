'use client';


import Link from 'next/link';
import { Button, Input } from '@/components/atoms';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
           <p className="text-gray-500 mt-2">Sign in to your Medoc account</p>
        </div>

        <form className="space-y-4">
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

          <div className="flex items-center justify-between text-sm">
             <label className="flex items-center cursor-pointer">
                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                 <span className="ml-2 text-gray-600">Remember me</span>
             </label>
             <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <Button variant="secondary" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link href="/auth/register" className="text-blue-600 font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
