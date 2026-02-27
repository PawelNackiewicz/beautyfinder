import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';
import { PaginationQueryDto } from '../common';
import { SalonRegistrationService } from './salon-registration.service';
import { CreateSalonRegistrationDto } from './dto/create-salon-registration.dto';

@Controller('salon-registrations')
@UseGuards(ClerkAuthGuard)
export class SalonRegistrationController {
  constructor(
    private readonly salonRegistrationService: SalonRegistrationService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateSalonRegistrationDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.salonRegistrationService.create(dto, user.id);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.salonRegistrationService.findAll(pagination);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.salonRegistrationService.findById(id);
  }
}
