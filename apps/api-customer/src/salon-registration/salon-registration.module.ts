import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SalonRegistrationController } from './salon-registration.controller';
import { SalonRegistrationService } from './salon-registration.service';

@Module({
  imports: [AuthModule],
  controllers: [SalonRegistrationController],
  providers: [SalonRegistrationService],
})
export class SalonRegistrationModule {}
