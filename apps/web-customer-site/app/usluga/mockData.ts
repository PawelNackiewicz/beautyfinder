export interface ServiceCategory {
    id: string;
    name: string;
    hasDropdown?: boolean;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    { id: "brwi-pudrowe", name: "Brwi pudrowe", hasDropdown: true },
    { id: "microblading", name: "Microblading", hasDropdown: true },
    { id: "przedluzanie-rzes", name: "Przedłużanie rzęs", hasDropdown: true },
    { id: "laminacja", name: "Laminacja", hasDropdown: true },
    { id: "usta", name: "Usta", hasDropdown: true },
];

export interface ServiceSalon {
    id: string;
    slug: string;
    name: string;
    city: string;
    distance: string;
    rating: number;
    reviewCount: number;
    priceFrom: number;
    currency: string;
    imageUrl: string;
    isPremium: boolean;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export const SERVICE_SALONS: ServiceSalon[] = [
    {
        id: "1",
        slug: "studio-velvet-gold",
        name: "Studio Velvet Gold",
        city: "Warszawa",
        distance: "1.2 km",
        rating: 4.9,
        reviewCount: 128,
        priceFrom: 350,
        currency: "PLN",
        imageUrl: "https://picsum.photos/seed/brow1/400/300",
        isPremium: true,
        coordinates: { lat: 52.235, lng: 21.01 },
    },
    {
        id: "2",
        slug: "royal-brow-boutique",
        name: "Royal Brow Boutique",
        city: "Warszawa",
        distance: "2.5 km",
        rating: 4.8,
        reviewCount: 94,
        priceFrom: 420,
        currency: "PLN",
        imageUrl: "https://picsum.photos/seed/brow2/400/300",
        isPremium: false,
        coordinates: { lat: 52.228, lng: 21.005 },
    },
    {
        id: "3",
        slug: "elite-aesthetics",
        name: "Elite Aesthetics",
        city: "Warszawa",
        distance: "3.1 km",
        rating: 5.0,
        reviewCount: 210,
        priceFrom: 500,
        currency: "PLN",
        imageUrl: "https://picsum.photos/seed/brow3/400/300",
        isPremium: false,
        coordinates: { lat: 52.22, lng: 21.02 },
    },
    {
        id: "4",
        slug: "brow-art-studio",
        name: "Brow Art Studio",
        city: "Warszawa",
        distance: "4.0 km",
        rating: 4.7,
        reviewCount: 56,
        priceFrom: 300,
        currency: "PLN",
        imageUrl: "https://picsum.photos/seed/brow4/400/300",
        isPremium: false,
        coordinates: { lat: 52.245, lng: 21.03 },
    },
    {
        id: "5",
        slug: "permanent-beauty-clinic",
        name: "Permanent Beauty Clinic",
        city: "Warszawa",
        distance: "5.2 km",
        rating: 4.6,
        reviewCount: 182,
        priceFrom: 380,
        currency: "PLN",
        imageUrl: "https://picsum.photos/seed/brow5/400/300",
        isPremium: true,
        coordinates: { lat: 52.21, lng: 20.99 },
    },
];

// --- Top Artists ---

export interface TopArtist {
    id: string;
    name: string;
    specialty: string;
    avatarUrl: string;
    slug: string;
}

export const TOP_ARTISTS: TopArtist[] = [
    {
        id: "1",
        name: "Anna Kowalska",
        specialty: "Master Trainer",
        avatarUrl: "https://picsum.photos/seed/artist1/200/200",
        slug: "anna-kowalska",
    },
    {
        id: "2",
        name: "Magda Nowak",
        specialty: "Eyelash Specialist",
        avatarUrl: "https://picsum.photos/seed/artist2/200/200",
        slug: "magda-nowak",
    },
    {
        id: "3",
        name: "Julia Wójcik",
        specialty: "Lamination Expert",
        avatarUrl: "https://picsum.photos/seed/artist3/200/200",
        slug: "julia-wojcik",
    },
    {
        id: "4",
        name: "Karolina Lis",
        specialty: "PMU Specialist",
        avatarUrl: "https://picsum.photos/seed/artist4/200/200",
        slug: "karolina-lis",
    },
    {
        id: "5",
        name: "Oliwia Bąk",
        specialty: "Stylistka Brwi",
        avatarUrl: "https://picsum.photos/seed/artist5/200/200",
        slug: "oliwia-bak",
    },
    {
        id: "6",
        name: "Michał Mazur",
        specialty: "Lash Artist",
        avatarUrl: "https://picsum.photos/seed/artist6/200/200",
        slug: "michal-mazur",
    },
];

// --- Book the Look gallery ---

export const BOOK_THE_LOOK_IMAGES: string[] = [
    "https://picsum.photos/seed/look1/600/400",
    "https://picsum.photos/seed/look2/600/400",
    "https://picsum.photos/seed/look3/600/400",
    "https://picsum.photos/seed/look4/600/400",
];

// --- Thematic Collections ---

export interface ThematicCollection {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    slug: string;
}

export const THEMATIC_COLLECTIONS: ThematicCollection[] = [
    {
        id: "1",
        title: "Wedding Glow",
        description:
            "Perfekcyjny makijaż na ten wyjątkowy dzień. Wyselekcjonowani artyści ślubni.",
        imageUrl: "https://picsum.photos/seed/wedding/800/500",
        slug: "wedding-glow",
    },
    {
        id: "2",
        title: "Natural Look",
        description:
            "Subtelne podkreślenie urody. Kolekcja zabiegów o naturalnym wykończeniu.",
        imageUrl: "https://picsum.photos/seed/natural/800/500",
        slug: "natural-look",
    },
];
