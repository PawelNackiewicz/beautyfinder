import {
    SalonDetail,
    LastMinuteDeal,
    PortfolioImage,
    ServiceCategory,
    TeamMember,
    ClientReview,
    SalonContact,
} from './types';

export const mockSalonData: SalonDetail = {
    id: '1',
    slug: 'elegance-beauty-studio',
    name: 'Élégance Beauty Studio',
    tagline: 'Ekskluzywne usługi beauty w sercu Brukseli',
    city: 'Bruksela',
    address: 'Rue de la Loi 123, 1000 Bruxelles',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000',
    rating: 4.9,
    reviewCount: 287,
    verifiedCount: 1200,
    distance: 1.2,
    badge: 'Zweryfikowany Salon',
    images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800',
    ],
};

export const mockLastMinuteDeals: LastMinuteDeal[] = [
    {
        id: '1',
        day: 'Dzisiaj',
        time: '18:30',
        serviceName: 'Balayage Premium',
        staffName: 'Sophie Laurent',
        originalPrice: 96,
        discountedPrice: 96,
        discount: 20,
    },
    {
        id: '2',
        day: 'Dzisiaj',
        time: '20:00',
        serviceName: 'Manicure hybrydowy',
        staffName: 'Emma Janssens',
        originalPrice: 65,
        discountedPrice: 38,
        discount: 35,
    },
    {
        id: '3',
        day: 'Jutro',
        time: '10:00',
        serviceName: 'Masaż relaksacyjny',
        staffName: 'Thomas Vermeulen',
        originalPrice: 80,
        discountedPrice: 60,
        discount: 25,
    },
    {
        id: '4',
        day: 'Jutro',
        time: '14:30',
        serviceName: 'Stylizacja rzęs',
        staffName: 'Isabelle Moreau',
        originalPrice: 70,
        discountedPrice: 49,
        discount: 30,
    },
];

export const mockPortfolioImages: PortfolioImage[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600',
        alt: 'Balayage blond',
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600',
        alt: 'Manicure hybrydowy',
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600',
        alt: 'Makijaż ślubny',
    },
    {
        id: '4',
        url: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=600',
        alt: 'Stylizacja rzęs',
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600',
        alt: 'Masaż relaksacyjny',
    },
    {
        id: '6',
        url: 'https://images.unsplash.com/photo-1560869713-bf165a677be3?q=80&w=600',
        alt: 'Fryzura wieczorowa',
    },
    {
        id: '7',
        url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600',
        alt: 'Pedicure spa',
    },
    {
        id: '8',
        url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600',
        alt: 'Zabieg na twarz',
    },
];

export const mockServiceCategories: ServiceCategory[] = [
    {
        id: '1',
        name: 'Pielęgnacja twarzy',
        icon: '🧖',
        services: [
            { id: '1-1', name: 'Oczyszczanie twarzy', duration: '60 min', price: 85 },
            { id: '1-2', name: 'Peeling chemiczny', duration: '45 min', price: 120 },
            { id: '1-3', name: 'Mezoterapia igłowa', duration: '50 min', price: 200 },
            { id: '1-4', name: 'Maska nawilżająca', duration: '30 min', price: 60 },
        ],
    },
    {
        id: '2',
        name: 'Manicure i pedicure',
        icon: '💅',
        services: [
            { id: '2-1', name: 'Manicure hybrydowy', duration: '60 min', price: 65 },
            { id: '2-2', name: 'Manicure klasyczny', duration: '45 min', price: 45 },
            { id: '2-3', name: 'Pedicure spa', duration: '75 min', price: 80 },
            { id: '2-4', name: 'Żelowe przedłużanie', duration: '90 min', price: 110 },
        ],
    },
    {
        id: '3',
        name: 'Fryzjer',
        icon: '✂️',
        services: [
            { id: '3-1', name: 'Strzyżenie damskie', duration: '45 min', price: 70 },
            { id: '3-2', name: 'Balayage Premium', duration: '120 min', price: 180 },
            { id: '3-3', name: 'Koloryzacja', duration: '90 min', price: 140 },
            { id: '3-4', name: 'Modelowanie', duration: '30 min', price: 50 },
        ],
    },
    {
        id: '4',
        name: 'Stylizacja rzęs i brwi',
        icon: '👁️',
        services: [
            { id: '4-1', name: 'Przedłużanie rzęs 1:1', duration: '90 min', price: 120 },
            { id: '4-2', name: 'Laminacja rzęs', duration: '60 min', price: 85 },
            { id: '4-3', name: 'Henna brwi', duration: '30 min', price: 45 },
            { id: '4-4', name: 'Regulacja brwi', duration: '20 min', price: 30 },
        ],
    },
];

