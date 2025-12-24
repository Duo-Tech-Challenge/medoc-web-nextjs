'use client';

import { useState } from 'react';
import DataTable from '@/components/molecules/DataTable';
import { Button, Input, Card, CardBody } from '@/components/atoms';
import { Plus } from 'lucide-react';
import StatusBadge from '@/components/atoms/StatusBadge';

const mockUsers = [
  {
    id: 'admin-1',
    name: 'Super Admin',
    email: 'super@medoc.com',
    role: 'SUPER_ADMIN',
    status: 'active',
    lastLogin: '2024-01-22T08:00:00Z',
  },
  {
    id: 'admin-2',
    name: 'John Doe',
    email: 'john@medoc.com',
    role: 'ADMIN',
    status: 'active',
    lastLogin: '2024-01-21T15:30:00Z',
  },
  {
    id: 'admin-3',
    name: 'Jane Smith',
    email: 'jane@medoc.com',
    role: 'ADMIN',
    status: 'inactive',
    lastLogin: '2023-12-15T10:00:00Z',
  },
];

export default function AdminUsersPage() {
  const [showAddModal, setShowAddModal] = useState(false); // Placeholder for modal logic

  return (
    <div>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage admin access and roles</p>
        </div>
        <Button 
            variant="primary" 
            className="flex items-center gap-2"
            onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add User
        </Button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardBody>
                    <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
                    <div className="space-y-4">
                        <Input label="Full Name" placeholder="e.g. John Doe" />
                        <Input label="Email" type="email" placeholder="e.g. john@medoc.com" />
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                             <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200">
                                <option value="ADMIN">Admin</option>
                                <option value="SUPER_ADMIN">Super Admin</option>
                             </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => setShowAddModal(false)}>Create User</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DataTable
          columns={[
            {
              key: 'name',
              label: 'User',
              sortable: true,
              render: (value, row) => (
                <div>
                  <p className="font-semibold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500">{row.email}</p>
                </div>
              ),
            },
            {
              key: 'role',
              label: 'Role',
              sortable: true,
              render: (value) => (
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                    value === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                    {value.replace('_', ' ')}
                </span>
              )
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <StatusBadge status={value} size="sm" />,
            },
            {
              key: 'lastLogin',
              label: 'Last Login',
              render: (value) => new Date(value).toLocaleDateString() + ' ' + new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
            {
              key: 'actions',
              label: 'Actions',
              render: () => (
                <div className="flex gap-2">
                     <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                     <button className="text-red-600 hover:text-red-800 text-sm font-medium">Deactivate</button>
                </div>
              )
            }
          ]}
          data={mockUsers}
          emptyMessage="No users found."
        />
      </div>
    </div>
  );
}
