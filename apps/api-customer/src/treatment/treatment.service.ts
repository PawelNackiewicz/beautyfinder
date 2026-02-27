import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto, createPaginatedResponse } from '../common';

@Injectable()
export class TreatmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySalon(salonId: string, pagination: PaginationQueryDto) {
    const [treatments, total] = await Promise.all([
      this.prisma.treatment.findMany({
        where: { salonId },
        skip: pagination.skip,
        take: pagination.limit,
        include: {
          variants: {
            select: {
              id: true,
              priceCents: true,
              durationMinutes: true,
            },
          },
          addons: {
            select: {
              id: true,
              name: true,
              priceDeltaCents: true,
              durationDeltaMinutes: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.treatment.count({ where: { salonId } }),
    ]);

    return createPaginatedResponse(
      treatments,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findById(salonId: string, id: string) {
    const treatment = await this.prisma.treatment.findFirst({
      where: { id, salonId },
      include: {
        variants: {
          include: {
            variantAddons: {
              include: {
                treatmentAddon: true,
              },
            },
            staffCapabilities: {
              include: {
                staff: {
                  select: {
                    userId: true,
                    displayName: true,
                  },
                },
              },
            },
          },
        },
        addons: true,
      },
    });

    if (!treatment) {
      throw new NotFoundException(
        `Treatment with id "${id}" not found in salon "${salonId}"`,
      );
    }

    return treatment;
  }
}
