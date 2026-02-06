export interface SalonDetail {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    city: string;
    address: string;
    heroImage: string;
    rating: number;
    reviewCount: number;
    verifiedCount: number;
    distance: number;
    badge?: string;
    images: string[];
}

export interface LastMinuteDeal {
    id: string;
    day: string;
    time: string;
    serviceName: string;
    staffName: string;
    originalPrice: number;
    discountedPrice: number;
    discount: number;
}

export interface PortfolioImage {
    id: string;
    url: string;
    alt: string;
}

export interface ServiceItem {
    id: string;
    name: string;
    duration: string;
    price: number;
}

export interface ServiceCategory {
    id: string;
    name: string;
    icon: string;
    services: ServiceItem[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    rating: number;
    yearsOfExperience: number;
}

export interface ClientReview {
    id: string;
    authorName: string;
    authorAvatarUrl: string;
    serviceName: string;
    rating: number;
    comment: string;
    date: string;
    category: string;
    images?: string[];
}

export interface OpeningHours {
    days: string;
    hours: string;
}

export interface SalonContact {
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    openingHours: OpeningHours[];
    mapImageUrl: string;
}
