import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendEmailInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  to?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(30)
  // template?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(30)
  // subject?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(30)
  // body?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // context?: object;
}
