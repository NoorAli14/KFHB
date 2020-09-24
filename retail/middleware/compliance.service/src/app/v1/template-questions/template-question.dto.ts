import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateQuestionInput {
  @Field()
  @MaxLength(255)
  rules: string;

  @Field()
  status: string;

  @Field()
  template_id: string;

  @Field()
  section_id: string;

  @Field()
  question_id: string;
}
