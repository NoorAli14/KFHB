import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPDto {
  @ApiProperty({
    title: 'OTP Code',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
