export interface LastMinuteSlot {
    id: string;
    serviceName: string;
    salonName: string;
    salonId: string;
    address: string;
    imageUrl: string;
    discount: number; // percentage
    price: number;
    originalPrice: number;
    timeSlot: string; // ISO string
    displayTime: string; // e.g., "Dziś, 18:30"
    category: "hair" | "nails" | "massage" | "beauty" | "spa";
}

export const mockLastMinuteSlots: LastMinuteSlot[] = [
    {
        id: "slot-1",
        serviceName: "Balayage & Stylizacja",
        salonName: "Studio Elegance",
        salonId: "salon-1",
        address: "ul. Marszałkowska 104/122, Warszawa",
        imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
        discount: 15,
        price: 85,
        originalPrice: 100,
        timeSlot: "2026-02-02T18:30:00Z",
        displayTime: "Dziś, 18:30",
        category: "hair",
    },
    {
        id: "slot-2",
        serviceName: "Manicure Hybrydowy",
        salonName: "Salon Pięknych Paznokci",
        address: "ul. Piotrkowska 217, Łódź",
        salonId: "salon-2",
        imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=600&fit=crop",
        discount: 20,
        price: 40,
        originalPrice: 50,
        timeSlot: "2026-02-02T17:00:00Z",
        displayTime: "Dziś, 17:00",
        category: "nails",
    },
    {
        id: "slot-3",
        serviceName: "Masaż Głęboki Tkanek",
        salonName: "SPA Serenity",
        address: "ul. Floriańska 55, Kraków",
        salonId: "salon-3",
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
        discount: 10,
        price: 72,
        originalPrice: 80,
        timeSlot: "2026-02-02T19:15:00Z",
        displayTime: "Dziś, 19:15",
        category: "massage",
    },
];
