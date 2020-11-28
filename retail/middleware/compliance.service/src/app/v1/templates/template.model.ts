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

import { STATUSES } from '@common/constants';
import { Section } from '../sections/section.model';

@ObjectType()
export class Template {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name_ar: string;

  @Field(() => [Section], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Section)
  sections?: Section[];

  @Field()
  @IsEnum(Object.keys(STATUSES))
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  status: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  created_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  updated_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
