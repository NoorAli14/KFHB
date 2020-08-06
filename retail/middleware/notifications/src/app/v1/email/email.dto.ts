import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
  // ValidateNested,
} from 'class-validator';

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@InputType()
export class SendEmailInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  to?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  template?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(300)
  subject?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(1000)
  body?: string;

  // @Field({ nullable: true })
  // @IsOptional()
  // context?: object;

  //   @ValidateNested({ each: true })
  //   @Type(() => Data)
  //   data: Data[];
}

// class Data {

//   @IsNotEmpty()
//   @IsString()
//   type: string;

//   @IsNotEmpty()
//   @IsNumber()
//   id: number;
// }
