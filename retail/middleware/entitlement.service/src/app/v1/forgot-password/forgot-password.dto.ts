import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsString()
  @IsEmail()
  email: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  password_reset_token: string;

  @Field()
  @IsString()
  password: string;
}
