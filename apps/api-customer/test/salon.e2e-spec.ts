import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  createTestSalonWithRelations,
  createTestTreatment,
  TEST_SALON_ID,
} from './helpers';

describe('SalonController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: MockPrismaService;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());
  });

  beforeEach(() => {
    prisma.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /salons', () => {
    it('should return paginated list of salons', async () => {
      const salonData = createTestSalonWithRelations();
      prisma.salon.findMany.mockResolvedValue([salonData]);
      prisma.salon.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/salons')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.meta).toHaveProperty('total', 1);
      expect(response.body.meta).toHaveProperty('page', 1);
      expect(response.body.meta).toHaveProperty('limit', 20);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('id', TEST_SALON_ID);
      expect(response.body.data[0]).toHaveProperty('slug');
      expect(response.body.data[0]).toHaveProperty('reviewStats');
    });

    it('should respect page and limit query params', async () => {
      prisma.salon.findMany.mockResolvedValue([]);
      prisma.salon.count.mockResolvedValue(50);

      const response = await request(app.getHttpServer())
        .get('/salons?page=3&limit=5')
        .expect(200);

      expect(response.body.meta).toHaveProperty('page', 3);
      expect(response.body.meta).toHaveProperty('limit', 5);
      expect(response.body.meta).toHaveProperty('totalPages', 10);

      // Verify skip/take passed to Prisma
      expect(prisma.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10, // (page 3 - 1) * limit 5
          take: 5,
        }),
      );
    });

    it('should return 400 when limit exceeds 100', async () => {
      await request(app.getHttpServer())
        .get('/salons?limit=999')
        .expect(400);
    });

    it('should return empty data when no salons exist', async () => {
      prisma.salon.findMany.mockResolvedValue([]);
      prisma.salon.count.mockResolvedValue(0);

      const response = await request(app.getHttpServer())
        .get('/salons')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.meta.total).toBe(0);
    });
  });

  describe('GET /salons/premium', () => {
    it('should return max 10 premium salons', async () => {
      prisma.salon.findMany.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/salons/premium')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(prisma.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 10 }),
      );
    });

    it('should filter by location when query param provided', async () => {
      prisma.salon.findMany.mockResolvedValue([]);

      await request(app.getHttpServer())
        .get('/salons/premium?location=Warszawa')
        .expect(200);

      expect(prisma.salon.findMany).toHaveBeenCalledWith(
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

    it('should return salons with review stats', async () => {
      const salonData = createTestSalonWithRelations();
      prisma.salon.findMany.mockResolvedValue([salonData]);

      const response = await request(app.getHttpServer())
        .get('/salons/premium')
        .expect(200);

      expect(response.body[0]).toHaveProperty('reviewStats');
      expect(response.body[0].reviewStats).toHaveProperty('averageRating');
      expect(response.body[0].reviewStats).toHaveProperty('reviewCount');
    });
  });

  describe('GET /salons/map', () => {
    it('should return salons with coordinates', async () => {
      const salonData = {
        ...createTestSalonWithRelations(),
        locations: [
          {
            name: 'Centrum',
            city: 'Warszawa',
            streetAddress: 'ul. Marszałkowska 10',
            latitude: 52.229676,
            longitude: 21.012229,
          },
        ],
        treatments: [{ category: 'Fryzjer' }],
      };
      prisma.salon.findMany.mockResolvedValue([salonData]);

      const response = await request(app.getHttpServer())
        .get('/salons/map')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('coordinates');
      expect(response.body[0].coordinates).toHaveProperty('lat');
      expect(response.body[0].coordinates).toHaveProperty('lng');
    });

    it('should filter by location', async () => {
      prisma.salon.findMany.mockResolvedValue([]);

      await request(app.getHttpServer())
        .get('/salons/map?location=Kraków')
        .expect(200);

      expect(prisma.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            locations: expect.objectContaining({
              some: expect.objectContaining({
                city: { equals: 'Kraków', mode: 'insensitive' },
              }),
            }),
          }),
        }),
      );
    });
  });

  describe('GET /salons/search', () => {
    const createSearchSalonData = (overrides = {}) => ({
      ...createTestSalonWithRelations(),
      treatments: [
        {
          id: 'treat-1',
          name: 'Masaż relaksacyjny',
          category: 'Masaż',
          variants: [{ priceCents: 15000 }],
        },
      ],
      ...overrides,
    });

    it('should return paginated search results with correct structure', async () => {
      const salonData = createSearchSalonData();
      prisma.salon.findMany.mockResolvedValue([salonData]);
      prisma.salon.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/salons/search?q=masaż')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.meta).toHaveProperty('total', 1);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('id', TEST_SALON_ID);
      expect(response.body.data[0]).toHaveProperty('slug');
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('reviewStats');
      expect(response.body.data[0]).toHaveProperty('treatments');
      expect(response.body.data[0]).toHaveProperty('imageUrl');
    });

    it('should filter by city query param', async () => {
      prisma.salon.findMany.mockResolvedValue([]);
      prisma.salon.count.mockResolvedValue(0);

      await request(app.getHttpServer())
        .get('/salons/search?city=Warszawa')
        .expect(200);

      expect(prisma.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            AND: [
              {
                locations: {
                  some: {
                    city: { equals: 'Warszawa', mode: 'insensitive' },
                  },
                },
              },
            ],
          },
        }),
      );
    });

    it('should combine q and city params', async () => {
      prisma.salon.findMany.mockResolvedValue([]);
      prisma.salon.count.mockResolvedValue(0);

      await request(app.getHttpServer())
        .get('/salons/search?q=masaż&city=Kraków')
        .expect(200);

      const calledWith = prisma.salon.findMany.mock.calls[0][0];
      expect(calledWith.where.AND).toHaveLength(2);
    });

    it('should return 400 when limit exceeds 100', async () => {
      await request(app.getHttpServer())
        .get('/salons/search?limit=999')
        .expect(400);
    });

    it('should return empty results when no salons match', async () => {
      prisma.salon.findMany.mockResolvedValue([]);
      prisma.salon.count.mockResolvedValue(0);

      const response = await request(app.getHttpServer())
        .get('/salons/search?q=xyz-not-existing')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.meta.total).toBe(0);
    });

    it('should return all salons when no search params provided', async () => {
      const salonData = createSearchSalonData();
      prisma.salon.findMany.mockResolvedValue([salonData]);
      prisma.salon.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/salons/search')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(prisma.salon.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {},
        }),
      );
    });

    it('should include treatment data with minPriceCents in response', async () => {
      const salonData = createSearchSalonData();
      prisma.salon.findMany.mockResolvedValue([salonData]);
      prisma.salon.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/salons/search')
        .expect(200);

      const salon = response.body.data[0];
      expect(salon.treatments).toHaveLength(1);
      expect(salon.treatments[0]).toHaveProperty('id');
      expect(salon.treatments[0]).toHaveProperty('name', 'Masaż relaksacyjny');
      expect(salon.treatments[0]).toHaveProperty('category', 'Masaż');
      expect(salon.treatments[0]).toHaveProperty('minPriceCents', 15000);
    });
  });
});
