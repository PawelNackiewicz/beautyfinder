import { Controller, Get, Query } from '@nestjs/common';
import { SalonService } from './salon.service';
import { GetSalonsQueryDto } from './dto/get-salons-query.dto';
import { PaginationQueryDto } from '../common';

@Controller('salons')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.salonService.findAll(pagination);
  }

  @Get('premium')
  getPremiumSalons(@Query() query: GetSalonsQueryDto) {
    return this.salonService.getPremiumSalons(query.location);
  }

  @Get('map')
  getMapSalons(@Query() query: GetSalonsQueryDto) {
    return this.salonService.getMapSalons(query.location);
  }
}
