import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type {
  BatchReviewStatsResponse,
  SalonReviewStatsResponse,
} from './interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviewsForSalons(
    salonIds: string[],
  ): Promise<BatchReviewStatsResponse> {
    const reviews = await this.prisma.review.findMany({
      where: { salonId: { in: salonIds } },
      select: {
        id: true,
        appointmentId: true,
        salonId: true,
        rating: true,
        comment: true,
        photos: true,
        staffReply: true,
        createdAt: true,
        staff: {
          select: { displayName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group reviews by salonId
    const grouped = new Map<string, typeof reviews>();
    for (const review of reviews) {
      const existing = grouped.get(review.salonId) ?? [];
      existing.push(review);
      grouped.set(review.salonId, existing);
    }

    // Build response for each requested salonId
    const result: BatchReviewStatsResponse = {};
    for (const salonId of salonIds) {
      const salonReviews = grouped.get(salonId) ?? [];
      const stats: SalonReviewStatsResponse = {
        salonId,
        averageRating: this.calculateAverageRating(
          salonReviews.map((r) => r.rating),
        ),
        reviewCount: salonReviews.length,
        reviews: salonReviews.map((r) => ({
          id: r.id,
          appointmentId: r.appointmentId,
          rating: r.rating,
          comment: r.comment,
          photos: r.photos,
          staffReply: r.staffReply,
          createdAt: r.createdAt,
          staff: r.staff,
        })),
      };
      result[salonId] = stats;
    }

    return result;
  }

  private calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }
}
