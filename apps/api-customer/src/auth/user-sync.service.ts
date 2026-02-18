import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserSyncService {
  constructor(private prisma: PrismaService) { }

  async findOrCreateUser(clerkUserId: string, clerkEmail?: string) {
    // Try to find existing user by clerk identity
    const userAuthIdentity = await this.prisma.userAuthIdentity.findUnique({
      where: {
        provider_providerUserId: {
          provider: 'clerk',
          providerUserId: clerkUserId,
        },
      },
      include: {
        user: true,
      },
    });

    if (userAuthIdentity) {
      // Update last login
      await this.prisma.userAuthIdentity.update({
        where: { id: userAuthIdentity.id },
        data: { lastLogin: new Date() },
      });
      return userAuthIdentity.user;
    }

    // Create new user and auth identity
    const newUser = await this.prisma.user.create({
      data: {
        email: clerkEmail,
        authIdentities: {
          create: {
            provider: 'clerk',
            providerUserId: clerkUserId,
            lastLogin: new Date(),
          },
        },
      },
      include: {
        authIdentities: true,
      },
    });

    return newUser;
  }
}
