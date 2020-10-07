import { Field, ObjectType } from '@nestjs/graphql';
import { STATUSES } from '@common/constants';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Question } from '../questions/question.model';

@ObjectType()
export class Option {
  @Field()
  id: string;

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name_ar: string;

  @Field({ nullable: true })
  @IsUUID()
  question_id: string;

  @Field(() => Question, { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Question)
  question: Question;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEnum(Object.keys(STATUSES))
  status: string;

  @Field({ nullable: true })
  @IsString()
  created_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field({ nullable: true })
  @IsString()
  updated_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
