import { IsString, Length, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'User email address.',
  })
  @Length(3, 96, {
    message: 'Name must be between 3 to 30 characters',
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
