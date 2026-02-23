import { Module } from '@nestjs/common';
import { SalonRegistrationController } from './salon-registration.controller';
import { SalonRegistrationService } from './salon-registration.service';

@Module({
    controllers: [SalonRegistrationController],
    providers: [SalonRegistrationService],
})
export class SalonRegistrationModule { }
