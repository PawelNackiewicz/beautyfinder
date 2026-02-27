import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { createTestApp, MockPrismaService } from './helpers';

describe('Global / Cross-cutting (e2e)', () => {
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

  describe('GET / (root)', () => {
    it('should return 200 with Hello World', async () => {
      await request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('404 error format', () => {
    it('should return standardized error for non-existent route', async () => {
      const response = await request(app.getHttpServer())
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('path', '/non-existent-route');
    });
  });

  describe('Validation errors', () => {
    it('should return 400 with validation details for invalid query params', async () => {
      const response = await request(app.getHttpServer())
        .get('/salons?limit=999')
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message');
    });

    it('should reject unknown properties (forbidNonWhitelisted)', async () => {
      const response = await request(app.getHttpServer())
        .post('/reviews/batch')
        .send({ salonIds: [], unknownField: 'hack' })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body.message).toContain('should not exist');
    });
  });
});
