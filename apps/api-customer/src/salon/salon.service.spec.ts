import { Test, TestingModule } from '@nestjs/testing';
import { SalonService } from './salon.service';

describe('SalonService', () => {
  let service: SalonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalonService],
    }).compile();

    service = module.get<SalonService>(SalonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all salons', () => {
      const salons = service.findAll();

      expect(salons).toBeDefined();
      expect(Array.isArray(salons)).toBe(true);
      expect(salons.length).toBeGreaterThan(0);
    });

    it('should return salons with all required properties', () => {
      const salons = service.findAll();
      const salon = salons[0];

      expect(salon).toHaveProperty('id');
      expect(salon).toHaveProperty('name');
      expect(salon).toHaveProperty('address');
      expect(salon).toHaveProperty('city');
      expect(salon).toHaveProperty('postalCode');
      expect(salon).toHaveProperty('phone');
      expect(salon).toHaveProperty('premiumUntil');
      expect(salon).toHaveProperty('rating');
      expect(salon).toHaveProperty('reviewCount');
    });
  });

  describe('getPremiumSalons', () => {
    describe('without location filter', () => {
      it('should return only premium salons with active subscription', () => {
        const premiumSalons = service.getPremiumSalons();

        expect(premiumSalons).toBeDefined();
        expect(Array.isArray(premiumSalons)).toBe(true);

        const now = new Date();
        premiumSalons.forEach((salon) => {
          expect(salon.premiumUntil).not.toBeNull();
          expect(salon.premiumUntil!.getTime()).toBeGreaterThan(now.getTime());
        });
      });

      it('should return maximum 10 salons', () => {
        const premiumSalons = service.getPremiumSalons();

        expect(premiumSalons.length).toBeLessThanOrEqual(10);
      });

      it('should sort salons by reviewCount (descending) and then by rating (descending)', () => {
        const premiumSalons = service.getPremiumSalons();

        for (let i = 0; i < premiumSalons.length - 1; i++) {
          const current = premiumSalons[i];
          const next = premiumSalons[i + 1];

          // If review counts are different, current should have more reviews
          if (current.reviewCount !== next.reviewCount) {
            expect(current.reviewCount).toBeGreaterThan(next.reviewCount);
          } else {
            // If review counts are the same, current should have higher or equal rating
            expect(current.rating).toBeGreaterThanOrEqual(next.rating);
          }
        }
      });

      it('should not include salons with null premiumUntil', () => {
        const premiumSalons = service.getPremiumSalons();

        premiumSalons.forEach((salon) => {
          expect(salon.premiumUntil).not.toBeNull();
        });
      });

      it('should not include salons with expired premium status', () => {
        const premiumSalons = service.getPremiumSalons();
        const now = new Date();

        premiumSalons.forEach((salon) => {
          expect(salon.premiumUntil!.getTime()).toBeGreaterThan(now.getTime());
        });
      });
    });

    describe('with location filter', () => {
      it('should return only premium salons from specified city', () => {
        const location = 'Warszawa';
        const premiumSalons = service.getPremiumSalons(location);

        expect(premiumSalons).toBeDefined();
        expect(Array.isArray(premiumSalons)).toBe(true);

        premiumSalons.forEach((salon) => {
          expect(salon.city).toBe(location);
        });
      });

      it('should be case-insensitive when filtering by location', () => {
        const premiumSalonsLower = service.getPremiumSalons('warszawa');
        const premiumSalonsUpper = service.getPremiumSalons('WARSZAWA');
        const premiumSalonsMixed = service.getPremiumSalons('Warszawa');

        expect(premiumSalonsLower.length).toBe(premiumSalonsUpper.length);
        expect(premiumSalonsLower.length).toBe(premiumSalonsMixed.length);
      });

      it('should return empty array if no premium salons in specified location', () => {
        const premiumSalons = service.getPremiumSalons('NonExistentCity');

        expect(premiumSalons).toBeDefined();
        expect(Array.isArray(premiumSalons)).toBe(true);
        expect(premiumSalons.length).toBe(0);
      });

      it('should return maximum 10 salons even with location filter', () => {
        const premiumSalons = service.getPremiumSalons('Warszawa');

        expect(premiumSalons.length).toBeLessThanOrEqual(10);
      });

      it('should sort filtered salons by reviewCount and rating', () => {
        const premiumSalons = service.getPremiumSalons('Kraków');

        for (let i = 0; i < premiumSalons.length - 1; i++) {
          const current = premiumSalons[i];
          const next = premiumSalons[i + 1];

          if (current.reviewCount !== next.reviewCount) {
            expect(current.reviewCount).toBeGreaterThan(next.reviewCount);
          } else {
            expect(current.rating).toBeGreaterThanOrEqual(next.rating);
          }
        }
      });

      it('should only return active premium salons from specified location', () => {
        const location = 'Poznań';
        const premiumSalons = service.getPremiumSalons(location);
        const now = new Date();

        premiumSalons.forEach((salon) => {
          expect(salon.city).toBe(location);
          expect(salon.premiumUntil).not.toBeNull();
          expect(salon.premiumUntil!.getTime()).toBeGreaterThan(now.getTime());
        });
      });
    });

    describe('edge cases', () => {
      it('should handle empty string location', () => {
        const premiumSalons = service.getPremiumSalons('');

        expect(premiumSalons).toBeDefined();
        expect(Array.isArray(premiumSalons)).toBe(true);
      });

      it('should handle undefined location parameter', () => {
        const premiumSalons = service.getPremiumSalons(undefined);

        expect(premiumSalons).toBeDefined();
        expect(Array.isArray(premiumSalons)).toBe(true);
        expect(premiumSalons.length).toBeGreaterThan(0);
      });

      it('should return salons with valid rating range (0-5)', () => {
        const premiumSalons = service.getPremiumSalons();

        premiumSalons.forEach((salon) => {
          expect(salon.rating).toBeGreaterThanOrEqual(0);
          expect(salon.rating).toBeLessThanOrEqual(5);
        });
      });

      it('should return salons with non-negative review count', () => {
        const premiumSalons = service.getPremiumSalons();

        premiumSalons.forEach((salon) => {
          expect(salon.reviewCount).toBeGreaterThanOrEqual(0);
        });
      });
    });
  });
});
