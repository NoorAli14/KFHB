import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewQuestionInput {
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

  @Field()
  section_id: string;
}
