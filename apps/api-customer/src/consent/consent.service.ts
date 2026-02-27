import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GrantConsentDto } from './dto/grant-consent.dto';

@Injectable()
export class ConsentService {
  constructor(private readonly prisma: PrismaService) {}

  async getConsentTypes() {
    return this.prisma.consentType.findMany({
      include: {
        consentVersions: {
          orderBy: { publishedAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async getUserConsents(userId: string) {
    return this.prisma.userConsent.findMany({
      where: { userId },
      include: {
        consentVersion: {
          include: {
            consentType: true,
          },
        },
      },
      orderBy: { respondedAt: 'desc' },
    });
  }

  async grantConsent(userId: string, dto: GrantConsentDto) {
    const version = await this.prisma.consentVersion.findUnique({
      where: { id: dto.consentVersionId },
    });

    if (!version) {
      throw new NotFoundException(
        `Consent version "${dto.consentVersionId}" not found`,
      );
    }

    return this.prisma.userConsent.create({
      data: {
        userId,
        consentVersionId: dto.consentVersionId,
        isGranted: true,
        ipAddress: dto.ipAddress ?? null,
      },
    });
  }

  async revokeConsent(userId: string, dto: GrantConsentDto) {
    const existingConsent = await this.prisma.userConsent.findFirst({
      where: {
        userId,
        consentVersion: { id: dto.consentVersionId },
        isGranted: true,
        revokedAt: null,
      },
      orderBy: { respondedAt: 'desc' },
    });

    if (!existingConsent) {
      throw new NotFoundException('No active consent found to revoke');
    }

    return this.prisma.userConsent.update({
      where: { id: existingConsent.id },
      data: { revokedAt: new Date() },
    });
  }
}
