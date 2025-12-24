'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardBody, Button, Badge } from '@/components/atoms';
import StatusBadge from '@/components/atoms/StatusBadge';
import { PharmacyStatus } from '@/types/admin';
import { MapPin, Phone, Mail } from 'lucide-react';

// Mock data based on PharmacyValidationDetailsDTO
const mockPharmacyDetails = {
  pharmacyId: '1',
  name: 'PharmaLife Central',
  email: 'contact@pharmalife.com',
  phone: '+1 234 567 8900',
  address: {
    street: '123 Health Blvd',
    city: 'New York',
    zipCode: '10001',
    country: 'USA',
  },
  location: {
    latitude: 40.7128,
    longitude: -74.0060,
  },
  createdAt: new Date('2024-01-15'),
  status: PharmacyStatus.VALIDATED,
  operatingHours: [
    { day: 'Mon-Fri', hours: '08:00 - 22:00' },
    { day: 'Sat', hours: '09:00 - 20:00' },
    { day: 'Sun', hours: '10:00 - 18:00' },
  ],
  documents: [
    { name: 'Business License', status: 'verified' },
    { name: 'Pharmacist ID', status: 'verified' },
    { name: 'Insurance Certificate', status: 'pending' },
  ]
};

export default function AdminPharmacyDetailsPage() {
  const params = useParams();
  const pharmacyId = params.id as string;
  const [pharmacy, setPharmacy] = useState<typeof mockPharmacyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
        setPharmacy(mockPharmacyDetails);
        setLoading(false);
    }, 500);
  }, [pharmacyId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  }

  if (!pharmacy) {
    return <div className="p-8 text-center text-red-500">Pharmacy not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pharmacy.name}</h1>
          <div className="flex items-center gap-2 mt-2 text-gray-600">
            <Mail size={16} />
            <span>{pharmacy.email}</span>
            <span className="mx-2">•</span>
            <span className="text-sm">ID: {pharmacyId}</span>
          </div>
        </div>
        <div className="flex gap-3">
            {pharmacy.status === PharmacyStatus.PENDING && (
                <>
                    <Button variant="danger" size="md" onClick={() => alert('Reject')}>
                        Reject
                    </Button>
                    <Button variant="success" size="md" onClick={() => alert('Approve')}>
                        Approve Pharmacy
                    </Button>
                </>
            )}
             {pharmacy.status === PharmacyStatus.VALIDATED && (
                <Button variant="danger" size="md" onClick={() => alert('Suspend')}>
                    Suspend Account
                </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <StatusBadge status={pharmacy.status.toLowerCase() as any} />
                <span className="text-sm font-normal text-gray-500 block ml-auto">
                    Joined {new Date(pharmacy.createdAt).toLocaleDateString()}
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin size={18} className="text-blue-600" /> Location
                    </h3>
                    <p className="text-gray-600">{pharmacy.address.street}</p>
                    <p className="text-gray-600">{pharmacy.address.city}, {pharmacy.address.zipCode}</p>
                    <p className="text-gray-600">{pharmacy.address.country}</p>
                    <div className="mt-2 text-xs text-gray-400">
                        Lat: {pharmacy.location.latitude}, Long: {pharmacy.location.longitude}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Phone size={18} className="text-green-600" /> Contact & Hours
                    </h3>
                    <p className="text-gray-600 mb-2">{pharmacy.phone}</p>
                    <div className="space-y-1">
                        {pharmacy.operatingHours.map((slot, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-500">{slot.day}</span>
                                <span className="text-gray-900 font-medium">{slot.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Documents</h2>
                <div className="space-y-3">
                    {pharmacy.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="font-medium text-gray-700">{doc.name}</span>
                            <div className="flex items-center gap-3">
                                <Badge variant={doc.status === 'verified' ? 'success' : 'warning'}>
                                    {doc.status}
                                </Badge>
                                <Button variant="secondary" size="sm">View</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
             <Card>
                <CardBody>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Audit Log</h2>
                    <div className="space-y-4 border-l-2 border-gray-100 ml-2 pl-4">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                            <p className="text-sm font-medium text-gray-900">Validated by Admin</p>
                            <p className="text-xs text-gray-500">Today, 10:23 AM</p>
                            {/* <p className="text-xs text-gray-600 mt-1">"Documents verified and location confirmed."</p> */}
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                            <p className="text-sm font-medium text-gray-900">Documents Uploaded</p>
                            <p className="text-xs text-gray-500">Yesterday, 4:50 PM</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
                            <p className="text-sm font-medium text-gray-900">Account Created</p>
                            <p className="text-xs text-gray-500">Jan 15, 2024</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Orders</span>
                            <span className="font-bold text-gray-900">1,245</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Avg. Rating</span>
                            <span className="font-bold text-yellow-600">★ 4.8</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Pending Refills</span>
                            <span className="font-bold text-blue-600">12</span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
      </div>
    </div>
  );
}
