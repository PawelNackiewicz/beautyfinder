import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GrantConsentDto {
  @IsUUID('4')
  @IsNotEmpty()
  consentVersionId!: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
