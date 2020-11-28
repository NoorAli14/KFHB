import { Field, ObjectType } from '@nestjs/graphql';
import { Template } from '../templates/template.model';
import { Section } from '../sections/section.model';
import { Question } from '../questions/question.model';

@ObjectType()
export class TemplateQuestionGQL {
  @Field()
  id: string;

  @Field()
  rules: string;

  @Field()
  status: string;

  template_id?: string;
  section_id?: string;
  question_id?: string;

  @Field()
  template?: Template;

  @Field()
  section?: Section;

  @Field()
  question?: Question;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
