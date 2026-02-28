import { IsOptional, IsString, MaxLength, IsDateString } from 'class-validator';
import { PaginationQueryDto } from '../../common';

export class SearchSalonsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  q?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
