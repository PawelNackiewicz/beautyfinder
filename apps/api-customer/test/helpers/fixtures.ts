/**
 * E2E test data fixtures.
 * Provides factory functions for consistent test data across all E2E test files.
 */

const uuid = (n: number) =>
  `00000000-0000-4000-a000-${n.toString().padStart(12, '0')}`;

// ── Users ───────────────────────────────────────────────────────────────
export const TEST_USER_ID = uuid(1);
export const TEST_USER_EMAIL = 'test@example.com';

export function createTestUser(overrides = {}) {
  return {
    id: TEST_USER_ID,
    email: TEST_USER_EMAIL,
    phone: '+48123456789',
    firstName: 'Jan',
    lastName: 'Kowalski',
    fullName: 'Jan Kowalski',
    avatarUrl: null,
    gender: 'M',
    dateOfBirth: new Date('1990-01-15'),
    authProvider: 'clerk',
    createdAt: new Date('2025-01-01'),
    lastSyncedAt: new Date('2025-06-01'),
    deletedAt: null,
    ...overrides,
  };
}

// ── Salons ──────────────────────────────────────────────────────────────
export const TEST_SALON_ID = uuid(10);
export const TEST_SALON_ID_2 = uuid(11);

export function createTestSalon(overrides = {}) {
  return {
    id: TEST_SALON_ID,
    slug: 'studio-urody-warszawa',
    currency: 'PLN',
    ...overrides,
  };
}

// ── Locations ───────────────────────────────────────────────────────────
export const TEST_LOCATION_ID = uuid(20);

export function createTestLocation(overrides = {}) {
  return {
    id: TEST_LOCATION_ID,
    salonId: TEST_SALON_ID,
    name: 'Studio Urody Centrum',
    streetAddress: 'ul. Marszałkowska 10',
    postalCode: '00-001',
    city: 'Warszawa',
    country: 'Poland',
    latitude: 52.229676,
    longitude: 21.012229,
    workingHours: {
      monday: { open: true, start: '09:00', end: '18:00' },
      tuesday: { open: true, start: '09:00', end: '18:00' },
    },
    ...overrides,
  };
}

// ── Treatments ──────────────────────────────────────────────────────────
export const TEST_TREATMENT_ID = uuid(30);

export function createTestTreatment(overrides = {}) {
  return {
    id: TEST_TREATMENT_ID,
    salonId: TEST_SALON_ID,
    name: 'Strzyżenie damskie',
    description: 'Profesjonalne strzyżenie damskie',
    category: 'Fryzjer',
    variants: [
      {
        id: uuid(31),
        priceCents: 12000,
        durationMinutes: 45,
      },
    ],
    addons: [
      {
        id: uuid(32),
        name: 'Modelowanie',
        priceDeltaCents: 3000,
        durationDeltaMinutes: 15,
      },
    ],
    ...overrides,
  };
}

// ── Staff ───────────────────────────────────────────────────────────────
export const TEST_STAFF_ID = uuid(40);

export function createTestStaffProfile(overrides = {}) {
  return {
    userId: TEST_STAFF_ID,
    salonId: TEST_SALON_ID,
    displayName: 'Anna Nowak',
    bio: 'Doświadczony fryzjer',
    jobTitle: 'Senior Stylist',
    socialLinks: null,
    joinedAt: new Date('2024-06-01'),
    ...overrides,
  };
}

export function createTestWeeklySchedule(overrides = {}) {
  return {
    id: uuid(41),
    staffId: TEST_STAFF_ID,
    locationId: TEST_LOCATION_ID,
    dayOfWeek: 1,
    availableRanges: [{ start: '09:00', end: '17:00' }],
    note: null,
    location: {
      id: TEST_LOCATION_ID,
      name: 'Studio Urody Centrum',
      city: 'Warszawa',
    },
    ...overrides,
  };
}

// ── Reviews ─────────────────────────────────────────────────────────────
export const TEST_REVIEW_ID = uuid(50);

