'use client';


import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '@/components/atoms/StatCard';

const mockStats = {
  totalProducts: 1250,
  lowStock: 15,
  dailyOrders: 45,
  revenue: '$1,240',
};

export default function PharmacyDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pharmacy Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your inventory and sales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Products"
          value={mockStats.totalProducts}
          color="blue"
          icon={<Package size={24} />}
        />
        <StatCard
          label="Low Stock Items"
          value={mockStats.lowStock}
          color="red"
          trend={{ direction: 'up', percentage: 5 }}
          icon={<AlertTriangle size={24} />}
        />
        <StatCard
          label="Daily Orders"
          value={mockStats.dailyOrders}
          color="green"
          trend={{ direction: 'up', percentage: 12 }}
          icon={<ShoppingCart size={24} />}
        />
        <StatCard
          label="Today's Revenue"
          value={mockStats.revenue}
          color="orange"
          trend={{ direction: 'up', percentage: 3 }}
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Stock Alerts</h3>
            <div className="space-y-3">
                {[1,2,3].map(i => (
                    <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                        <span className="text-red-700 font-medium">Paracetamol 500mg</span>
                        <span className="text-red-600 text-sm">Below 10 units</span>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
