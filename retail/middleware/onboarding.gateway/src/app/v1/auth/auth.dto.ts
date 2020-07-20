import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
  IsEmail,
} from 'class-validator';

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
  readonly email: string;

  @IsString()
  readonly password: string;
}
