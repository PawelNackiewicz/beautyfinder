import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClerkJWTPayload, ClerkUserData } from './clerk.types';

@Injectable()
export class UserSyncService {
  constructor(private prisma: PrismaService) {}

  /**
   * Extract user data from Clerk JWT payload
   * Maps Clerk fields to our database schema
   */
  private extractClerkUserData(payload: ClerkJWTPayload): ClerkUserData {
    return {
      clerkUserId: payload.sub,
      email: payload.email,
      phoneNumber: payload.phone_number,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      avatarUrl: payload.profileImageUrl,
    };
  }

  /**
   * Find or create user based on Clerk identity
   * Synchronizes profile data from Clerk to our database (lazy sync)
   */
  async findOrCreateUser(
    clerkPayload: ClerkJWTPayload,
  ): Promise<{ id: string; email: string | null }> {
    const clerkData = this.extractClerkUserData(clerkPayload);

    // 1. Try to find existing user by Clerk identity
    const userAuthIdentity = await this.prisma.userAuthIdentity.findUnique({
      where: {
        provider_providerUserId: {
          provider: 'clerk',
          providerUserId: clerkData.clerkUserId,
        },
      },
      include: {
        user: true,
      },
    });

    if (userAuthIdentity) {
      // 2a. User exists - SYNCHRONIZE profile data
      const updatedUser = await this.prisma.user.update({
        where: { id: userAuthIdentity.userId },
        data: {
          email: clerkData.email,
          phone: clerkData.phoneNumber,
          firstName: clerkData.firstName,
          lastName: clerkData.lastName,
          fullName: clerkData.fullName,
          avatarUrl: clerkData.avatarUrl,
          authProvider: 'clerk',
          lastSyncedAt: new Date(),
        },
      });

      // Update last login in auth_identities
      await this.prisma.userAuthIdentity.update({
        where: { id: userAuthIdentity.id },
        data: {
          lastLogin: new Date(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          metadata: clerkPayload as any, // Prisma JSON type
        },
      });

      return {
        id: updatedUser.id,
        email: updatedUser.email,
      };
    }

    // 2b. User doesn't exist - CREATE new user + auth identity
    const newUser = await this.prisma.user.create({
      data: {
        email: clerkData.email,
        phone: clerkData.phoneNumber,
        firstName: clerkData.firstName,
        lastName: clerkData.lastName,
        fullName: clerkData.fullName,
        avatarUrl: clerkData.avatarUrl,
        authProvider: 'clerk',
        lastSyncedAt: new Date(),
        authIdentities: {
          create: {
            provider: 'clerk',
            providerUserId: clerkData.clerkUserId,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            metadata: clerkPayload as any, // Prisma JSON type
            lastLogin: new Date(),
          },
        },
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  }
}
