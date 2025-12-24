"use client";
import DataTable from '@/components/molecules/DataTable';
import StatusBadge from '@/components/atoms/StatusBadge';
import { Button, Card, CardBody } from '@/components/atoms';

// Mock orders
const mockOrders = [
  {
    orderId: 'ORD-001',
    customer: 'Alice Johnson',
    medication: 'Doliprane 1000mg',
    quantity: 2,
    totalPrice: '15.90 €',
    status: 'pending',
    date: '2024-01-22T10:00:00Z',
  },
  {
    orderId: 'ORD-002',
    customer: 'Bob Smith',
    medication: 'Amoxicilline 500mg',
    quantity: 1,
    totalPrice: '8.50 €',
    status: 'active', // Using 'active' as 'Ready for Pickup' in our badge system map
    date: '2024-01-22T09:15:00Z',
  },
  {
    orderId: 'ORD-003',
    customer: 'Charlie Brown',
    medication: 'Spasfon',
    quantity: 3,
    totalPrice: '12.00 €',
    status: 'inactive', // Using 'inactive' as Completed
    date: '2024-01-21T18:30:00Z',
  },
];

export default function PharmacyOrdersPage() {
    // Custom render for status to map to readable labels
    const renderStatus = (status: string) => {
      let variant = status;

      switch (status) {
        case 'pending':
          variant = 'pending';
          break;
        case 'active':
          variant = 'active';
          break;
        case 'inactive':
          variant = 'inactive';
          break;
        default:
          break;
      }

      return <StatusBadge status={variant as any} />;
    };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage customer reservations and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <Card>
            <CardBody>
                <p className="text-sm text-gray-500 font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
            </CardBody>
         </Card>
         <Card>
            <CardBody>
                <p className="text-sm text-gray-500 font-medium">Ready for Pickup</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">3</p>
            </CardBody>
         </Card>
         <Card>
            <CardBody>
                <p className="text-sm text-gray-500 font-medium">Completed Today</p>
                <p className="text-3xl font-bold text-green-600 mt-2">12</p>
            </CardBody>
         </Card>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DataTable
          columns={[
            {
              key: 'orderId',
              label: 'Order ID',
              render: (value) => <span className="font-mono text-sm">{value}</span>
            },
            {
              key: 'customer',
              label: 'Customer',
              sortable: true,
            },
            {
              key: 'medication',
              label: 'Items',
              render: (value, row) => (
                  <div>
                      <p className="text-gray-900 font-medium">{value}</p>
                      <p className="text-xs text-gray-500">Qty: {row.quantity}</p>
                  </div>
              )
            },
            {
              key: 'totalPrice',
              label: 'Total',
              sortable: true,
            },
            {
              key: 'date',
              label: 'Date',
              render: (value) => new Date(value).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => renderStatus(value),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (_value, row) => (
                <div className="flex gap-2">
                    {row.status === 'pending' && (
                        <Button size="sm" variant="primary">Prepare</Button>
                    )}
                    {row.status === 'active' && (
                        <Button size="sm" variant="success">Complete</Button>
                    )}
                    <Button size="sm" variant="secondary">Details</Button>
                </div>
              )
            }
          ]}
          data={mockOrders}
          emptyMessage="No pending orders."
        />
      </div>
    </div>
  );
}
