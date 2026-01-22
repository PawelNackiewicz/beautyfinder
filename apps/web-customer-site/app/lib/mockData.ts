
export const SERVICES = [
  { id: "fryzjer", name: "Fryzjer", description: "Najlepsi fryzjerzy w Twojej okolicy" },
  { id: "paznokcie", name: "Paznokcie", description: "Zadbaj o swoje dłonie i stopy" },
  { id: "makijaz", name: "Makijaż", description: "Profesjonalny makijaż na każdą okazję" },
  { id: "kosmetyczka", name: "Kosmetyczka", description: "Zabiegi pielęgnacyjne dla Twojej cery" },
  { id: "masaz", name: "Masaż", description: "Relaks i odprężenie dla Twojego ciała" },
  { id: "barber", name: "Barber", description: "Profesjonalne strzyżenie i golenie dla mężczyzn" },
];

export const CITIES = [
  { id: "warszawa", name: "Warszawa", slug: "warszawa", imageUrl: 'https://picsum.photos/seed/warsaw/800/600' },
  { id: "krakow", name: "Kraków", slug: "krakow", imageUrl: 'https://picsum.photos/seed/krakow/800/600' },
  { id: "wroclaw", name: "Wrocław", slug: "wroclaw", imageUrl: 'https://picsum.photos/seed/wroclaw/800/600' },
  { id: "poznan", name: "Poznań", slug: "poznan", imageUrl: 'https://picsum.photos/seed/poznan/800/600' },
  { id: "gdansk", name: "Gdańsk", slug: "gdansk", imageUrl: 'https://picsum.photos/seed/gdansk/800/600' },
];

export interface Salon {
  id: string;
  slug: string; // Added slug
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  city: string; // city slug or Name? Let's use name to match existing usage in ListView but we might want slug too.
  citySlug: string; 
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const SALONS: Salon[] = [
  {
    id: '1',
    slug: 'green-velvet-studio',
    name: 'Green Velvet Studio',
    category: 'fryzjer', // keeping lowercase id style or display name? ListView used display name 'Fryzjer'. Let's use lowercase for matching logic.
    rating: 4.9,
    reviews: 128,
    location: 'ul. Marszałkowska 12, Warszawa',
    city: 'Warszawa',
    citySlug: 'warszawa',
    imageUrl: 'https://picsum.photos/seed/salon1/400/300',
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: '2',
    slug: 'pure-beauty-lounge',
    name: 'Pure Beauty Lounge',
    category: 'kosmetyczka',
    rating: 4.8,
    reviews: 95,
    location: 'ul. Floriańska 5, Kraków',
    city: 'Kraków',
    citySlug: 'krakow',
    imageUrl: 'https://picsum.photos/seed/salon2/400/300',
    coordinates: { lat: 50.0647, lng: 19.9450 }
  },
  {
    id: '3',
    slug: 'sharp-clean-barber',
    name: 'Sharp & Clean Barber',
    category: 'barber',
    rating: 5.0,
    reviews: 210,
    location: 'ul. Świdnicka 44, Wrocław',
    city: 'Wrocław',
    citySlug: 'wroclaw',
    imageUrl: 'https://picsum.photos/seed/salon3/400/300',
    coordinates: { lat: 51.1079, lng: 17.0385 }
  },
  {
    id: '4',
    slug: 'indigo-nails-art',
    name: 'Indigo Nails Art',
    category: 'paznokcie',
    rating: 4.7,
    reviews: 340,
    location: 'ul. Półwiejska 1, Poznań',
    city: 'Poznań',
    citySlug: 'poznan',
    imageUrl: 'https://picsum.photos/seed/salon4/400/300',
    coordinates: { lat: 52.4064, lng: 16.9252 }
  },
  {
    id: '5',
    slug: 'ethereal-spa',
    name: 'Ethereal Spa',
    category: 'masaz',
    rating: 4.9,
    reviews: 72,
    location: 'ul. Długa 10, Gdańsk',
    city: 'Gdańsk',
    citySlug: 'gdansk',
    imageUrl: 'https://picsum.photos/seed/salon5/400/300',
    coordinates: { lat: 54.3520, lng: 18.6466 }
  }
];

export const MOCK_USER = {
  name: 'Aleksandra Nowak',
  role: 'Gold Loyalty Member',
  points: 1250,
  maxPoints: 2000,
  phone: '+48 600 500 400',
  email: 'a.nowak@luxmail.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
};