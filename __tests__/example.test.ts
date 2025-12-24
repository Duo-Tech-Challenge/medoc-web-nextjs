/**
 * Tests unitaires - Exemples
 * Utiliser Jest pour les tests complets
 */

// Example: medication.service.test.ts

import { medicationService } from '@/app/api/v1/services/medication.service';
import { ApiError, ErrorCode } from '@/types/api';

describe('MedicationService', () => {
  describe('createMedication', () => {
    it('should create a new medication', async () => {
      const input = {
        name: 'Test Medication',
        genericName: 'Test Generic',
        form: 'Comprimé',
        dosage: '500mg',
        manufacturer: 'Test Manufacturer',
      };

      const result = await medicationService.createMedication(input);

      expect(result.id).toBeDefined();
      expect(result.name).toBe(input.name);
      expect(result.genericName).toBe(input.genericName);
    });

    it('should throw error on duplicate medication', async () => {
      const input = {
        name: 'Duplicate Medication',
        genericName: 'Duplicate Generic',
        form: 'Comprimé',
        dosage: '500mg',
        manufacturer: 'Test',
      };

      // Create first medication
      await medicationService.createMedication(input);

      // Try to create duplicate
      expect(
        medicationService.createMedication(input)
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getMedicationById', () => {
    it('should retrieve a medication by ID', async () => {
      const input = {
        name: 'Test Medication 2',
        genericName: 'Test Generic 2',
        form: 'Gélule',
        dosage: '250mg',
        manufacturer: 'Test',
      };

      const created = await medicationService.createMedication(input);
      const retrieved = await medicationService.getMedicationById(created.id);

      expect(retrieved.id).toBe(created.id);
      expect(retrieved.name).toBe(created.name);
    });

    it('should throw error if medication not found', async () => {
      expect(
        medicationService.getMedicationById('non-existent-id')
      ).rejects.toThrow(ApiError);
    });
  });
});
