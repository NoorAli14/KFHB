import {
  IsOptional,
  Length,
  MaxLength,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateCustomerInput')
export class NewCustomerInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  first_name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  last_name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  contact_no?: string;

}