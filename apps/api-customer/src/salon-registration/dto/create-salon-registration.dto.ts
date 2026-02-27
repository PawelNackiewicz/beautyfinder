import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsObject,
  MinLength,
  MaxLength,
  Matches,
  Min,
  IsEmail,
} from 'class-validator';

export class CreateSalonRegistrationDto {
  // Step 1: Business Data
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  publicName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'NIP must be exactly 10 digits' })
  nip!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  mainCategory!: string;

  @IsArray()
  @IsString({ each: true })
  subcategories!: string[];

  // Step 2: Location
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  streetAddress!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  floorUnit?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{3}$/, { message: 'Postal code must be in format XX-XXX' })
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city!: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phone!: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @IsString()
  @IsOptional()
  website?: string;

  // Step 3: Presentation
  @IsString()
  @IsOptional()
  coverPhotoUrl?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsArray()
  @IsOptional()
  gallery?: string[];

  @IsString()
  @IsNotEmpty()
  @MinLength(150, { message: 'Description must be at least 150 characters' })
  description!: string;

  @IsObject()
  @IsOptional()
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities?: string[];

  // Step 4: Operational Settings
  @IsObject()
  @IsNotEmpty()
  workingHours!: Record<
    string,
    { open: boolean; start: string | null; end: string | null }
  >;

  @IsObject()
  @IsOptional()
  technicalBreak?: { start: string; end: string } | null;

  @IsNumber()
  @Min(1)
  stationCount!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  cancellationPolicy!: string;
}
