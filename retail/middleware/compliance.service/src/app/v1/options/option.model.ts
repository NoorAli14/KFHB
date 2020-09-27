import { Field, ObjectType } from '@nestjs/graphql';
import { Question } from '../questions/question.model';

@ObjectType()
export class Option {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  name_ar: string;

  @Field({ nullable: true })
  question_id: string;

  @Field(() => Question, { nullable: true })
  question: Question;

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
