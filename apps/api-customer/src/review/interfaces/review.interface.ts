export interface ReviewResponse {
  id: string;
  appointmentId: string;
  rating: number;
  comment: string | null;
  photos: unknown;
  staffReply: string | null;
  createdAt: Date;
  staff: {
    displayName: string;
  };
}

export interface SalonReviewStatsResponse {
  salonId: string;
  averageRating: number;
  reviewCount: number;
  reviews: ReviewResponse[];
}

export interface BatchReviewStatsResponse {
  [salonId: string]: SalonReviewStatsResponse;
}
