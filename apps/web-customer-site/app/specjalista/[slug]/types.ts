export interface SpecialistDetail {
    id: string;
    slug: string;
    name: string;
    specialty: string;
    yearsOfExperience: number;
    description: string;
    avatarUrl: string;
    salonName: string;
    salonSlug: string;
    city: string;
    rating: number;
    reviewCount: number;
    yesterdayVisitors: number;
    cityRankPercentile: number;
}

export interface PortfolioImage {
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
}

export interface SpecialistReview {
    id: string;
    authorName: string;
    authorAvatarUrl: string;
    rating: number;
    comment: string;
    date: string;
}
