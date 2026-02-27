import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  createTestReview,
  TEST_SALON_ID,
  TEST_SALON_ID_2,
} from './helpers';

describe('ReviewController (e2e)', () => {
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

  describe('POST /reviews/batch', () => {
    it('should return review stats for given salon IDs', async () => {
      const review = createTestReview();
      prisma.review.findMany.mockResolvedValue([review]);

      const response = await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: [TEST_SALON_ID] })
        .expect(201);

      expect(response.body).toHaveProperty(TEST_SALON_ID);
      expect(response.body[TEST_SALON_ID]).toHaveProperty('averageRating');
      expect(response.body[TEST_SALON_ID]).toHaveProperty('reviewCount');
      expect(response.body[TEST_SALON_ID]).toHaveProperty('reviews');
    });

    it('should return empty stats for salon with no reviews', async () => {
      prisma.review.findMany.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: [TEST_SALON_ID] })
        .expect(201);

      expect(response.body[TEST_SALON_ID]).toHaveProperty('reviewCount', 0);
      expect(response.body[TEST_SALON_ID]).toHaveProperty('averageRating', 0);
      expect(response.body[TEST_SALON_ID].reviews).toHaveLength(0);
    });

    it('should handle multiple salon IDs', async () => {
      const reviews = [
        createTestReview({ salonId: TEST_SALON_ID, rating: 5 }),
        createTestReview({
          id: '00000000-0000-4000-a000-000000000052',
          salonId: TEST_SALON_ID_2,
          rating: 3,
          appointmentId: '00000000-0000-4000-a000-000000000053',
        }),
      ];
      prisma.review.findMany.mockResolvedValue(reviews);

      const response = await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: [TEST_SALON_ID, TEST_SALON_ID_2] })
        .expect(201);

      expect(response.body).toHaveProperty(TEST_SALON_ID);
      expect(response.body).toHaveProperty(TEST_SALON_ID_2);
    });

    it('should return 400 when salonIds is missing', async () => {
      await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({})
        .expect(400);
    });

    it('should return 400 when salonIds contains invalid UUIDs', async () => {
      await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: ['not-a-uuid'] })
        .expect(400);
    });

    it('should return 400 when salonIds is not an array', async () => {
      await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: 'not-array' })
        .expect(400);
    });
  });
});
