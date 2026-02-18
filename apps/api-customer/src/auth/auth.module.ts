import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkAuthGuard } from './clerk-auth.guard';
import { UserSyncService } from './user-sync.service';

@Module({
  imports: [PrismaModule],
  providers: [ClerkAuthGuard, UserSyncService],
  exports: [ClerkAuthGuard, UserSyncService],
})
export class AuthModule {}
