import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('NewPostInput')
export class GenerateOTPInput {

  @Field()
  @Length(5, 255)
  user_id: string;

  @Field()
  @MaxLength(30)
  delivery_mode: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  mobile_no?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  email?: string;
}

export class VerifyOTPInput {

  @Field()
  @Length(5, 255)
  user_id: string;

  @Field()
  @Length(5, 255)
  otp_code: string;
}
