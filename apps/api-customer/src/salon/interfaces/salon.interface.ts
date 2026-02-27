export interface SalonResponse {
  id: string;
  slug: string;
  currency: string;
  locations: SalonLocationResponse[];
  reviewStats: {
    averageRating: number;
    reviewCount: number;
  };
}

export interface SalonLocationResponse {
  id: string;
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

export interface SalonListItemResponse {
  id: string;
  slug: string;
  currency: string;
  primaryLocation: SalonLocationResponse | null;
  reviewStats: {
    averageRating: number;
    reviewCount: number;
  };
}

export interface MapSalonResponse {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string | null;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PremiumSalonResponse {
  id: string;
  slug: string;
  currency: string;
  primaryLocation: SalonLocationResponse | null;
  reviewStats: {
    averageRating: number;
    reviewCount: number;
  };
}
