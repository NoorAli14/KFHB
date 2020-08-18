import { ApiProperty } from '@nestjs/swagger';

export class Option {
  readonly id: string;

  @ApiProperty({
    example: 'Option 1',
    description: 'Name of the Option',
  })
  name: string;

  @ApiProperty({
    example: 'Question ID',
    description: 'UUID of the Question.',
  })
  question_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionGQL } from '../questions/question.model';

@ObjectType()
export class OptionGQL {
  @Field()
  id: string;

  @Field()
  name: string;

  question_id?: string;

  @Field(() => QuestionGQL)
  question?: QuestionGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