export const mockTeamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Sophie Laurent',
        role: 'Stylistka fryzur',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200',
        rating: 5.0,
        yearsOfExperience: 15,
    },
    {
        id: '2',
        name: 'Emma Janssens',
        role: 'Stylistka paznokci',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
        rating: 5.0,
        yearsOfExperience: 10,
    },
    {
        id: '3',
        name: 'Isabelle Moreau',
        role: 'Stylistka rzęs',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
        rating: 5.0,
        yearsOfExperience: 8,
    },
    {
        id: '4',
        name: 'Kasia Nowak',
        role: 'Stylistka brwi',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200',
        rating: 5.0,
        yearsOfExperience: 12,
    },
    {
        id: '5',
        name: 'Thomas Vermeulen',
        role: 'Masażysta',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200',
        rating: 5.0,
        yearsOfExperience: 20,
    },
];

export const mockClientReviews: ClientReview[] = [
    {
        id: '1',
        authorName: 'Anna Kowalska',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100',
        serviceName: 'Balayage Premium',
        rating: 5,
        comment: 'Absolutnie rewelacyjna obsługa! Sophie to prawdziwa artystka. Moje włosy wyglądają przepięknie, a efekt balayage jest dokładnie taki, o jakim marzyłam. Salon utrzymany w bardzo wysokim standardzie, wszystko czyste i eleganckie.',
        date: '3 dni temu',
        category: 'Fryzjer',
        images: [
            'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200',
            'https://images.unsplash.com/photo-1560869713-bf165a677be3?q=80&w=200',
        ],
    },
    {
        id: '2',
        authorName: 'Martyna Lewandowska',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100',
        serviceName: 'Manicure hybrydowy',
        rating: 5,
        comment: 'Emma wykonała perfekcyjny manicure! Bardzo dokładna, profesjonalna i miła. Paznokcie trzymają się już 3 tygodnie bez odpryśnięć. Polecam z całego serca! Atmosfera w salonie bardzo relaksująca.',
        date: '1 tydzień temu',
        category: 'Manicure',
        images: [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=200',
        ],
    },
    {
        id: '3',
        authorName: 'Zofia Wiśniewska',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=100',
        serviceName: 'Przedłużanie rzęs 1:1',
        rating: 5,
        comment: 'Isabelle jest niesamowita! Rzęsy wyglądają naturalnie i pięknie. Bardzo delikatna i precyzyjna praca. Na pewno wrócę na uzupełnienie.',
        date: '2 tygodnie temu',
        category: 'Rzęsy',
    },
    {
        id: '4',
        authorName: 'Katarzyna Dąbrowska',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=100',
        serviceName: 'Masaż relaksacyjny',
        rating: 5,
        comment: 'Thomas to prawdziwy profesjonalista. Masaż był dokładnie tym, czego potrzebowałam po ciężkim tygodniu. Atmosfera w salonie sprzyja odprężeniu.',
        date: '3 tygodnie temu',
        category: 'Spa',
    },
    {
        id: '5',
        authorName: 'Paulina Kamińska',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100',
        serviceName: 'Oczyszczanie twarzy',
        rating: 4,
        comment: 'Świetny zabieg oczyszczania twarzy. Skóra po zabiegu jest gładka i promienna. Jedyny minus to trochę długi czas oczekiwania.',
        date: '1 miesiąc temu',
        category: 'Manicure',
    },
];

export const mockSalonContact: SalonContact = {
    address: 'Avenue Louise 234',
    postalCode: '1050',
    city: 'Brussels',
    country: 'Belgium',
    phone: '+32 2 123 4567',
    email: 'kontakt@elegance-beauty.be',
    openingHours: [
        { days: 'Poniedziałek - Piątek', hours: '9:00 - 20:00' },
        { days: 'Sobota', hours: '10:00 - 18:00' },
        { days: 'Niedziela', hours: 'Zamknięte' },
    ],
    mapImageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800',
};
