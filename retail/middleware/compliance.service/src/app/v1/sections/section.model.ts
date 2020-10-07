import { Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';
import { Template } from '../templates/template.model';
import { Question } from '../questions/question.model';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { STATUSES } from '@common/constants';

@ObjectType()
export class Section {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  tenant_id: string;

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

  @Field()
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  level: string;

  @Field(() => [Question], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Question)
  questions: Question[];

  @Field({ nullable: true })
  @IsUUID()
  template_id: string;

  @Field(() => Template, { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Section)
  template: Template;

  @Field()
  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @IsEnum(Object.keys(STATUSES))
  status: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  created_on: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  updated_on: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
