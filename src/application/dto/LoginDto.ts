// src/dtos/UserDto.ts

import { IsEmail, IsNotEmpty, IsNotIn, IsString} from "class-validator";

export class LoginDto {

  @IsEmail()
  @IsNotEmpty()  
  @IsNotIn(null)
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsNotIn(null)
  password?: string;
}
