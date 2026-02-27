import { Controller, Get, Param, Query } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { PaginationQueryDto } from '../common';

@Controller('salons/:salonId/treatments')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get()
  findBySalon(
    @Param('salonId') salonId: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.treatmentService.findBySalon(salonId, pagination);
  }

  @Get(':id')
  findById(@Param('salonId') salonId: string, @Param('id') id: string) {
    return this.treatmentService.findById(salonId, id);
  }
}
