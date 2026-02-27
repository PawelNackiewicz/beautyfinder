import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PaginationQueryDto,
  createPaginatedResponse,
  type PaginatedResponse,
} from '../common';
import type {
  UserProfileResponse,
  UserAppointmentResponse,
  UserLoyaltyBalanceResponse,
  UserReviewResponse,
} from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        fullName: true,
        avatarUrl: true,
        gender: true,
        dateOfBirth: true,
        authProvider: true,
        createdAt: true,
        lastSyncedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${userId}" not found`);
    }

    return user;
  }

  async getUserAppointments(
    userId: string,
    pagination: PaginationQueryDto,
  ): Promise<PaginatedResponse<UserAppointmentResponse>> {
    // Appointments use partitioned tables — Prisma doesn't support this model directly.
    // Raw SQL is intentional here. The query is parameterized via tagged template (safe from injection).
    const offset = pagination.skip;
    const limit = pagination.limit;

    const [appointments, countResult] = await Promise.all([
      this.prisma.$queryRaw<UserAppointmentResponse[]>`
        SELECT
          a.id,
          a.start_time as "startTime",
          a.status,
          t.name as "treatmentName",
          tv.price_cents as "priceCents",
          s.display_name as "staffName",
          l.name as "locationName",
          l.city
        FROM appointments a
        JOIN treatment_variants tv ON a.treatment_variant_id = tv.id
        JOIN treatments t ON tv.treatment_id = t.id
        JOIN staff_profiles s ON a.staff_id = s.user_id
        JOIN locations l ON a.location_id = l.id
        WHERE a.user_id = ${userId}
        ORDER BY a.start_time DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      this.prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) as count
        FROM appointments
        WHERE user_id = ${userId}
      `,
    ]);

    const total = Number(countResult[0]?.count ?? 0);
    return createPaginatedResponse(
      appointments,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async getUserLoyaltyBalances(
    userId: string,
  ): Promise<UserLoyaltyBalanceResponse[]> {
    const balances = await this.prisma.loyaltyBalance.findMany({
      where: { userId },
      include: {
        salon: {
          select: {
            id: true,
            slug: true,
          },
        },
      },
      orderBy: { points: 'desc' },
    });

    return balances.map((b) => ({
      id: b.id,
      points: b.points,
      lastUpdated: b.lastUpdated,
      salon: b.salon,
    }));
  }

  async getUserReviews(userId: string): Promise<UserReviewResponse[]> {
    const reviews = await this.prisma.review.findMany({
      where: { userId },
      include: {
        salon: {
          select: {
            id: true,
            slug: true,
          },
        },
        staff: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      salon: r.salon,
      staff: r.staff,
    }));
  }
}
