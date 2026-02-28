import { Controller, Get, Query } from '@nestjs/common';
import { SalonService } from './salon.service';
import { GetSalonsQueryDto } from './dto/get-salons-query.dto';
import { SearchSalonsQueryDto } from './dto/search-salons-query.dto';
import { PaginationQueryDto } from '../common';

@Controller('salons')
export class SalonController {
  constructor(private readonly salonService: SalonService) { }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.salonService.findAll(pagination);
  }

  @Get('search')
  search(@Query() query: SearchSalonsQueryDto) {
    return this.salonService.search(query);
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
