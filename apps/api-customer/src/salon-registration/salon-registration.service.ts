import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalonRegistrationDto } from './dto/create-salon-registration.dto';

@Injectable()
export class SalonRegistrationService {
    constructor(private readonly prisma: PrismaService) { }

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

    async findAll() {
        return this.prisma.salonRegistration.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        return this.prisma.salonRegistration.findUnique({
            where: { id },
        });
    }
}
