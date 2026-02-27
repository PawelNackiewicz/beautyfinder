import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from '../auth/clerk-auth.guard';
import {
  CurrentUser,
  type CurrentUserPayload,
} from '../auth/current-user.decorator';
import { ConsentService } from './consent.service';
import { GrantConsentDto } from './dto/grant-consent.dto';

@Controller('consents')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Get('types')
  getConsentTypes() {
    return this.consentService.getConsentTypes();
  }

  @Get('me')
  @UseGuards(ClerkAuthGuard)
  getMyConsents(@CurrentUser() user: CurrentUserPayload) {
    return this.consentService.getUserConsents(user.id);
  }

  @Post('grant')
  @UseGuards(ClerkAuthGuard)
  grantConsent(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: GrantConsentDto,
  ) {
    return this.consentService.grantConsent(user.id, dto);
  }

  @Post('revoke')
  @UseGuards(ClerkAuthGuard)
  revokeConsent(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: GrantConsentDto,
  ) {
    return this.consentService.revokeConsent(user.id, dto);
  }
}
