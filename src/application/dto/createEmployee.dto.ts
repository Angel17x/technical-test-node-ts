import { IsEnum, IsMongoId, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Departament } from "../enums/Departament";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsEnum(Departament)
  departament: Departament;
}