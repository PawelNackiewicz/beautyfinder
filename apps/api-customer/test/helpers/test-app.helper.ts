import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ClerkAuthGuard } from '../../src/auth/clerk-auth.guard';
import { AllExceptionsFilter } from '../../src/common/filters/all-exceptions.filter';
import { MockPrismaService } from './mock-prisma.service';
import { TEST_USER_ID, TEST_USER_EMAIL } from './fixtures';

/**
 * Mock auth guard that authenticates requests containing 'Bearer test-token'.
 * Attaches a fixed test user to the request, same shape as the real guard.
 */
class MockClerkAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // Will be caught by NestJS → 403
    }

    const token = authHeader.slice(7);
    if (token !== 'test-token') {
      return false;
    }

    // Attach test user to request (same shape as real ClerkAuthGuard)
    request.user = {
      id: TEST_USER_ID,
      email: TEST_USER_EMAIL,
    };

    return true;
  }
}

/**
 * Creates a fully configured NestJS test application with:
 * - The same ValidationPipe as production
 * - The same AllExceptionsFilter
 * - PrismaService replaced by MockPrismaService
 * - ClerkAuthGuard replaced by MockClerkAuthGuard
 * - ThrottlerGuard disabled (tested separately in global.e2e-spec)
 */
export async function createTestApp(): Promise<{
  app: INestApplication;
  prisma: MockPrismaService;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useClass(MockPrismaService)
    .overrideGuard(ClerkAuthGuard)
    .useClass(MockClerkAuthGuard)
    // Replace ThrottlerGuard so it doesn't interfere with tests
    .overrideProvider(APP_GUARD)
    .useValue({ canActivate: () => true })
    .compile();

  const app = moduleFixture.createNestApplication();

  // Same pipes as production (main.ts)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.init();

  const prisma = moduleFixture.get<MockPrismaService>(PrismaService);

  return { app, prisma };
}

/** Auth header for protected endpoints */
export const AUTH_HEADER = { Authorization: 'Bearer test-token' };

