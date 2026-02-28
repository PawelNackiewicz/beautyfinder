import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto, createPaginatedResponse } from '../common';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) { }

  async findDistinctCities(): Promise<string[]> {
    const locations = await this.prisma.location.findMany({
      select: { city: true },
      distinct: ['city'],
      orderBy: { city: 'asc' },
    });

    return locations.map((l) => l.city);
  }

  async findAll(pagination: PaginationQueryDto) {
    const [locations, total] = await Promise.all([
      this.prisma.location.findMany({
        skip: pagination.skip,
        take: pagination.limit,
        include: {
          salon: {
            select: { id: true, slug: true },
          },
        },
        orderBy: { city: 'asc' },
      }),
      this.prisma.location.count(),
    ]);

    return createPaginatedResponse(
      locations.map((l) => ({
        ...l,
        latitude: l.latitude ? Number(l.latitude) : null,
        longitude: l.longitude ? Number(l.longitude) : null,
      })),
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findById(id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
      include: {
        salon: {
          select: { id: true, slug: true },
        },
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with id "${id}" not found`);
    }

    return {
      ...location,
      latitude: location.latitude ? Number(location.latitude) : null,
      longitude: location.longitude ? Number(location.longitude) : null,
    };
  }

  async findBySalon(salonId: string, pagination: PaginationQueryDto) {
    const [locations, total] = await Promise.all([
      this.prisma.location.findMany({
        where: { salonId },
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.location.count({ where: { salonId } }),
    ]);

    return createPaginatedResponse(
      locations.map((l) => ({
        ...l,
        latitude: l.latitude ? Number(l.latitude) : null,
        longitude: l.longitude ? Number(l.longitude) : null,
      })),
      total,
      pagination.page,
      pagination.limit,
    );
  }
}
