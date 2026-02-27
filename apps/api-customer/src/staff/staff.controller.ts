import { Controller, Get, Param, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { PaginationQueryDto } from '../common';

@Controller('salons/:salonId/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findBySalon(
    @Param('salonId') salonId: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.staffService.findBySalon(salonId, pagination);
  }

  @Get(':staffId')
  findOne(
    @Param('salonId') salonId: string,
    @Param('staffId') staffId: string,
  ) {
    return this.staffService.findOne(salonId, staffId);
  }

  @Get(':staffId/availability')
  getAvailability(
    @Param('salonId') salonId: string,
    @Param('staffId') staffId: string,
  ) {
    return this.staffService.getAvailability(salonId, staffId);
  }
}
