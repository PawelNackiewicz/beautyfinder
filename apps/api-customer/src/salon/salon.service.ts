import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  PaginationQueryDto,
  createPaginatedResponse,
  type PaginatedResponse,
} from '../common';
import type {
  SalonListItemResponse,
  MapSalonResponse,
  SearchSalonResponse,
} from './interfaces/salon.interface';
import type { SearchSalonsQueryDto } from './dto/search-salons-query.dto';

@Injectable()
export class SalonService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(
    pagination: PaginationQueryDto,
  ): Promise<PaginatedResponse<SalonListItemResponse>> {
    const [salons, total] = await Promise.all([
      this.prisma.salon.findMany({
        skip: pagination.skip,
        take: pagination.limit,
        include: {
          locations: {
            take: 1,
            select: {
              id: true,
              name: true,
              streetAddress: true,
              postalCode: true,
              city: true,
              country: true,
              latitude: true,
              longitude: true,
            },
          },
          reviews: {
            select: { rating: true },
          },
          _count: { select: { reviews: true } },
        },
      }),
      this.prisma.salon.count(),
    ]);

    const mapped: SalonListItemResponse[] = salons.map((salon) => {
      const loc = salon.locations[0] ?? null;
      return {
        id: salon.id,
        slug: salon.slug,
        currency: salon.currency,
        primaryLocation: loc
          ? {
            ...loc,
            latitude: loc.latitude ? Number(loc.latitude) : null,
            longitude: loc.longitude ? Number(loc.longitude) : null,
          }
          : null,
        reviewStats: {
          averageRating: this.calculateAverageRating(
            salon.reviews.map((r) => r.rating),
          ),
          reviewCount: salon._count.reviews,
        },
      };
    });

    return createPaginatedResponse(
      mapped,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async getPremiumSalons(location?: string): Promise<SalonListItemResponse[]> {
    // Premium salons are identified by salon_settings containing a premium flag
    // For now, we return top-rated salons, optionally filtered by location
    const where = location
      ? {
        locations: {
          some: {
            city: { equals: location, mode: 'insensitive' as const },
          },
        },
      }
      : {};

    const salons = await this.prisma.salon.findMany({
      where,
      take: 10,
      include: {
        locations: {
          take: 1,
          select: {
            id: true,
            name: true,
            streetAddress: true,
            postalCode: true,
            city: true,
            country: true,
            latitude: true,
            longitude: true,
          },
        },
        reviews: {
          select: { rating: true },
        },
        _count: { select: { reviews: true } },
      },
      orderBy: [{ reviews: { _count: 'desc' } }],
    });

    return salons.map((salon) => {
      const loc = salon.locations[0] ?? null;
      return {
        id: salon.id,
        slug: salon.slug,
        currency: salon.currency,
        primaryLocation: loc
          ? {
            ...loc,
            latitude: loc.latitude ? Number(loc.latitude) : null,
            longitude: loc.longitude ? Number(loc.longitude) : null,
          }
          : null,
        reviewStats: {
          averageRating: this.calculateAverageRating(
            salon.reviews.map((r) => r.rating),
          ),
          reviewCount: salon._count.reviews,
        },
      };
    });
  }

  async getMapSalons(location?: string): Promise<MapSalonResponse[]> {
    const where = location
      ? {
        locations: {
          some: {
            city: { equals: location, mode: 'insensitive' as const },
          },
        },
      }
      : {
        locations: {
          some: {
            latitude: { not: null },
            longitude: { not: null },
          },
        },
      };

    const salons = await this.prisma.salon.findMany({
      where,
      take: 100,
      include: {
        locations: {
          where: {
            latitude: { not: null },
            longitude: { not: null },
          },
          take: 1,
          select: {
            name: true,
            city: true,
            streetAddress: true,
            latitude: true,
            longitude: true,
          },
        },
        treatments: {
          take: 1,
          select: { category: true },
        },
        reviews: {
          select: { rating: true },
        },
        _count: { select: { reviews: true } },
      },
    });

    return salons
      .filter((s) => s.locations.length > 0)
      .map((salon) => {
        const loc = salon.locations[0];
        return {
          id: salon.id,
          slug: salon.slug,
          name: loc.name,
          category: salon.treatments[0]?.category ?? null,
          rating: this.calculateAverageRating(
            salon.reviews.map((r) => r.rating),
          ),
          reviewCount: salon._count.reviews,
          location: `${loc.city}, ${loc.streetAddress}`,
          imageUrl: null,
          coordinates: {
            lat: Number(loc.latitude),
            lng: Number(loc.longitude),
          },
        };
      });
  }

  async search(
    query: SearchSalonsQueryDto,
  ): Promise<PaginatedResponse<SearchSalonResponse>> {
    const where: Prisma.SalonWhereInput = {};
    const conditions: Prisma.SalonWhereInput[] = [];

    // Filter by city
    if (query.city) {
      conditions.push({
        locations: {
          some: {
            city: { equals: query.city, mode: 'insensitive' },
          },
        },
      });
    }

    // Search by query string (treatment name, treatment category, or salon location name)
    if (query.q) {
      conditions.push({
        OR: [
          {
            treatments: {
              some: {
                name: { contains: query.q, mode: 'insensitive' },
              },
            },
          },
          {
            treatments: {
              some: {
                category: { contains: query.q, mode: 'insensitive' },
              },
            },
          },
          {
            locations: {
              some: {
                name: { contains: query.q, mode: 'insensitive' },
              },
            },
          },
        ],
      });
    }

    if (conditions.length > 0) {
      where.AND = conditions;
    }

    const [salons, total] = await Promise.all([
      this.prisma.salon.findMany({
        where,
        skip: query.skip,
        take: query.limit,
        include: {
          locations: {
            take: 1,
            select: {
              id: true,
              name: true,
              streetAddress: true,
              postalCode: true,
              city: true,
              country: true,
              latitude: true,
              longitude: true,
            },
          },
          treatments: {
            take: 5,
            select: {
              id: true,
              name: true,
              category: true,
              variants: {
                select: { priceCents: true },
                orderBy: { priceCents: 'asc' },
                take: 1,
              },
            },
          },
          reviews: {
            select: { rating: true },
          },
          _count: { select: { reviews: true } },
        },
        orderBy: [{ reviews: { _count: 'desc' } }],
      }),
      this.prisma.salon.count({ where }),
    ]);

    const mapped: SearchSalonResponse[] = salons.map((salon) => {
      const loc = salon.locations[0] ?? null;
      return {
        id: salon.id,
        slug: salon.slug,
        name: loc?.name ?? salon.slug,
        currency: salon.currency,
        primaryLocation: loc
          ? {
            ...loc,
            latitude: loc.latitude ? Number(loc.latitude) : null,
            longitude: loc.longitude ? Number(loc.longitude) : null,
          }
          : null,
        reviewStats: {
          averageRating: this.calculateAverageRating(
            salon.reviews.map((r) => r.rating),
          ),
          reviewCount: salon._count.reviews,
        },
        treatments: salon.treatments.map((t) => ({
          id: t.id,
          name: t.name,
          category: t.category,
          minPriceCents: t.variants[0]?.priceCents ?? null,
        })),
        imageUrl: null,
      };
    });

    return createPaginatedResponse(
      mapped,
      total,
      query.page,
      query.limit,
    );
  }

  private calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  }
}
