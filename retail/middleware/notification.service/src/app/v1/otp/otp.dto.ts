import {
  IsOptional,
  Length,
  IsEmail,
  IsMobilePhone,
  IsEnum,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { DEFAULT_OTP_DELIVERY_MODES } from '@rubix/common/constants';

@InputType('NewPostInput')
export class GenerateOTPInput {
  @Field()
  @Length(5, 255)
  user_id: string;

  @Field()
  @IsEnum(DEFAULT_OTP_DELIVERY_MODES)
  delivery_mode: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsMobilePhone()
  mobile_no?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}

@InputType('VerifyOTPInput')
export class VerifyOTPInput {
  @Field()
  @Length(5, 255)
  user_id: string;

  @Field()
  @Length(5, 255)
  otp_code: string;
}
