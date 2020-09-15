import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveTypeDTO {
    
  @ApiProperty({
    title: 'Name of leave type',
    example: 'Sick Leave',
    description: 'Type of the leave',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  leave_type: string;

}
