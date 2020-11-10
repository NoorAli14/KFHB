import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';
import { NUMBERS } from '@common/constants';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password: string;
}
