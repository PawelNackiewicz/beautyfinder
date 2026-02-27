import { IsArray, IsUUID } from 'class-validator';

export class BatchReviewsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  salonIds!: string[];
}
