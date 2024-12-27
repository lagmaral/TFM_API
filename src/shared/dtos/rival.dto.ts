import { IsString, Length } from "class-validator";
import { BaseDTO } from "./base.dto";

export class RivalDTO extends BaseDTO {


  @IsString()
  @Length(1, 200)
  nombre: string;  
  
  @IsString()
  @Length(1, 200)
  image: string;
}


  