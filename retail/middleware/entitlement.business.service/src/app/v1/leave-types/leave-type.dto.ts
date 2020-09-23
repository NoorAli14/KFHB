import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveTypeDTO {

  @ApiProperty({
    title: 'Name of leave type',
    example: 'Sick',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
