import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';
import { PaginationQueryDto } from '../common';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserProfile(user.id);
  }

  @Get('me/appointments')
  async getAppointments(
    @CurrentUser() user: CurrentUserPayload,
    @Query() pagination: PaginationQueryDto,
  ) {
    return this.userService.getUserAppointments(user.id, pagination);
  }

  @Get('me/loyalty')
  async getLoyalty(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserLoyaltyBalances(user.id);
  }

  @Get('me/reviews')
  async getReviews(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserReviews(user.id);
  }
}
