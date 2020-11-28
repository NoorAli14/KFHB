import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'User email address.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'User Password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
