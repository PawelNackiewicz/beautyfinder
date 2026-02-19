import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(userId: string) {
    return this.prisma.user.findUnique({
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
  }

  async getUserAppointments(userId: string) {
    // Since appointments are partitioned in the DB, we'll use raw SQL
    // Prisma doesn't have great support for partitioned tables
    return this.prisma.$queryRaw`
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
      LIMIT 50
    `;
  }

  async getUserLoyaltyBalances(userId: string) {
    return this.prisma.loyaltyBalance.findMany({
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
  }

  async getUserReviews(userId: string) {
    return this.prisma.review.findMany({
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
  }
}
