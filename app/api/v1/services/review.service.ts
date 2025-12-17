/**
 * Review Service
 * Logique métier pour les avis de pharmacies
 */

import type { ReviewDTO, CreateReviewDTO } from '@/types/pharmacy';
import { ApiError, ErrorCode } from '@/types/api';

// Mock storage pour les reviews
const reviewsStore = new Map<string, ReviewDTO>();

export class ReviewService {
  async createReview(dto: CreateReviewDTO, userId: string): Promise<ReviewDTO> {
    // Valider rating
    if (dto.rating < 1 || dto.rating > 5) {
      throw new ApiError(
        ErrorCode.BAD_REQUEST,
        'Rating must be between 1 and 5'
      );
    }

    // Valider comment
    if (!dto.comment || dto.comment.trim().length === 0) {
      throw new ApiError(ErrorCode.BAD_REQUEST, 'Comment cannot be empty');
    }

    const id = crypto.randomUUID();
    const review: ReviewDTO = {
      id,
      pharmacyId: dto.pharmacyId,
      userId,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    reviewsStore.set(id, review);
    return review;
  }

  async getReviewsByPharmacy(pharmacyId: string): Promise<ReviewDTO[]> {
    const reviews = Array.from(reviewsStore.values());
    return reviews.filter(r => r.pharmacyId === pharmacyId);
  }

  async getReviewById(id: string): Promise<ReviewDTO> {
    const review = reviewsStore.get(id);
    if (!review) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Review not found');
    }
    return review;
  }

  async deleteReview(id: string, userId: string): Promise<void> {
    const review = reviewsStore.get(id);
    if (!review) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Review not found');
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (review.userId !== userId) {
      throw new ApiError(
        ErrorCode.FORBIDDEN,
        'You can only delete your own reviews'
      );
    }

    reviewsStore.delete(id);
  }
}

export const reviewService = new ReviewService();
