// src/dtos/UserDto.ts

import { IsEmail, IsEnum, IsString, Length } from "class-validator";
import { Role } from "../enums/Role";

export class CreateUserDto {
  @Length(4, 20)
  name: string;

  @Length(4, 20)
  lastname: string;

  @IsEmail()
  email: string;

  @Length(6, 50)
  password: string;

  @IsEnum(Role)
  role: Role;
}
