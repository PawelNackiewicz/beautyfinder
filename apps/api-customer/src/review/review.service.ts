import { Injectable } from '@nestjs/common';

export interface Review {
  text: string;
  rating: number; // 1-5
}

export interface SalonReviewStats {
  averageRating: number;
  reviews: Review[];
}

@Injectable()
export class ReviewService {
  private mockReviews: Record<string, Review[]> = {
    // Mock data for some random salon IDs - we can reuse IDs if we knew them, 
    // but for now we will generate data dynamically or have some static ones.
    'salon-1': [
      { text: 'Great service!', rating: 5 },
      { text: 'Not bad, but expensive.', rating: 3 },
    ],
    'salon-2': [
      { text: 'Amazing experience.', rating: 5 },
      { text: 'I love this place!', rating: 5 },
      { text: 'Will come again.', rating: 4 },
    ],
    'salon-3': [
      { text: 'Avoid at all costs.', rating: 1 },
    ],
  };

  private readonly DEFAULT_REVIEWS: Review[] = [
    { text: 'Very professional staff.', rating: 5 },
    { text: 'Clean and tidy.', rating: 4 },
    { text: 'Average experience.', rating: 3 },
    { text: 'Highly requested salon.', rating: 5 },
  ];

  getReviewsForSalons(salonIds: string[]): Record<string, SalonReviewStats> {
    const results: Record<string, SalonReviewStats> = {};

    for (const salonId of salonIds) {
      // Try to find specific mock data, otherwise generate/pick random from default
      let reviews = this.mockReviews[salonId];

      if (!reviews) {
         // Create deterministic pseudo-random reviews based on salonId string to look consistent
         reviews = this.generateMockReviews(salonId);
      }

      const averageRating = this.calculateAverage(reviews);
      
      results[salonId] = {
        averageRating,
        reviews,
      };
    }

    return results;
  }

  private generateMockReviews(seed: string): Review[] {
    // Simple deterministic behavior based on char codes
    const count = (seed.charCodeAt(0) % 3) + 1; // 1 to 3 reviews
    const generated: Review[] = [];
    
    for (let i = 0; i < count; i++) {
        const index = (seed.charCodeAt(i % seed.length) + i) % this.DEFAULT_REVIEWS.length;
        generated.push(this.DEFAULT_REVIEWS[index]);
    }

    // Add a bit of randomness to rating to make it look real if needed, 
    // but reusing objects is fine for a mock.
    return generated;
  }

  private calculateAverage(reviews: Review[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
  }
}
