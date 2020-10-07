import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { Option } from '../options/option.model';
import { Section } from '../sections/section.model';
import { STATUSES } from '@common/constants';

@ObjectType()
export class Question {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @MaxLength(255)
  title_ar: string;

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  rules: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @IsEnum(Object.keys(STATUSES))
  status: string;

  @Field(() => [Option], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[];

  @Field({ nullable: true })
  section_id: string;

  @Field(() => Section, { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Option)
  @IsString()
  section?: Section;

  @Field({ nullable: true })
  @IsString()
  created_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field({ nullable: true })
  @IsString()
  updated_on: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
