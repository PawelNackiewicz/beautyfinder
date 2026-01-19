import { Injectable } from '@nestjs/common';

export interface Salon {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  premiumUntil: Date | null;
  rating: number;
  reviewCount: number;
}

@Injectable()
export class SalonService {
  private readonly salons: Salon[] = [
    {
      id: '1',
      name: 'Studio Urody Glow',
      address: 'ul. Marszałkowska 10/12',
      city: 'Warszawa',
      postalCode: '00-001',
      phone: '+48 22 123 45 67',
      premiumUntil: new Date('2027-06-30'),
      rating: 4.8,
      reviewCount: 245,
    },
    {
      id: '2',
      name: 'Bella Beauty',
      address: 'ul. Floriańska 15',
      city: 'Kraków',
      postalCode: '31-019',
      phone: '+48 12 987 65 43',
      premiumUntil: new Date('2027-12-31'),
      rating: 4.9,
      reviewCount: 312,
    },
    {
      id: '3',
      name: 'Instytut Piękna Sopot',
      address: 'ul. Bohaterów Monte Cassino 20',
      city: 'Sopot',
      postalCode: '81-704',
      phone: '+48 58 555 11 22',
      premiumUntil: null,
      rating: 4.5,
      reviewCount: 89,
    },
    {
      id: '4',
      name: 'Poznań Beauty Lounge',
      address: 'ul. Półwiejska 32',
      city: 'Poznań',
      postalCode: '61-888',
      phone: '+48 61 777 88 99',
      premiumUntil: new Date('2026-09-15'),
      rating: 4.7,
      reviewCount: 178,
    },
    {
      id: '5',
      name: 'Wrocławskie Spa',
      address: 'Rynek 5',
      city: 'Wrocław',
      postalCode: '50-106',
      phone: '+48 71 333 44 55',
      premiumUntil: new Date('2026-11-20'),
      rating: 4.6,
      reviewCount: 156,
    },
    {
      id: '6',
      name: 'Lux Beauty Warszawa',
      address: 'ul. Nowy Świat 25',
      city: 'Warszawa',
      postalCode: '00-029',
      phone: '+48 22 234 56 78',
      premiumUntil: new Date('2027-03-31'),
      rating: 4.9,
      reviewCount: 421,
    },
    {
      id: '7',
      name: 'Glamour Studio Kraków',
      address: 'ul. Grodzka 8',
      city: 'Kraków',
      postalCode: '31-044',
      phone: '+48 12 876 54 32',
      premiumUntil: new Date('2026-08-25'),
      rating: 4.8,
      reviewCount: 289,
    },
    {
      id: '8',
      name: 'Elite Beauty Gdańsk',
      address: 'ul. Długa 12',
      city: 'Gdańsk',
      postalCode: '80-827',
      phone: '+48 58 666 77 88',
      premiumUntil: new Date('2026-10-10'),
      rating: 4.7,
      reviewCount: 203,
    },
    {
      id: '9',
      name: 'Premium Spa Wrocław',
      address: 'ul. Świdnicka 40',
      city: 'Wrocław',
      postalCode: '50-028',
      phone: '+48 71 444 55 66',
      premiumUntil: new Date('2027-01-15'),
      rating: 4.9,
      reviewCount: 367,
    },
    {
      id: '10',
      name: 'Royal Beauty Poznań',
      address: 'ul. Święty Marcin 29',
      city: 'Poznań',
      postalCode: '61-806',
      phone: '+48 61 888 99 00',
      premiumUntil: new Date('2026-07-30'),
      rating: 4.8,
      reviewCount: 234,
    },
    {
      id: '11',
      name: 'Diamond Spa Warszawa',
      address: 'al. Jerozolimskie 65',
      city: 'Warszawa',
      postalCode: '00-697',
      phone: '+48 22 345 67 89',
      premiumUntil: new Date('2026-12-31'),
      rating: 4.7,
      reviewCount: 198,
    },
    {
      id: '12',
      name: 'Prestige Beauty Łódź',
      address: 'ul. Piotrkowska 104',
      city: 'Łódź',
      postalCode: '90-926',
      phone: '+48 42 222 33 44',
      premiumUntil: new Date('2026-06-15'),
      rating: 4.6,
      reviewCount: 145,
    },
    {
      id: '13',
      name: 'Exclusive Spa Katowice',
      address: 'ul. 3 Maja 15',
      city: 'Katowice',
      postalCode: '40-096',
      phone: '+48 32 555 66 77',
      premiumUntil: new Date('2027-02-28'),
      rating: 4.8,
      reviewCount: 267,
    },
    {
      id: '14',
      name: 'VIP Beauty Gdynia',
      address: 'ul. Świętojańska 43',
      city: 'Gdynia',
      postalCode: '81-391',
      phone: '+48 58 777 88 99',
      premiumUntil: new Date('2027-05-20'),
      rating: 4.9,
      reviewCount: 334,
    },
    {
      id: '15',
      name: 'Platinum Spa Szczecin',
      address: 'al. Niepodległości 36',
      city: 'Szczecin',
      postalCode: '70-404',
      phone: '+48 91 333 44 55',
      premiumUntil: new Date('2026-09-30'),
      rating: 4.7,
      reviewCount: 189,
    },
  ];

  findAll(): Salon[] {
    return this.salons;
  }

  getPremiumSalons(location?: string): Salon[] {
    const now = new Date();
    
    // Filter premium salons (premiumUntil is not null and in the future)
    let premiumSalons = this.salons.filter(
      salon => salon.premiumUntil !== null && salon.premiumUntil > now
    );

    // Filter by location if specified
    if (location) {
      premiumSalons = premiumSalons.filter(
        salon => salon.city.toLowerCase() === location.toLowerCase()
      );
    }

    // Sort by review count (descending) and then by rating (descending)
    premiumSalons.sort((a, b) => {
      if (b.reviewCount !== a.reviewCount) {
        return b.reviewCount - a.reviewCount;
      }
      return b.rating - a.rating;
    });

    // Return top 10
    return premiumSalons.slice(0, 10);
  }
}
