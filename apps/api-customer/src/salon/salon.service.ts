import { Injectable } from '@nestjs/common';

export interface Salon {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
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
    },
    {
      id: '2',
      name: 'Bella Beauty',
      address: 'ul. Floriańska 15',
      city: 'Kraków',
      postalCode: '31-019',
      phone: '+48 12 987 65 43',
    },
    {
      id: '3',
      name: 'Instytut Piękna Sopot',
      address: 'ul. Bohaterów Monte Cassino 20',
      city: 'Sopot',
      postalCode: '81-704',
      phone: '+48 58 555 11 22',
    },
    {
      id: '4',
      name: 'Poznań Beauty Lounge',
      address: 'ul. Półwiejska 32',
      city: 'Poznań',
      postalCode: '61-888',
      phone: '+48 61 777 88 99',
    },
    {
      id: '5',
      name: 'Wrocławskie Spa',
      address: 'Rynek 5',
      city: 'Wrocław',
      postalCode: '50-106',
      phone: '+48 71 333 44 55',
    },
  ];

  findAll(): Salon[] {
    return this.salons;
  }
}
