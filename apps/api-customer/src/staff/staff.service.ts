import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto, createPaginatedResponse } from '../common';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySalon(salonId: string, pagination: PaginationQueryDto) {
    const [staff, total] = await Promise.all([
      this.prisma.staffProfile.findMany({
        where: { salonId },
        skip: pagination.skip,
        take: pagination.limit,
        select: {
          userId: true,
          displayName: true,
          bio: true,
          jobTitle: true,
          socialLinks: true,
          joinedAt: true,
        },
        orderBy: { displayName: 'asc' },
      }),
      this.prisma.staffProfile.count({ where: { salonId } }),
    ]);

    return createPaginatedResponse(
      staff,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findOne(salonId: string, staffId: string) {
    const staffProfile = await this.prisma.staffProfile.findFirst({
      where: { userId: staffId, salonId },
      include: {
        treatmentCapabilities: {
          include: {
            treatmentVariant: {
              include: {
                treatment: {
                  select: { name: true, category: true },
                },
              },
            },
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });

    if (!staffProfile) {
      throw new NotFoundException(
        `Staff member "${staffId}" not found in salon "${salonId}"`,
      );
    }

    return staffProfile;
  }

  async getAvailability(salonId: string, staffId: string) {
    const schedules = await this.prisma.staffWeeklySchedule.findMany({
      where: {
        staffId,
        staff: { salonId },
      },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
      orderBy: [{ locationId: 'asc' }, { dayOfWeek: 'asc' }],
    });

    if (schedules.length === 0) {
      // Verify staff exists
      const exists = await this.prisma.staffProfile.findFirst({
        where: { userId: staffId, salonId },
      });
      if (!exists) {
        throw new NotFoundException(
          `Staff member "${staffId}" not found in salon "${salonId}"`,
        );
      }
    }

    return schedules;
  }
}
