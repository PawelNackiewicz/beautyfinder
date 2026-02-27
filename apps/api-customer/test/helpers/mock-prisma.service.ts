/**
 * MockPrismaService — replaces real PrismaService in E2E tests.
 *
 * Provides jest.fn() stubs for every Prisma model method used by the API.
 * Each test should configure return values via mockResolvedValue / mockResolvedValueOnce.
 * Call resetAllMocks() in beforeEach to start clean.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

function createModelMock() {
  return {
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
    count: jest.fn().mockResolvedValue(0),
    upsert: jest.fn().mockResolvedValue({}),
  };
}

export class MockPrismaService {
  salon = createModelMock();
  location = createModelMock();
  treatment = createModelMock();
  treatmentVariant = createModelMock();
  treatmentAddon = createModelMock();
  staffProfile = createModelMock();
  staffWeeklySchedule = createModelMock();
  review = createModelMock();
  user = createModelMock();
  loyaltyBalance = createModelMock();
  consentType = createModelMock();
  consentVersion = createModelMock();
  userConsent = createModelMock();
  salonRegistration = createModelMock();
  userAuthIdentity = createModelMock();
  commissionInvoice = createModelMock();
  salonSettings = createModelMock();
  salonUserRole = createModelMock();

  // Raw query mock (used by UserService for appointments)
  $queryRaw = jest.fn().mockResolvedValue([]);

  // Connection lifecycle (no-ops in tests)
  $connect = jest.fn().mockResolvedValue(undefined);
  $disconnect = jest.fn().mockResolvedValue(undefined);

  // Used by HealthModule's PrismaHealthIndicator
  $executeRaw = jest.fn().mockResolvedValue(1);

  /**
   * Reset all mocks to their default empty state.
   * Call this in beforeEach() to ensure test isolation.
   */
  resetAllMocks(): void {
    const models = [
      this.salon,
      this.location,
      this.treatment,
      this.treatmentVariant,
      this.treatmentAddon,
      this.staffProfile,
      this.staffWeeklySchedule,
      this.review,
      this.user,
      this.loyaltyBalance,
      this.consentType,
      this.consentVersion,
      this.userConsent,
      this.salonRegistration,
      this.userAuthIdentity,
      this.commissionInvoice,
      this.salonSettings,
      this.salonUserRole,
    ];

    for (const model of models) {
      Object.values(model).forEach((fn: any) => {
        if (typeof fn.mockReset === 'function') {
          fn.mockReset();
          fn.mockResolvedValue(fn === model.count ? 0 : fn === model.findMany ? [] : null);
        }
      });
      // Restore default for count and findMany
      model.findMany.mockResolvedValue([]);
      model.count.mockResolvedValue(0);
      model.create.mockResolvedValue({});
      model.update.mockResolvedValue({});
    }

    this.$queryRaw.mockReset().mockResolvedValue([]);
    this.$connect.mockReset().mockResolvedValue(undefined);
    this.$disconnect.mockReset().mockResolvedValue(undefined);
    this.$executeRaw.mockReset().mockResolvedValue(1);
  }
}
