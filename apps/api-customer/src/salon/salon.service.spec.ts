import { Test, TestingModule } from '@nestjs/testing';
import { SalonService } from './salon.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from '../common';
import { SearchSalonsQueryDto } from './dto/search-salons-query.dto';

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

  describe('search', () => {
    const createSearchSalon = (overrides = {}) => ({
      id: 'uuid-search-1',
      slug: 'salon-relax',
      currency: 'PLN',
      locations: [
        {
          id: 'loc-1',
          name: 'Salon Relax',
          streetAddress: 'ul. Kwiatowa 5',
          postalCode: '00-100',
          city: 'Warszawa',
          country: 'Poland',
          latitude: 52.229676,
          longitude: 21.012229,
        },
      ],
      treatments: [
        {
          id: 'treat-1',
          name: 'Masaż relaksacyjny',
          category: 'Masaż',
          variants: [{ priceCents: 15000 }],
        },
      ],
      reviews: [{ rating: 5 }, { rating: 4 }],
      _count: { reviews: 2 },
      ...overrides,
    });

    it('should return paginated search results', async () => {
      const salon = createSearchSalon();
      mockPrismaService.salon.findMany.mockResolvedValue([salon]);
      mockPrismaService.salon.count.mockResolvedValue(1);

      const query = new SearchSalonsQueryDto();
      query.q = 'masaż';
      const result = await service.search(query);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.meta.total).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toHaveProperty('id', 'uuid-search-1');
      expect(result.data[0]).toHaveProperty('slug', 'salon-relax');
      expect(result.data[0]).toHaveProperty('name', 'Salon Relax');
      expect(result.data[0]).toHaveProperty('treatments');
      expect(result.data[0].treatments).toHaveLength(1);
      expect(result.data[0].treatments[0].minPriceCents).toBe(15000);
    });

    it('should filter by query string (treatment name/category/salon name)', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const query = new SearchSalonsQueryDto();
      query.q = 'masaż';
      await service.search(query);

      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [
              {
                OR: [
                  {
                    treatments: {
                      some: {
                        name: { contains: 'masaż', mode: 'insensitive' },
                      },
                    },
                  },
                  {
                    treatments: {
                      some: {
                        category: { contains: 'masaż', mode: 'insensitive' },
                      },
                    },
                  },
                  {
                    locations: {
                      some: {
                        name: { contains: 'masaż', mode: 'insensitive' },
                      },
                    },
                  },
                ],
              },
            ],
          },
        }),
      );
    });

    it('should filter by city', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const query = new SearchSalonsQueryDto();
      query.city = 'Kraków';
      await service.search(query);

      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [
              {
                locations: {
                  some: {
                    city: { equals: 'Kraków', mode: 'insensitive' },
                  },
                },
              },
            ],
          },
        }),
      );
    });

    it('should combine query and city filters with AND logic', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const query = new SearchSalonsQueryDto();
      query.q = 'fryzjer';
      query.city = 'Warszawa';
      await service.search(query);

      const calledWith = mockPrismaService.salon.findMany.mock.calls[0][0];
      expect(calledWith.where.AND).toHaveLength(2);
      expect(calledWith.where.AND[0]).toHaveProperty('locations');
      expect(calledWith.where.AND[1]).toHaveProperty('OR');
    });

    it('should return all salons when no filters provided', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const query = new SearchSalonsQueryDto();
      await service.search(query);

      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
        }),
      );
    });

    it('should handle correct pagination', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(50);

      const query = new SearchSalonsQueryDto();
      query.page = 2;
      query.limit = 5;
      const result = await service.search(query);

      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.totalPages).toBe(10);
      expect(mockPrismaService.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 5,
          take: 5,
        }),
      );
    });

    it('should return empty results when no match found', async () => {
      mockPrismaService.salon.findMany.mockResolvedValue([]);
      mockPrismaService.salon.count.mockResolvedValue(0);

      const query = new SearchSalonsQueryDto();
      query.q = 'nonexistent';
      const result = await service.search(query);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
      expect(result.meta.totalPages).toBe(0);
    });

    it('should handle salons without treatments or locations', async () => {
      const salon = createSearchSalon({
        locations: [],
        treatments: [],
      });
      mockPrismaService.salon.findMany.mockResolvedValue([salon]);
      mockPrismaService.salon.count.mockResolvedValue(1);

      const query = new SearchSalonsQueryDto();
      const result = await service.search(query);

      expect(result.data[0].primaryLocation).toBeNull();
      expect(result.data[0].treatments).toHaveLength(0);
      expect(result.data[0].name).toBe('salon-relax'); // falls back to slug
    });
  });
});
