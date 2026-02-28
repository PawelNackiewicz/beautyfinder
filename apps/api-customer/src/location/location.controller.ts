import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { PaginationQueryDto } from '../common';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.locationService.findAll(pagination);
  }

  @Get('cities')
  findDistinctCities() {
    return this.locationService.findDistinctCities();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.locationService.findById(id);
  }

  @Get('salon/:salonId')
  findBySalon(
    @Param('salonId') salonId: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.locationService.findBySalon(salonId, pagination);
  }
}
