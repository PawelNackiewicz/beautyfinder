import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  createTestLocation,
  TEST_LOCATION_ID,
  TEST_SALON_ID,
} from './helpers';

describe('LocationController (e2e)', () => {
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

  describe('GET /locations', () => {
    it('should return paginated list of locations', async () => {
      const location = {
        ...createTestLocation(),
        salon: { id: TEST_SALON_ID, slug: 'studio-urody-warszawa' },
      };
      prisma.location.findMany.mockResolvedValue([location]);
      prisma.location.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/locations')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('city', 'Warszawa');
      expect(response.body.data[0]).toHaveProperty('salon');
    });

    it('should support pagination', async () => {
      prisma.location.findMany.mockResolvedValue([]);
      prisma.location.count.mockResolvedValue(30);

      const response = await request(app.getHttpServer())
        .get('/locations?page=2&limit=10')
        .expect(200);

      expect(response.body.meta.page).toBe(2);
      expect(response.body.meta.totalPages).toBe(3);
    });
  });

  describe('GET /locations/:id', () => {
    it('should return location details', async () => {
      const location = {
        ...createTestLocation(),
        salon: { id: TEST_SALON_ID, slug: 'studio-urody-warszawa' },
      };
      prisma.location.findUnique.mockResolvedValue(location);

      const response = await request(app.getHttpServer())
        .get(`/locations/${TEST_LOCATION_ID}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', TEST_LOCATION_ID);
      expect(response.body).toHaveProperty('name', 'Studio Urody Centrum');
      expect(response.body).toHaveProperty('latitude');
      expect(response.body).toHaveProperty('longitude');
    });

    it('should return 404 for non-existent location', async () => {
      prisma.location.findUnique.mockResolvedValue(null);

      const fakeId = '00000000-0000-4000-a000-999999999999';
      const response = await request(app.getHttpServer())
        .get(`/locations/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });

  describe('GET /locations/salon/:salonId', () => {
    it('should return locations for a specific salon', async () => {
      const location = createTestLocation();
      prisma.location.findMany.mockResolvedValue([location]);
      prisma.location.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get(`/locations/salon/${TEST_SALON_ID}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('salonId', TEST_SALON_ID);
    });

    it('should return empty data for salon with no locations', async () => {
      prisma.location.findMany.mockResolvedValue([]);
      prisma.location.count.mockResolvedValue(0);

      const response = await request(app.getHttpServer())
        .get(`/locations/salon/${TEST_SALON_ID}`)
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });
});
