import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsUUID()
  idUsuario: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  departament: string;
}