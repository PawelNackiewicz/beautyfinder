import type {
    User,
    Appointment,
    PastVisit,
    VouchersAndRewards,
} from "./types";

export const mockUser: User = {
    firstName: "Anna",
    lastName: "Kowalska",
    email: "anna.kowalska@example.com",
    phone: "+48 123 456 789",
    allergies: "Uczulenie na parabeny i silikony. Wrażliwa skóra głowy.",
    avatarUrl: "",
};

export const mockAppointment: Appointment = {
    salonName: "Élégance Hair Studio",
    serviceName: "Balayage & Stylizacja",
    date: "15 lutego 2024",
    time: "14:30",
    address: "ul. Królewska 45, Warszawa",
    price: "€85",
    status: "Potwierdzona",
    stylistName: "Sophie Laurent",
    stylistRole: "Imię i Stylizja",
    salonImage:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
};

export const mockPastVisits: PastVisit[] = [
    {
        id: 1,
        salonName: "Luxe Nails Boutique",
        serviceName: "Manicure hybrydowy",
        date: "28 stycznia 2024",
        time: "16:00",
        address: "ul. Nowy Świat 25, Warszawa",
        price: "€40",
        status: "Zrealizowana",
        stylistName: "Maria Nowak",
        stylistRole: "Stylistka paznokci",
        rating: 5,
        salonImage:
            "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        salonName: "Serenity Spa & Wellness",
        serviceName: "Masaż relaksacyjny",
        date: "20 stycznia 2024",
        time: "18:30",
        address: "ul. Piękna 12, Warszawa",
        price: "€72",
        status: "Zrealizowana",
        stylistName: "Karolina Wiśniewska",
        stylistRole: "Masażystka",
        rating: 5,
        salonImage:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 3,
        salonName: "Gentleman's Parlour",
        serviceName: "Strzyżenie + stylizacja brody",
        date: "12 stycznia 2024",
        time: "11:00",
        address: "ul. Mokotowska 8, Warszawa",
        price: "€45",
        status: "Zrealizowana",
        stylistName: "Piotr Kowalski",
        stylistRole: "Barber",
        rating: 4,
        salonImage:
            "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80",
    },
];

export const mockVouchersAndRewards: VouchersAndRewards = {
    voucher: {
        title: "Bon podarunkowy",
        amount: "€50",
        validUntil: "31.03.2024",
        code: "BEAUTY2024",
    },
    loyaltyDiscount: {
        title: "Zniżka lojalnościowa",
        percentage: "15%",
        subtitle: "Na następną wizytę",
        visitsToNext: 2,
    },
    loyaltyPoints: {
        title: "Punkty lojalnościowe",
        points: 850,
        subtitle: "Do wykorzystania",
    },
};
