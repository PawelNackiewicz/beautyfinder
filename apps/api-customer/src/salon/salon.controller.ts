import { Controller, Get, Query } from '@nestjs/common';
import { SalonService } from './salon.service';

@Controller('salons')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get()
  findAll() {
    return this.salonService.findAll();
  }

  @Get('premium')
  getPremiumSalons(@Query('location') location?: string) {
    return this.salonService.getPremiumSalons(location);
  }

  @Get('map')
  getMapSalons(@Query('location') location?: string) {
    return this.salonService.getMapSalons(location);
  }
}
