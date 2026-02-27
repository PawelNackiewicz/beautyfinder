import { Test, TestingModule } from '@nestjs/testing';
import { SalonService } from './salon.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common';

// Mock PrismaService
const mockPrismaService = {
  salon: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

describe('SalonService', () => {
  let service: SalonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalonService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SalonService>(SalonService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated salons', async () => {
      const mockSalons = [
        {
          id: 'uuid-1',
          slug: 'studio-urody',
          currency: 'PLN',
          locations: [
            {
              id: 'loc-1',
              name: 'Studio Urody',
              streetAddress: 'ul. Marszałkowska 10',
              postalCode: '00-001',
              city: 'Warszawa',
              country: 'Poland',
              latitude: 52.229676,
              longitude: 21.012229,
            },
          ],
          reviews: [{ rating: 5 }, { rating: 4 }],
          _count: { reviews: 2 },
        },
      ];

      mockPrismaService.salon.findMany.mockResolvedValue(mockSalons);
      mockPrismaService.salon.count.mockResolvedValue(1);

      const pagination = new PaginationQueryDto();
      const result = await service.findAll(pagination);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.meta.total).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toHaveProperty('id', 'uuid-1');
      expect(result.data[0]).toHaveProperty('slug', 'studio-urody');
      expect(result.data[0]).toHaveProperty('reviewStats');
      expect(result.data[0].reviewStats.averageRating).toBe(4.5);
      expect(result.data[0].reviewStats.reviewCount).toBe(2);
    });

    it('should return empty data when no salons exist', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const pagination = new PaginationQueryDto();
      const result = await service.findAll(pagination);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
      expect(result.meta.totalPages).toBe(0);
    });

    it('should calculate correct pagination metadata', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(45);

      const pagination = new PaginationQueryDto();
      pagination.page = 2;
      pagination.limit = 10;
      const result = await service.findAll(pagination);

      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.totalPages).toBe(5);
    });

    it('should handle salons without locations', async () => {
      const mockSalons = [
        {
          id: 'uuid-2',
          slug: 'no-location',
          currency: 'PLN',
          locations: [],
          reviews: [],
          _count: { reviews: 0 },
        },
      ];

      mockPrismaService.salon.findMany.mockResolvedValue(mockSalons);
      mockPrismaService.salon.count.mockResolvedValue(1);

      const pagination = new PaginationQueryDto();
      const result = await service.findAll(pagination);

      expect(result.data[0].primaryLocation).toBeNull();
      expect(result.data[0].reviewStats.averageRating).toBe(0);
    });
  });

  describe('getPremiumSalons', () => {
    it('should return maximum 10 salons', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);

      const result = await service.getPremiumSalons();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10 }),
      );
    });

    it('should filter by location when provided', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);

      await service.getPremiumSalons('Warszawa');

      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            locations: {
              some: {
                city: { equals: 'Warszawa', mode: 'insensitive' },
              },
            },
          },
        }),
      );
    });

    it('should not filter by location when not provided', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);

      await service.getPremiumSalons();

      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
        }),
      );
    });
  });
});
