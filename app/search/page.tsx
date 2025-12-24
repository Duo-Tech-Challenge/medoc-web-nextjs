'use client';

import { useState } from 'react';
import { Button, Input, Card, CardBody, Badge, Rating } from '@/components/atoms';
import type { SearchResultDTO, PharmacySearchResultDTO } from '@/types/medication';
import { logger } from '@/lib/logger';

export default function SearchPage() {
  const [medicationQuery, setMedicationQuery] = useState('');
  const [results, setResults] = useState<SearchResultDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicationQuery.trim()) {
      setError('Please enter a medication name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/v1/search?medication=${encodeURIComponent(medicationQuery)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Search failed');
      }

      const data = await response.json();
      setResults(data.data);
      logger.info('Search successful', { medicationName: medicationQuery, pharmaciesCount: data.data.pharmacies.length });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      logger.error('Search error', { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Medication</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter medication name (e.g., Aspirin)"
              value={medicationQuery}
              onChange={(e) => setMedicationQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              isLoading={loading}
              variant="primary"
              size="md"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <Card className="bg-red-50 border border-red-200 mb-6">
            <CardBody>
              <p className="text-red-800">{error}</p>
            </CardBody>
          </Card>
        )}

        {results && (
          <div>
            {/* Medication Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {results.medication.name}
              </h2>
              <p className="text-gray-600">
                {results.medication.genericName} • {results.medication.form} • {results.medication.dosage}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Manufacturer: {results.medication.manufacturer}
              </p>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-900">
                Available in {results.pharmacies.length} pharmacy/pharmacies
              </p>
            </div>

            {/* Pharmacies List */}
            {results.pharmacies.length === 0 ? (
              <Card className="bg-gray-50">
                <CardBody>
                  <p className="text-gray-600 text-center py-8">
                    No pharmacies currently have this medication in stock
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.pharmacies.map((pharmacy) => (
                  <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                ))}
              </div>
            )}
          </div>
        )}

        {!results && !error && (
          <Card className="bg-gray-50 border-gray-200">
            <CardBody>
              <p className="text-gray-600 text-center py-12">
                Start by searching for a medication to see available pharmacies
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}

interface PharmacyCardProps {
  pharmacy: PharmacySearchResultDTO;
}

function PharmacyCard({ pharmacy }: PharmacyCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{pharmacy.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {pharmacy.address}
            </p>
            <p className="text-sm text-gray-500">{pharmacy.city}</p>
          </div>
          
          {pharmacy.isAvailable ? (
            <Badge variant="success" size="md">In Stock</Badge>
          ) : (
            <Badge variant="warning" size="md">Out of Stock</Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Rating rating={Math.round(pharmacy.averageRating)} readOnly size="sm" />
            <span className="text-sm text-gray-600">
              {pharmacy.averageRating.toFixed(1)}
            </span>
          </div>
          
          <a
            href={`/pharmacy/${pharmacy.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Details →
          </a>
        </div>
      </CardBody>
    </Card>
  );
}
