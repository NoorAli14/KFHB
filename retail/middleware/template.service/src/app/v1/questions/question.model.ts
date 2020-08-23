import { ApiProperty } from '@nestjs/swagger';

export class Question {
  readonly id: string;

  @ApiProperty({
    example: 'Question 1',
    description: 'Name of the Question',
  })
  title: string;

  @ApiProperty({
    example: 'Question 1 in Arabic',
    description: 'Name of the Question',
  })
  title_ar: string;

	@ApiProperty({
    example: 'Question Type',
    description: 'Question Type',
  })
  type: string;

  @ApiProperty({
    example: 'Rules for the question',
    description: 'Rules for the question',
  })
  rules: string;

  @ApiProperty({
    example: 'Status',
    description: 'Status of the Template',
  })
  status: boolean;

  @ApiProperty({
    example: 'Section ID',
    description: 'Section ID',
  })
  section_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { OptionGQL } from '../options/option.model';
import { SectionGQL } from '../sections/section.model';

@ObjectType()
export class QuestionGQL {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  title_ar: string;

  @Field()
  type: string;

  @Field()
  rules: string;

  @Field()
  status: boolean;

  @Field(() => [OptionGQL])
  options?: OptionGQL[];

  section_id?: string;

  @Field(() => SectionGQL)
  section?: SectionGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
