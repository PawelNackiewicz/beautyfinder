import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GetSalonsQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;
}
