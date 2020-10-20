import {
  IsOptional,
  MaxLength,
  IsString,
  IsIn,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
const DEVICES: string[] = ['ios', 'andriod'];
@InputType('CreateCustomerInput')
export class NewCustomerInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  contact_no: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  device_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(DEVICES)
  @MaxLength(10)
  platform: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  fcm_token_id: string;
}