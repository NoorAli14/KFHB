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
  password_reset_token: string;

  @Field()
  password: string;
}
