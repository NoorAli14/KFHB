import {
  IsOptional,
  Length,
  MaxLength,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateSessionInput')
export class NewSessionInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  reference_id: string;
}

@InputType('UpdateUserInput')
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  last_name?: string;
}
