import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  AUTH_HEADER,
  createTestUser,
  createTestLoyaltyBalance,
  createTestReview,
  TEST_USER_ID,
  TEST_SALON_ID,
} from './helpers';

describe('UserController (e2e)', () => {
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

  describe('GET /users/me', () => {
    it('should return 403 without auth token', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(403);
    });

    it('should return 403 with invalid token', async () => {
      await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);
    });

    it('should return user profile with valid token', async () => {
      const user = createTestUser();
      prisma.user.findUnique.mockResolvedValue(user);

      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body).toHaveProperty('id', TEST_USER_ID);
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('firstName', 'Jan');
      expect(response.body).toHaveProperty('lastName', 'Kowalski');
    });

    it('should return 404 when user not found in database', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set(AUTH_HEADER)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });

  describe('GET /users/me/appointments', () => {
    it('should return 403 without auth token', async () => {
      await request(app.getHttpServer())
        .get('/users/me/appointments')
        .expect(403);
    });

    it('should return paginated appointments', async () => {
      const appointments = [
        {
          id: '00000000-0000-4000-a000-000000000090',
          startTime: new Date('2025-07-01T10:00:00Z'),
          status: 'COMPLETED',
          treatmentName: 'Strzyżenie',
          priceCents: 12000,
          staffName: 'Anna Nowak',
          locationName: 'Centrum',
          city: 'Warszawa',
        },
      ];
      prisma.$queryRaw
        .mockResolvedValueOnce(appointments)
        .mockResolvedValueOnce([{ count: BigInt(1) }]);

      const response = await request(app.getHttpServer())
        .get('/users/me/appointments')
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toHaveLength(1);
    });

    it('should respect pagination params', async () => {
      prisma.$queryRaw
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([{ count: BigInt(0) }]);

      const response = await request(app.getHttpServer())
        .get('/users/me/appointments?page=2&limit=5')
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body.meta.page).toBe(2);
      expect(response.body.meta.limit).toBe(5);
    });
  });

  describe('GET /users/me/loyalty', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .get('/users/me/loyalty')
        .expect(403);
    });

    it('should return loyalty balances', async () => {
      const balance = createTestLoyaltyBalance();
      prisma.loyaltyBalance.findMany.mockResolvedValue([balance]);

      const response = await request(app.getHttpServer())
        .get('/users/me/loyalty')
        .set(AUTH_HEADER)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('points', 150);
      expect(response.body[0]).toHaveProperty('salon');
      expect(response.body[0].salon).toHaveProperty('id', TEST_SALON_ID);
    });
  });

  describe('GET /users/me/reviews', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .get('/users/me/reviews')
        .expect(403);
    });

    it('should return user reviews', async () => {
      const review = {
        ...createTestReview(),
        salon: { id: TEST_SALON_ID, slug: 'studio-urody-warszawa' },
        staff: { displayName: 'Anna Nowak' },
      };
      prisma.review.findMany.mockResolvedValue([review]);

      const response = await request(app.getHttpServer())
        .get('/users/me/reviews')
        .set(AUTH_HEADER)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('rating', 5);
      expect(response.body[0]).toHaveProperty('comment');
      expect(response.body[0]).toHaveProperty('salon');
      expect(response.body[0]).toHaveProperty('staff');
    });
  });
});
