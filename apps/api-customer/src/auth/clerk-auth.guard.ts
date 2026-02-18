import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyToken } from '@clerk/backend';
import { Request } from 'express';
import { UserSyncService } from './user-sync.service';
import { CurrentUserPayload } from './current-user.decorator';
import { ClerkJWTPayload } from './clerk.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: CurrentUserPayload;
    }
  }
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private userSyncService: UserSyncService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.slice(7); // Remove 'Bearer ' prefix

    try {
      // Verify token with Clerk
      const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');
      if (!secretKey) {
        throw new UnauthorizedException('CLERK_SECRET_KEY not configured');
      }

      const decoded = (await verifyToken(token, {
        secretKey,
      })) as unknown as ClerkJWTPayload;

      // Find or create user in database (with profile sync)
      const user = await this.userSyncService.findOrCreateUser(decoded);

      // Attach user to request
      request.user = {
        id: user.id,
        email: user.email ?? undefined,
      };

      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
