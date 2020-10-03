import {
  IsString,
  IsOptional,
  MaxLength, IsISO8601, IsIn, IsUUID
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '@common/constants';


export class CreateAppointmentDTO {
  @ApiProperty({
    title: 'Call Time',
    description: 'ISO8601 Date and time',
    example: "2020-10-07T14:48:00.000Z",
    required: true,
  })
  @IsString()
  @IsISO8601({ strict: true })
  call_time: string;

  @ApiProperty({
    title: 'Gender',
    example: "F",
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1)
  @IsIn(GENDER)
  gender: string;

  @ApiProperty({
    title: 'User ID',
    description: 'Unique Id of the user.',
    required: true,
  })
  @IsUUID()
  user_id: string;
}