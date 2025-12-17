/**
 * Types communs à l'application
 */

export type UserRole = 'user' | 'pharmacy' | 'admin';

export enum UserRoleEnum {
  USER = 'user',
  PHARMACY = 'pharmacy',
  ADMIN = 'admin',
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface TimeSlot {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
}
