import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  createTestApp,
  MockPrismaService,
  AUTH_HEADER,
  createTestSalonRegistration,
  TEST_REGISTRATION_ID,
} from './helpers';

describe('SalonRegistrationController (e2e)', () => {
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

  const validRegistrationPayload = {
    publicName: 'Nowy Salon',
    companyName: 'Nowy Salon Sp. z o.o.',
    nip: '1234567890',
    mainCategory: 'Fryzjer',
    subcategories: ['Koloryzacja', 'Strzyżenie'],
    streetAddress: 'ul. Nowa 5',
    postalCode: '00-001',
    city: 'Warszawa',
    phone: '+48111222333',
    email: 'salon@example.com',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    workingHours: {
      monday: { open: true, start: '09:00', end: '18:00' },
      tuesday: { open: true, start: '09:00', end: '18:00' },
      wednesday: { open: true, start: '09:00', end: '18:00' },
      thursday: { open: true, start: '09:00', end: '18:00' },
      friday: { open: true, start: '09:00', end: '17:00' },
      saturday: { open: false, start: null, end: null },
      sunday: { open: false, start: null, end: null },
    },
    stationCount: 3,
    cancellationPolicy: '24h',
  };

  describe('POST /salon-registrations', () => {
    it('should return 403 without auth token', async () => {
      await request(app.getHttpServer())
        .post('/salon-registrations')
        .send(validRegistrationPayload)
        .expect(403);
    });

    it('should create registration with valid data', async () => {
      const registration = createTestSalonRegistration();
      prisma.salonRegistration.create.mockResolvedValue(registration);

      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send(validRegistrationPayload)
        .expect(201);

      expect(response.body).toHaveProperty('id', TEST_REGISTRATION_ID);
      expect(response.body).toHaveProperty('status', 'PENDING');
    });

    it('should return 400 when required fields are missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send({ publicName: 'Incomplete' })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for invalid NIP (not 10 digits)', async () => {
      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send({ ...validRegistrationPayload, nip: '123' })
        .expect(400);

      expect(response.body.message).toContain('NIP must be exactly 10 digits');
    });

    it('should return 400 for invalid postal code', async () => {
      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send({ ...validRegistrationPayload, postalCode: '12345' })
        .expect(400);

      expect(response.body.message).toContain(
        'Postal code must be in format XX-XXX',
      );
    });

    it('should return 400 for too short description', async () => {
      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send({ ...validRegistrationPayload, description: 'Too short' })
        .expect(400);

      expect(response.body.message).toContain(
        'Description must be at least 150 characters',
      );
    });

    it('should return 400 for stationCount less than 1', async () => {
      const response = await request(app.getHttpServer())
        .post('/salon-registrations')
        .set(AUTH_HEADER)
        .send({ ...validRegistrationPayload, stationCount: 0 })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', 400);
    });
  });

  describe('GET /salon-registrations', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .get('/salon-registrations')
        .expect(403);
    });

    it('should return paginated list of registrations', async () => {
      const registration = createTestSalonRegistration();
      prisma.salonRegistration.findMany.mockResolvedValue([registration]);
      prisma.salonRegistration.count.mockResolvedValue(1);

      const response = await request(app.getHttpServer())
        .get('/salon-registrations')
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toHaveProperty('publicName', 'Nowy Salon');
    });
  });

  describe('GET /salon-registrations/:id', () => {
    it('should return 403 without auth', async () => {
      await request(app.getHttpServer())
        .get(`/salon-registrations/${TEST_REGISTRATION_ID}`)
        .expect(403);
    });

    it('should return registration details', async () => {
      const registration = createTestSalonRegistration();
      prisma.salonRegistration.findUnique.mockResolvedValue(registration);

      const response = await request(app.getHttpServer())
        .get(`/salon-registrations/${TEST_REGISTRATION_ID}`)
        .set(AUTH_HEADER)
        .expect(200);

      expect(response.body).toHaveProperty('id', TEST_REGISTRATION_ID);
      expect(response.body).toHaveProperty('publicName');
      expect(response.body).toHaveProperty('nip');
    });

    it('should return 404 for non-existent registration', async () => {
      prisma.salonRegistration.findUnique.mockResolvedValue(null);

      const fakeId = '00000000-0000-4000-a000-999999999999';
      const response = await request(app.getHttpServer())
        .get(`/salon-registrations/${fakeId}`)
        .set(AUTH_HEADER)
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });
});
