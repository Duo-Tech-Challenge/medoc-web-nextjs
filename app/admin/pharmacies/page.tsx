'use client';


import DataTable from '@/components/molecules/DataTable';
import StatusBadge from '@/components/atoms/StatusBadge';

const mockPharmacies = [
  {
    id: 1,
    name: 'PharmaLife Central',
    email: 'contact@pharmalife.com',
    status: 'active' as const,
    city: 'New York',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'GreenCross Medical',
    email: 'support@greencross.com',
    status: 'pending' as const,
    city: 'Chicago',
    rating: 0,
  },
  {
    id: 3,
    name: 'MediCare Plus',
    email: 'info@medicareplus.com',
    status: 'active' as const,
    city: 'Los Angeles',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'City Health Store',
    email: 'sales@cityhealth.com',
    status: 'suspended' as const,
    city: 'Seattle',
    rating: 3.9,
  },
  {
    id: 5,
    name: 'Wellness Corner',
    email: 'hello@wellnesscorner.com',
    status: 'rejected' as const,
    city: 'Austin',
    rating: 0,
  },
];

export default function AdminPharmaciesPage() {
  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600 mt-1">View and manage pharmacy accounts</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Add Pharmacy
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DataTable
          columns={[
            {
              key: 'name',
              label: 'Pharmacy Name',
              sortable: true,
              render: (value, row) => (
                <div>
                  <p className="font-semibold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500">{row.email}</p>
                </div>
              ),
            },
            {
              key: 'city',
              label: 'Location',
              sortable: true,
            },
            {
              key: 'status',
              label: 'Status',
              sortable: true,
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'rating',
              label: 'Rating',
              render: (value) => (
                 value > 0 ? <span className="text-yellow-600 font-bold">★ {value}</span> : <span className="text-gray-400">-</span>
              )
            },
            {
                key: 'actions',
                label: 'Actions',
                render: () => (
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                )
            }
          ]}
          data={mockPharmacies}
          emptyMessage="No pharmacies found."
        />
      </div>
    </div>
  );
}
