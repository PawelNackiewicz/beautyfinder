import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  createTestStaffProfile,
  createTestWeeklySchedule,
  TEST_SALON_ID,
  TEST_STAFF_ID,
} from './helpers';

describe('StaffController (e2e)', () => {
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

  describe('GET /salons/:salonId/staff', () => {
    it('should return paginated staff list for a salon', async () => {
      const staff = createTestStaffProfile();
      prisma.staffProfile.findMany.mockResolvedValue([staff]);
      prisma.staffProfile.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('displayName', 'Anna Nowak');
    });

    it('should return empty data when salon has no staff', async () => {
      prisma.staffProfile.findMany.mockResolvedValue([]);
      prisma.staffProfile.count.mockResolvedValue(0);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff`)
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.meta.total).toBe(0);
    });
  });

  describe('GET /salons/:salonId/staff/:staffId', () => {
    it('should return staff profile with treatment capabilities and reviews', async () => {
      const profile = {
        ...createTestStaffProfile(),
        treatmentCapabilities: [],
        reviews: [],
      };
      prisma.staffProfile.findFirst.mockResolvedValue(profile);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff/${TEST_STAFF_ID}`)
        .expect(200);

      expect(response.body).toHaveProperty('displayName', 'Anna Nowak');
      expect(response.body).toHaveProperty('treatmentCapabilities');
      expect(response.body).toHaveProperty('reviews');
    });

    it('should return 404 for non-existent staff member', async () => {
      prisma.staffProfile.findFirst.mockResolvedValue(null);

      const fakeId = '00000000-0000-4000-a000-999999999999';
      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body.message).toContain('not found');
    });
  });

  describe('GET /salons/:salonId/staff/:staffId/availability', () => {
    it('should return weekly schedule', async () => {
      const schedule = createTestWeeklySchedule();
      prisma.staffWeeklySchedule.findMany.mockResolvedValue([schedule]);

      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff/${TEST_STAFF_ID}/availability`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('dayOfWeek');
      expect(response.body[0]).toHaveProperty('availableRanges');
      expect(response.body[0]).toHaveProperty('location');
    });

    it('should return 404 for non-existent staff availability', async () => {
      prisma.staffWeeklySchedule.findMany.mockResolvedValue([]);
      prisma.staffProfile.findFirst.mockResolvedValue(null); // staff doesn't exist

      const fakeId = '00000000-0000-4000-a000-999999999999';
      const response = await request(app.getHttpServer())
        .get(`/salons/${TEST_SALON_ID}/staff/${fakeId}/availability`)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });
});
