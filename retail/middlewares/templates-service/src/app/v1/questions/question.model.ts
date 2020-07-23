import { ApiProperty } from '@nestjs/swagger';

export class Question {
  readonly id: string;

  @ApiProperty({
    example: 'Question 1',
    description: 'Name of the Question',
  })
  title: string;

  @ApiProperty({
    example: 'Question Type',
    description: 'Question Type',
  })
  type: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { OptionGQL } from '../options/option.model';

@ObjectType()
export class QuestionGQL {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
	type: string;
	
	@Field()
	options: OptionGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
