import { Controller, Get } from '@nestjs/common';
import { SalonService } from './salon.service';

@Controller('salons')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Get()
  findAll() {
    return this.salonService.findAll();
  }
}
