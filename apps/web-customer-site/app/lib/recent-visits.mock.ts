import type { Salon } from "./mockData";

export type RecentVisit = Salon & { lastVisit: string };

export const mockRecentVisits: RecentVisit[] = [
    {
        id: "visit-1",
        slug: "elegance-hair-studio-warszawa",
        name: "Élégance Hair Studio",
        category: "fryzjer",
        rating: 5.0,
        reviews: 124,
        location: "ul. Marszałkowska 25, Warszawa",
        city: "Warszawa",
        citySlug: "warszawa",
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
        coordinates: { lat: 52.2297, lng: 21.0122 },
        lastVisit: "2 tygodnie temu",
    },
    {
        id: "visit-2",
        slug: "luxe-nails-boutique-krakow",
        name: "Luxe Nails Boutique",
        category: "paznokcie",
        rating: 4.9,
        reviews: 89,
        location: "ul. Floriańska 10, Kraków",
        city: "Kraków",
        citySlug: "krakow",
        imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
        coordinates: { lat: 50.0647, lng: 19.9450 },
        lastVisit: "3 tygodnie temu",
    },
    {
        id: "visit-3",
        slug: "serenity-spa-wellness-gdansk",
        name: "Serenity Spa & Wellness",
        category: "masaz",
        rating: 5.0,
        reviews: 156,
        location: "ul. Długa 15, Gdańsk",
        city: "Gdańsk",
        citySlug: "gdansk",
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        coordinates: { lat: 54.3520, lng: 18.6466 },
        lastVisit: "1 miesiąc temu",
    },
];

export const mockCustomerName = "Natalia";