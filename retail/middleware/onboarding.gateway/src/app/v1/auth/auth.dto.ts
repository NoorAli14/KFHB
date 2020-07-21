import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly first_name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly last_name?: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class LoginDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, minLength: 6, example: 'faizan@aiondigital.com', description: 'Email of the customer' })
  readonly email: string;

  @IsString()
  @ApiProperty({ required: true, minLength: 6, type: String, format: 'password' })
  readonly password: string;
}
