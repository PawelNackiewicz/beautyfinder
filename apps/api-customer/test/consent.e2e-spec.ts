import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  AUTH_HEADER,
  createTestConsentType,
  createTestUserConsent,
  TEST_CONSENT_VERSION_ID,
  TEST_USER_ID,
} from './helpers';

describe('ConsentController (e2e)', () => {
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

  describe('GET /consents/types', () => {
    it('should return consent types (public, no auth required)', async () => {
      const consentType = createTestConsentType();
      prisma.consentType.findMany.mockResolvedValue([consentType]);

      const response = await request(app.getHttpServer())
        .get('/consents/types')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('slug', 'marketing');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('consentVersions');
      expect(response.body[0].consentVersions).toHaveLength(1);
    });

    it('should return empty array when no consent types exist', async () => {
      prisma.consentType.findMany.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/consents/types')
        .expect(200);

      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /consents/me', () => {
    it('should return 403 without auth token', async () => {
      await request(app.getHttpServer()).get('/consents/me').expect(403);
    });

    it('should return user consents with auth', async () => {
      const consent = createTestUserConsent();
      prisma.userConsent.findMany.mockResolvedValue([consent]);

      const response = await request(app.getHttpServer())
        .get('/consents/me')
        .set(AUTH_HEADER)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toHaveProperty('userId', TEST_USER_ID);
      expect(response.body[0]).toHaveProperty('isGranted', true);
      expect(response.body[0]).toHaveProperty('consentVersion');
      expect(response.body[0].consentVersion).toHaveProperty('consentType');
    });

    it('should return empty array when user has no consents', async () => {
      prisma.userConsent.findMany.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/consents/me')
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body).toHaveLength(0);
    });
  });

  describe('POST /consents/grant', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .post('/consents/grant')
        .send({ consentVersionId: TEST_CONSENT_VERSION_ID })
        .expect(403);
    });

    it('should grant consent with valid data', async () => {
      const version = {
        id: TEST_CONSENT_VERSION_ID,
        consentTypeSlug: 'marketing',
        versionTag: 'v1.0',
        contentSummary: 'Marketing emails',
        publishedAt: new Date(),
      };
      prisma.consentVersion.findUnique.mockResolvedValue(version);

      const grantedConsent = createTestUserConsent();
      prisma.userConsent.create.mockResolvedValue(grantedConsent);

      const response = await request(app.getHttpServer())
        .post('/consents/grant')
        .set(AUTH_HEADER)
        .send({
          consentVersionId: TEST_CONSENT_VERSION_ID,
          ipAddress: '127.0.0.1',
        })
        .expect(201);

      expect(response.body).toHaveProperty('isGranted', true);
      expect(response.body).toHaveProperty('userId', TEST_USER_ID);
    });

    it('should return 400 when consentVersionId is missing', async () => {
      await request(app.getHttpServer())
        .post('/consents/grant')
        .set(AUTH_HEADER)
        .send({})
        .expect(400);
    });

    it('should return 400 for invalid UUID format', async () => {
      await request(app.getHttpServer())
        .post('/consents/grant')
        .set(AUTH_HEADER)
        .send({ consentVersionId: 'not-a-uuid' })
        .expect(400);
    });

    it('should return 404 when consent version does not exist', async () => {
      prisma.consentVersion.findUnique.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .post('/consents/grant')
        .set(AUTH_HEADER)
        .send({ consentVersionId: TEST_CONSENT_VERSION_ID })
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });

  describe('POST /consents/revoke', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .post('/consents/revoke')
        .send({ consentVersionId: TEST_CONSENT_VERSION_ID })
        .expect(403);
    });

    it('should revoke an active consent', async () => {
      const existingConsent = createTestUserConsent();
      prisma.userConsent.findFirst.mockResolvedValue(existingConsent);

      const revokedConsent = {
        ...existingConsent,
        revokedAt: new Date(),
      };
      prisma.userConsent.update.mockResolvedValue(revokedConsent);

      const response = await request(app.getHttpServer())
        .post('/consents/revoke')
        .set(AUTH_HEADER)
        .send({ consentVersionId: TEST_CONSENT_VERSION_ID })
        .expect(201);

      expect(response.body).toHaveProperty('revokedAt');
    });

    it('should return 404 when no active consent to revoke', async () => {
      prisma.userConsent.findFirst.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .post('/consents/revoke')
        .set(AUTH_HEADER)
        .send({ consentVersionId: TEST_CONSENT_VERSION_ID })
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body.message).toContain('No active consent');
    });
  });
});
