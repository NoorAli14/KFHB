import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Option } from '../options/option.model';
import { Section } from '../sections/section.model';

@ObjectType()
export class Question {
  @Field()
  id: string;

  @Field()
  @MaxLength(255)
  title: string;

  @Field()
  @MaxLength(255)
  title_ar: string;

  @Field()
  @MaxLength(255)
  type: string;

  @Field()
  @MaxLength(255)
  rules: string;

  @Field()
  status: string;

  @Field(() => [Option], { nullable: true })
  options: Option[];

  @Field({ nullable: true })
  section_id: string;

  @Field(() => Section, { nullable: true })
  section?: Section;

  @Field({ nullable: true })
  created_on: Date;

  @Field({ nullable: true })
  created_by: string;

  @Field({ nullable: true })
  updated_on: Date;

  @Field({ nullable: true })
  updated_by: string;
}
