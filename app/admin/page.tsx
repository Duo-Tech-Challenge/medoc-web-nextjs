'use client';

import { Users, AlertCircle, CheckCircle } from 'lucide-react';
import { StatCard } from '@/components/atoms';

// Mock data - sera remplacé par useAdmin()
const mockStats = {
  totalPharmacies: 329,
  pendingValidations: 89,
  activePharmacies: 254,
  suspendedPharmacies: 12,
};

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Gestion des pharmacies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total pharmacies"
          value={mockStats.totalPharmacies}
          color="blue"
          icon={<Users size={24} />}
        />
        <StatCard
          label="En attente"
          value={mockStats.pendingValidations}
          color="orange"
          icon={<AlertCircle size={24} />}
        />
        <StatCard
          label="Actives"
          value={mockStats.activePharmacies}
          color="green"
          icon={<CheckCircle size={24} />}
        />
        <StatCard
          label="Suspendues"
          value={mockStats.suspendedPharmacies}
          color="red"
        />
      </div>
    </div>
  );
}
