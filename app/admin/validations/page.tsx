'use client';


import DataTable from '@/components/molecules/DataTable';
import StatusBadge from '@/components/atoms/StatusBadge';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';

const mockPendingValidations = [
  {
    id: 2,
    name: 'GreenCross Medical',
    email: 'support@greencross.com',
    status: 'pending',
    submittedAt: '2024-01-20T10:30:00Z',
    documentsComplete: true,
  },
  {
    id: 6,
    name: 'City Care Pharmacy',
    email: 'contact@citycare.com',
    status: 'pending',
    submittedAt: '2024-01-21T14:15:00Z',
    documentsComplete: false,
  },
  {
    id: 7,
    name: 'Sunrise Health',
    email: 'hello@sunrise.com',
    status: 'pending',
    submittedAt: '2024-01-22T09:00:00Z',
    documentsComplete: true,
  },
];

export default function AdminValidationsPage() {
    const router = useRouter();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pending Validations</h1>
        <p className="text-gray-600 mt-1">Review and approve new pharmacy registrations</p>
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
              key: 'submittedAt',
              label: 'Submitted Date',
              sortable: true,
              render: (value) => new Date(value).toLocaleDateString(),
            },
            {
              key: 'documentsComplete',
              label: 'Documents',
              render: (value) => (
                value ? 
                <span className="text-green-600 text-sm font-medium">✓ Complete</span> : 
                <span className="text-orange-600 text-sm font-medium">⚠ Incomplete</span>
              ),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} animated />,
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (_, row) => (
                <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/admin/pharmacies/${row.id}`);
                    }}
                >
                    Review
                </Button>
              )
            }
          ]}
          data={mockPendingValidations}
          onRowClick={(row) => router.push(`/admin/pharmacies/${row.id}`)}
          emptyMessage="No pending validations."
        />
      </div>
    </div>
  );
}
