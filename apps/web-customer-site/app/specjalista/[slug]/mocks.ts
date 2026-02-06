import {
    SpecialistDetail,
    PortfolioImage,
    SpecialistReview,
} from "./types";

export const mockSpecialist: SpecialistDetail = {
    id: "1",
    slug: "kamil-nowak",
    name: "Kamil Nowak",
    specialty: "Ekspert stylizacji włosów",
    yearsOfExperience: 10,
    description:
        "Ekspert z ponad 10-letnim doświadczeniem w kreowaniu luksusowych wizerunków. Jego prace charakteryzują się precyzją i indywidualnym podejściem do każdej klientki, łącząc klasykę z nowoczesnymi trendami haute couture. Specjalista od koloryzacji premium.",
    avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    salonName: "Élégance Beauty Studio",
    salonSlug: "elegance-beauty-studio",
    city: "Warszawa",
    rating: 4.9,
    reviewCount: 124,
    yesterdayVisitors: 8,
    cityRankPercentile: 1,
};

export const mockPortfolioImages: PortfolioImage[] = [
    {
        id: "1",
        url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600",
        alt: "Blond balayage stylizacja",
        width: 600,
        height: 750,
    },
    {
        id: "2",
        url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600",
        alt: "Elegancka koloryzacja brązowa",
        width: 600,
        height: 900,
    },
    {
        id: "3",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
        alt: "Naturalna stylizacja",
        width: 600,
        height: 750,
    },
    {
        id: "4",
        url: "https://images.unsplash.com/photo-1560869713-bf165a677be3?q=80&w=600",
        alt: "Koloryzacja premium",
        width: 600,
        height: 900,
    },
    {
        id: "5",
        url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600",
        alt: "Profesjonalna pielęgnacja włosów",
        width: 600,
        height: 750,
    },
    {
        id: "6",
        url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600",
        alt: "Stylizacja na specjalną okazję",
        width: 600,
        height: 900,
    },
    {
        id: "7",
        url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=600",
        alt: "Klasyczny bob",
        width: 600,
        height: 750,
    },
    {
        id: "8",
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
        alt: "Strzyżenie damskie",
        width: 600,
        height: 900,
    },
    {
        id: "9",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600",
        alt: "Naturalne fale",
        width: 600,
        height: 750,
    },
];

export const mockReviews: SpecialistReview[] = [
    {
        id: "1",
        authorName: "Anna Nowakowska",
        authorAvatarUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100",
        rating: 5,
        comment:
            '"Najlepszy stylista w Warszawie. Kamil ma niesamowite oko do koloru. Moje włosy nigdy nie wyglądały tak zdrowo i luksusowo."',
        date: "2 dni temu",
    },
    {
        id: "2",
        authorName: "Katarzyna Wiśniewska",
        authorAvatarUrl:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100",
        rating: 5,
        comment:
            '"Pełen profesjonalizm i dbałość o każdy detal. Salon jest przepiękny, a atmosfera u Kamila pozwala się w pełni zrelaksować."',
        date: "Tydzień temu",
    },
];
