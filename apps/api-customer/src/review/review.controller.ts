import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService, SalonReviewStats } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('batch')
  async getReviews(
    @Body() body: { salonIds: string[] }
  ): Promise<Record<string, SalonReviewStats>> {
    return this.reviewService.getReviewsForSalons(body.salonIds);
  }
}
