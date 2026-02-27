import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { BatchReviewsDto } from './dto/batch-reviews.dto';
import type { BatchReviewStatsResponse } from './interfaces/review.interface';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('batch')
  async getReviews(
    @Body() dto: BatchReviewsDto,
  ): Promise<BatchReviewStatsResponse> {
    return this.reviewService.getReviewsForSalons(dto.salonIds);
  }
}
