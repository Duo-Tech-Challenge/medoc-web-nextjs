'use client';

import { useRef } from 'react';

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
}

export const MapContainer = ({ 
  center, 
  className = '',
  children 
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Implémentation future avec une librairie de cartes
  // Pour l'instant, un conteneur stylé
  return (
    <div 
      ref={mapRef}
      className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
      style={{ minHeight: '400px' }}
    >
      <div className="text-gray-500 text-center">
        <div className="mb-2">📍 Carte</div>
        <div className="text-sm">
          {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
        </div>
        {children}
      </div>
    </div>
  );
};