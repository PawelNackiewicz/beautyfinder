export interface UserProfileResponse {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  gender: string | null;
  dateOfBirth: Date | null;
  authProvider: string | null;
  createdAt: Date;
  lastSyncedAt: Date | null;
}

export interface UserAppointmentResponse {
  id: string;
  startTime: Date;
  status: string;
  treatmentName: string;
  priceCents: number;
  staffName: string;
  locationName: string;
  city: string;
}

export interface UserLoyaltyBalanceResponse {
  id: string;
  points: number;
  lastUpdated: Date;
  salon: {
    id: string;
    slug: string;
  };
}

export interface UserReviewResponse {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  salon: {
    id: string;
    slug: string;
  };
  staff: {
    displayName: string;
  };
}
