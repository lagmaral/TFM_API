import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';
export class BaseDTO {
    @IsNumber()
    id: number;

  }
  
