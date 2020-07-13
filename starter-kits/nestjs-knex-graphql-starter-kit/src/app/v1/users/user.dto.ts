import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
  readonly id: number;
  @ApiProperty()
  @IsString()
  readonly email: string;
  @ApiProperty()
  @IsString()
  readonly password: string;
}
