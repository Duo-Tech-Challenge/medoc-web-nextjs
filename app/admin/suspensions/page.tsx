'use client';

import DataTable from '@/components/molecules/DataTable';
import StatusBadge from '@/components/atoms/StatusBadge';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';

const mockSuspensions = [
  {
    id: 4,
    name: 'City Health Store',
    email: 'sales@cityhealth.com',
    status: 'suspended',
    suspendedAt: '2024-01-10T11:00:00Z',
    reason: 'Violation of terms',
    suspendedBy: 'Admin User',
  },
  {
    id: 12,
    name: 'Bad Pharma Inc.',
    email: 'admin@badpharma.com',
    status: 'suspended',
    suspendedAt: '2023-12-05T09:30:00Z',
    reason: 'Reported fraud',
    suspendedBy: 'Super Admin',
  },
];

export default function AdminSuspensionsPage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Suspensions</h1>
        <p className="text-gray-600 mt-1">Manage suspended pharmacy accounts</p>
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
              key: 'suspendedAt',
              label: 'Suspended Date',
              sortable: true,
              render: (value) => new Date(value).toLocaleDateString(),
            },
            {
              key: 'reason',
              label: 'Reason',
            },
            {
              key: 'suspendedBy',
              label: 'By',
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} />,
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (_, row) => (
                <Button 
                    variant="outline"
                    size="sm" 
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/pharmacies/${row.id}`);
                    }}
                >
                    Details
                </Button>
              )
            }
          ]}
          data={mockSuspensions}
          onRowClick={(row) => router.push(`/admin/pharmacies/${row.id}`)}
          emptyMessage="No suspended accounts."
        />
      </div>
    </div>
  );
}
