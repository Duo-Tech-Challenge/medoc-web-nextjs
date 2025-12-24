'use client';


import DataTable from '@/components/molecules/DataTable';
import StatusBadge from '@/components/atoms/StatusBadge';

const mockInventory = [
  { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 120, status: 'active', price: '$12.00' },
  { id: 2, name: 'Ibuprofen 400mg', category: 'Painkiller', stock: 45, status: 'active', price: '$8.50' },
  { id: 3, name: 'Loratadine 10mg', category: 'Antihistamine', stock: 8, status: 'active', price: '$15.00' }, 
  { id: 4, name: 'Vitamin C 1000mg', category: 'Supplement', stock: 0, status: 'inactive', price: '$22.00' },
  { id: 5, name: 'Omeprazole 20mg', category: 'Gastric', stock: 200, status: 'active', price: '$18.00' },
];

export default function InventoryPage() {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
           <p className="text-gray-600">Manage your medicine stock</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">+ Add Medicine</button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DataTable
            columns={[
                { key: 'name', label: 'Medicine', sortable: true },
                { key: 'category', label: 'Category', sortable: true },
                { 
                    key: 'stock', 
                    label: 'Stock', 
                    sortable: true,
                    render: (val) => (
                        <span className={val < 10 ? 'text-red-600 font-bold' : 'text-gray-900'}>{val} units</span>
                    )
                },
                { key: 'price', label: 'Price', sortable: true },
                { 
                    key: 'status', 
                    label: 'Status',
                    render: (val) => <StatusBadge status={val as any} size="sm" /> 
                }
            ]}
            data={mockInventory}
        />
      </div>
    </div>
  );
}
