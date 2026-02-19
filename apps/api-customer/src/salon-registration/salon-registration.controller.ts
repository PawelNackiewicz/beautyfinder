import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SalonRegistrationService } from './salon-registration.service';
import { CreateSalonRegistrationDto } from './dto/create-salon-registration.dto';

@Controller('salon-registrations')
export class SalonRegistrationController {
    constructor(
        private readonly salonRegistrationService: SalonRegistrationService,
    ) { }

    @Post()
    create(@Body() dto: CreateSalonRegistrationDto) {
        return this.salonRegistrationService.create(dto);
    }

    @Get()
    findAll() {
        return this.salonRegistrationService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.salonRegistrationService.findById(id);
    }
}
