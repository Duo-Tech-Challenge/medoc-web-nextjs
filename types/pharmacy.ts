/**
 * Types pharmacie
 */

import type { Address, GeoLocation, TimeSlot } from './common';

export interface PharmacyDTO {
  id: string;
  name: string;
  email: string;
  address: Address;
  location: GeoLocation;
  phone: string;
  averageRating: number;
  isValidated: boolean; // Pour l'approbation admin
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Données publiques de la pharmacie (jamais prix/stock)
 */
export interface PharmacyPublicDTO {
  id: string;
  name: string;
  address: Address;
  location: GeoLocation;
  phone: string;
  averageRating: number;
  operatingHours: TimeSlot[];
}

export interface CreatePharmacyDTO {
  name: string;
  email: string;
  password: string;
  address: Address;
  location: GeoLocation;
  phone: string;
}

export interface UpdatePharmacyDTO {
  name?: string;
  address?: Address;
  phone?: string;
  operatingHours?: TimeSlot[];
}

export interface PharmacyValidationDTO {
  pharmacyId: string;
  isValidated: boolean;
  reason?: string;
}

export interface ReviewDTO {
  id: string;
  pharmacyId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReviewDTO {
  pharmacyId: string;
  rating: number;
  comment: string;
}
