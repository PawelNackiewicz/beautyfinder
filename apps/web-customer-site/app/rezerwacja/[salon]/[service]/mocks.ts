import type {
    Salon,
    ServiceDetail,
    Specialist,
    TimeSlot,
    WarningAlert,
} from "./types";

export const mockSalon: Salon = {
    id: "salon-belleza-1",
    name: "Salon Belleza",
    slug: "salon-belleza",
    description: "Masaż relaksacyjny całego ciała",
    image:
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    reviewCount: 187,
    address: "ul. Główna 123, Warszawa",
    phone: "+48 123 456 789",
};

export const mockService: ServiceDetail = {
    id: "service-massage-1",
    name: "Masaż Twarapen Obrosiecki",
    description: "Certyfikowany masaż twarzy",
    duration: 60,
    price: 320,
    currency: "zł",
};

export const mockSpecialist: Specialist = {
    id: "specialist-anna-1",
    name: "Anna Kowalska",
    title: "Certyfikowany terapeuta masażu",
    avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    bio: "Posiad 8-lat doświadczenia w masażu twarzy. Ukończyła szkoły Warszawskiego i Krakowa. Specjalizuje się w technikach głębokich usług i aromaterapii.",
    certifications: [
        "Certyfikat Masażu Świadomego",
        "Aromaterapia Kliniczna",
        "Masaż Twarapen Obrosiecki",
    ],
};

export const mockTimeSlots: TimeSlot[] = [
    {
        id: "slot-1",
        date: "2026-02-16",
        time: "09:00",
        available: true,
    },
    {
        id: "slot-2",
        date: "2026-02-16",
        time: "10:00",
        available: true,
    },
    {
        id: "slot-3",
        date: "2026-02-16",
        time: "11:00",
        available: false,
    },
    {
        id: "slot-4",
        date: "2026-02-16",
        time: "12:00",
        available: true,
    },
    {
        id: "slot-5",
        date: "2026-02-16",
        time: "13:00",
        available: true,
    },
    {
        id: "slot-6",
        date: "2026-02-16",
        time: "14:00",
        available: true,
    },
    {
        id: "slot-7",
        date: "2026-02-16",
        time: "15:00",
        available: true,
    },
    {
        id: "slot-8",
        date: "2026-02-16",
        time: "16:00",
        available: true,
    },
    {
        id: "slot-9",
        date: "2026-02-16",
        time: "17:00",
        available: true,
    },
];

export const mockWarningAlert: WarningAlert = {
    title: "Informacja",
    message:
        "Sklady i terminy. Niezbęde się być odwiedzony skutkiem zapalenia na Gminu Libą.",
    icon: "info",
};

export const mockCertifications = [
    {
        title: "Certyfikat Masażu Świadomego",
        icon: "medal",
    },
    {
        title: "Aromaterapia Kliniczna",
        icon: "medal",
    },
    {
        title: "Masaż Twarapen Obrosiecki",
        icon: "medal",
    },
];

export const mockReviews = [
    {
        id: "review-1",
        author: "Magdalena W.",
        rating: 5,
        text: "Niesamowite doświadczenie! Anna ma magiczne ręce. Do masażu chodem się jak nasza tradycyjona technika!",
        date: "3 dni temu",
    },
    {
        id: "review-2",
        author: "Tomasz K.",
        rating: 5,
        text: "Świetny masaż. Bardzo relaksacyjny atmosfer, profesjonalizm i idealne wyczucie Correo polecam!",
        date: "1 udział temu",
    },
    {
        id: "review-3",
        author: "Karolina S.",
        rating: 5,
        text: "Polecam masaż jako idealny Atmosfera, profesjonalizm i ideał - wszystko na 100!",
        date: "2 tygodnie temu",
    },
];
