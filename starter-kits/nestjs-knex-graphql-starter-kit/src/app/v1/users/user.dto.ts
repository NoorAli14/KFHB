import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateUserInput')
export class NewUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  last_name?: string;

  @Field()
  @Length(5, 255)
  email: string;

  @Field()
  @Length(5, 255)
  password: string;
}