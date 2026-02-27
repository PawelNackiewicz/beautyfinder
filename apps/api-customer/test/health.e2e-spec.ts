import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { createTestApp, MockPrismaService } from './helpers';

describe('HealthController (e2e)', () => {
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

  describe('GET /health', () => {
    it('should return 200 with status "ok" when database is healthy', async () => {
      prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('info');
      expect(response.body.info).toHaveProperty('database');
      expect(response.body.info.database.status).toBe('up');
    });

    it('should return 503 when database is unavailable', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('Connection refused'));

      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(503);

      expect(response.body).toHaveProperty('statusCode', 503);
    });
  });
});
