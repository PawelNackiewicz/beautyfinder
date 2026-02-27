import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  createTestTreatment,
  TEST_SALON_ID,
  TEST_TREATMENT_ID,
} from './helpers';

describe('TreatmentController (e2e)', () => {
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

  describe('GET /salons/:salonId/treatments', () => {
    it('should return paginated treatments for a salon', async () => {
      const treatment = createTestTreatment();
      prisma.treatment.findMany.mockResolvedValue([treatment]);
      prisma.treatment.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/treatments`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('name', 'Strzyżenie damskie');
      expect(response.body.data[0]).toHaveProperty('variants');
      expect(response.body.data[0]).toHaveProperty('addons');
    });

    it('should return empty data when salon has no treatments', async () => {
      prisma.treatment.findMany.mockResolvedValue([]);
      prisma.treatment.count.mockResolvedValue(0);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/treatments`)
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.meta.total).toBe(0);
    });

    it('should support pagination params', async () => {
      prisma.treatment.findMany.mockResolvedValue([]);
      prisma.treatment.count.mockResolvedValue(25);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/treatments?page=2&limit=10`)
        .expect(200);

      expect(response.body.meta.page).toBe(2);
      expect(response.body.meta.limit).toBe(10);
      expect(response.body.meta.totalPages).toBe(3);
    });
  });

  describe('GET /salons/:salonId/treatments/:id', () => {
    it('should return treatment details with variants and addons', async () => {
      const detailedTreatment = {
        ...createTestTreatment(),
        variants: [
          {
            id: '00000000-0000-4000-a000-000000000031',
            priceCents: 12000,
            durationMinutes: 45,
            variantAddons: [],
            staffCapabilities: [],
          },
        ],
      };
      prisma.treatment.findFirst.mockResolvedValue(detailedTreatment);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/treatments/${TEST_TREATMENT_ID}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', TEST_TREATMENT_ID);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('variants');
      expect(response.body).toHaveProperty('addons');
    });

    it('should return 404 for non-existent treatment', async () => {
      prisma.treatment.findFirst.mockResolvedValue(null);

      const fakeId = '00000000-0000-4000-a000-999999999999';
      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/treatments/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
