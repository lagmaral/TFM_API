// pagination.dto.ts
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1; // Default to page 1

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 50; // Default to limit of 50

}