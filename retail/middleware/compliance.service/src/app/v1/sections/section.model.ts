import { Field, ObjectType } from '@nestjs/graphql';
import { Template } from '../templates/template.model';
import { Question } from '../questions/question.model';
import { MaxLength } from 'class-validator';

@ObjectType()
export class Section {
  @Field()
  id: string;

  @Field({ nullable: true })
  tenant_id: string;

  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(255)
  name_ar: string;

  @Field()
  @MaxLength(255)
  level: string;

  @Field(() => [Question], { nullable: true })
  questions: Question[];

  @Field({ nullable: true })
  template_id: string;

  @Field(() => Template, { nullable: true })
  template: Template;

  @Field()
  status: string;

  @Field({ nullable: true })
  created_on: Date;

  @Field({ nullable: true })
  created_by: string;

  @Field({ nullable: true })
  updated_on: Date;

  @Field({ nullable: true })
  updated_by: string;
}