export function createTestReview(overrides = {}) {
  return {
    id: TEST_REVIEW_ID,
    appointmentId: uuid(51),
    salonId: TEST_SALON_ID,
    userId: TEST_USER_ID,
    staffId: TEST_STAFF_ID,
    rating: 5,
    comment: 'Świetna obsługa!',
    photos: null,
    staffReply: null,
    createdAt: new Date('2025-06-15'),
    staff: { displayName: 'Anna Nowak' },
    ...overrides,
  };
}

// ── Salon with full relations (for salon.findMany) ──────────────────────
export function createTestSalonWithRelations(overrides = {}) {
  return {
    ...createTestSalon(),
    locations: [createTestLocation()],
    reviews: [{ rating: 5 }, { rating: 4 }],
    _count: { reviews: 2 },
    ...overrides,
  };
}

// ── Consent ─────────────────────────────────────────────────────────────
export const TEST_CONSENT_VERSION_ID = uuid(60);

export function createTestConsentType(overrides = {}) {
  return {
    slug: 'marketing',
    name: 'Marketing communications',
    isMandatory: false,
    consentVersions: [
      {
        id: TEST_CONSENT_VERSION_ID,
        consentTypeSlug: 'marketing',
        versionTag: 'v1.0',
        contentSummary: 'We may send you marketing emails.',
        publishedAt: new Date('2025-01-01'),
      },
    ],
    ...overrides,
  };
}

export function createTestUserConsent(overrides = {}) {
  return {
    id: uuid(61),
    userId: TEST_USER_ID,
    consentVersionId: TEST_CONSENT_VERSION_ID,
    isGranted: true,
    respondedAt: new Date('2025-06-01'),
    revokedAt: null,
    ipAddress: '127.0.0.1',
    consentVersion: {
      id: TEST_CONSENT_VERSION_ID,
      consentTypeSlug: 'marketing',
      versionTag: 'v1.0',
      contentSummary: 'We may send you marketing emails.',
      publishedAt: new Date('2025-01-01'),
      consentType: {
        slug: 'marketing',
        name: 'Marketing communications',
        isMandatory: false,
      },
    },
    ...overrides,
  };
}

// ── Salon Registration ──────────────────────────────────────────────────
export const TEST_REGISTRATION_ID = uuid(70);

export function createTestSalonRegistration(overrides = {}) {
  return {
    id: TEST_REGISTRATION_ID,
    submittedBy: TEST_USER_ID,
    publicName: 'Nowy Salon',
    companyName: 'Nowy Salon Sp. z o.o.',
    nip: '1234567890',
    mainCategory: 'Fryzjer',
    subcategories: ['Koloryzacja', 'Strzyżenie'],
    streetAddress: 'ul. Nowa 5',
    floorUnit: null,
    postalCode: '00-001',
    city: 'Warszawa',
    latitude: null,
    longitude: null,
    phone: '+48111222333',
    email: 'salon@example.com',
    website: null,
    coverPhotoUrl: null,
    logoUrl: null,
    gallery: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    socialMedia: {},
    amenities: [],
    workingHours: {
      monday: { open: true, start: '09:00', end: '18:00' },
      tuesday: { open: true, start: '09:00', end: '18:00' },
      wednesday: { open: true, start: '09:00', end: '18:00' },
      thursday: { open: true, start: '09:00', end: '18:00' },
      friday: { open: true, start: '09:00', end: '17:00' },
      saturday: { open: false, start: null, end: null },
      sunday: { open: false, start: null, end: null },
    },
    technicalBreak: null,
    stationCount: 3,
    cancellationPolicy: '24h',
    status: 'PENDING',
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2025-06-01'),
    ...overrides,
  };
}

// ── Loyalty ─────────────────────────────────────────────────────────────
export function createTestLoyaltyBalance(overrides = {}) {
  return {
    id: uuid(80),
    userId: TEST_USER_ID,
    salonId: TEST_SALON_ID,
    points: 150,
    lastUpdated: new Date('2025-06-01'),
    salon: {
      id: TEST_SALON_ID,
      slug: 'studio-urody-warszawa',
    },
    ...overrides,
  };
}
