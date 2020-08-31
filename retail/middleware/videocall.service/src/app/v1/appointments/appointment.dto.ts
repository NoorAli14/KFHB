import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
  IsDate,
  IsEnum,
} from 'class-validator';

export class CreateOptionDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty()
  @IsDate()
  call_time: Date;

  @ApiProperty()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty()
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;

  @IsUUID()
  user_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS } from '@common/constants';

@InputType()
export class NewOptionInput {
  @Field()
  call_time: Date;

  @Field()
  gender: GENDER;

  @Field()
  status: APPOINTMENT_STATUS;

  @Field()
  @IsUUID()
  user_id: string;
}
