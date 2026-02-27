import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto, createPaginatedResponse } from '../common';
import { CreateSalonRegistrationDto } from './dto/create-salon-registration.dto';

@Injectable()
export class SalonRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSalonRegistrationDto, userId?: string) {
    return this.prisma.salonRegistration.create({
      data: {
        submittedBy: userId ?? null,
        publicName: dto.publicName,
        companyName: dto.companyName,
        nip: dto.nip,
        mainCategory: dto.mainCategory,
        subcategories: dto.subcategories,
        streetAddress: dto.streetAddress,
        floorUnit: dto.floorUnit ?? null,
        postalCode: dto.postalCode,
        city: dto.city,
        latitude: dto.latitude ?? null,
        longitude: dto.longitude ?? null,
        phone: dto.phone,
        email: dto.email,
        website: dto.website ?? null,
        coverPhotoUrl: dto.coverPhotoUrl ?? null,
        logoUrl: dto.logoUrl ?? null,
        gallery: dto.gallery ?? [],
        description: dto.description,
        socialMedia: dto.socialMedia ?? {},
        amenities: dto.amenities ?? [],
        workingHours: dto.workingHours,
        technicalBreak: dto.technicalBreak
          ? (dto.technicalBreak as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        stationCount: dto.stationCount,
        cancellationPolicy: dto.cancellationPolicy,
        status: 'PENDING',
      },
    });
  }

  async findAll(pagination: PaginationQueryDto) {
    const [registrations, total] = await Promise.all([
      this.prisma.salonRegistration.findMany({
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.salonRegistration.count(),
    ]);

    return createPaginatedResponse(
      registrations,
      total,
      pagination.page,
      pagination.limit,
    );
  }

  async findById(id: string) {
    const registration = await this.prisma.salonRegistration.findUnique({
      where: { id },
    });

    if (!registration) {
      throw new NotFoundException(
        `Salon registration with id "${id}" not found`,
      );
    }

    return registration;
  }
}
