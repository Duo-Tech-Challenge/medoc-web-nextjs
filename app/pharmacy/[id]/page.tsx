'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardBody, Button, Rating, Badge } from '@/components/atoms';
import type { PharmacyPublicDTO } from '@/types/pharmacy';
import type { ReviewDTO } from '@/types/pharmacy';
import { logger } from '@/lib/logger';

export default function PharmacyPage() {
  const params = useParams();
  const pharmacyId = params.id as string;

  const [pharmacy, setPharmacy] = useState<PharmacyPublicDTO | null>(null);
  const [reviews] = useState<ReviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const response = await fetch(`/api/v1/search/pharmacy/${pharmacyId}`);
        
        if (!response.ok) {
          throw new Error('Failed to load pharmacy');
        }

        const data = await response.json();
        setPharmacy(data.data);
        logger.info('Pharmacy loaded', { pharmacyId });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        logger.error('Pharmacy load error', { message });
      } finally {
        setLoading(false);
      }
    };

    if (pharmacyId) {
      fetchPharmacy();
    }
  }, [pharmacyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading pharmacy information...</p>
      </div>
    );
  }

  if (error || !pharmacy) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="bg-red-50 border border-red-200">
            <CardBody>
              <p className="text-red-800">{error || 'Pharmacy not found'}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <a
            href="/search"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Search
          </a>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{pharmacy.name}</h1>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Rating rating={Math.round(pharmacy.averageRating)} readOnly size="md" />
              <span className="text-lg font-semibold text-gray-900">
                {pharmacy.averageRating.toFixed(1)}
              </span>
            </div>
            <Badge variant="info">Validated</Badge>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 font-medium mb-2">📍 Map View</p>
              <p className="text-sm text-gray-500">
                Latitude: {pharmacy.location.latitude.toFixed(4)} | Longitude: {pharmacy.location.longitude.toFixed(4)}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                (Interactive map integration coming soon)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact & Hours */}
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">
                    {pharmacy.address.street}
                  </p>
                  <p className="text-sm text-gray-700">
                    {pharmacy.address.zipCode} {pharmacy.address.city}
                  </p>
                  <p className="text-sm text-gray-700">{pharmacy.address.country}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a
                    href={`tel:${pharmacy.phone}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {pharmacy.phone}
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Operating Hours */}
          <Card>
            <CardBody>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Operating Hours</h2>

              {pharmacy.operatingHours && pharmacy.operatingHours.length > 0 ? (
                <div className="space-y-2 text-sm">
                  {pharmacy.operatingHours.map((slot, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-600">Day {slot.dayOfWeek}:</span>
                      <span className="font-medium text-gray-900">
                        {slot.openTime} - {slot.closeTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Hours not available</p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <Card className="bg-gray-50">
              <CardBody>
                <p className="text-gray-600 text-center py-8">
                  No reviews yet. Be the first to review this pharmacy!
                </p>
              </CardBody>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardBody>
                    <div className="flex justify-between items-start mb-2">
                      <Rating rating={review.rating} readOnly size="sm" />
                      <span className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call-to-action */}
        <div className="mt-12">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => alert('Authentication required')}
          >
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
}
