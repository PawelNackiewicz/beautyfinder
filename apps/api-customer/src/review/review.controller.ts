import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService, SalonReviewStats } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('batch')
  getReviews(
    @Body() body: { salonIds: string[] },
  ): Record<string, SalonReviewStats> {
    return this.reviewService.getReviewsForSalons(body.salonIds);
  }
}
