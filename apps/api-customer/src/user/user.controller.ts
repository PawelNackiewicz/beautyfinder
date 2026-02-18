import { Controller, Get, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('me')
  @UseGuards(ClerkAuthGuard)
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserProfile(user.id);
  }

  @Get('me/appointments')
  @UseGuards(ClerkAuthGuard)
  async getAppointments(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserAppointments(user.id);
  }

  @Get('me/loyalty')
  @UseGuards(ClerkAuthGuard)
  async getLoyalty(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserLoyaltyBalances(user.id);
  }

  @Get('me/reviews')
  @UseGuards(ClerkAuthGuard)
  async getReviews(@CurrentUser() user: CurrentUserPayload) {
    return this.userService.getUserReviews(user.id);
  }
}
