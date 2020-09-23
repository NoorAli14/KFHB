import { ApiProperty } from '@nestjs/swagger';

export class TemplateQuestion {
  readonly id: string;

  @ApiProperty({
    example: 'Rules for the question',
    description: 'Rules for the question',
  })
  rules: string;

  @ApiProperty({
    example: 'Status',
    description: 'Status of the Template',
  })
  status: string;

  @ApiProperty({
    example: 'Template ID',
    description: 'Template ID',
  })
  template_id: string;

  @ApiProperty({
    example: 'Section ID',
    description: 'Section ID',
  })
  section_id: string;

  @ApiProperty({
    example: 'Question ID',
    description: 'Question ID',
  })
  question_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { TemplateGQL } from '../templates/template.model';
import { SectionGQL } from '../sections/section.model';
import { QuestionGQL } from '../questions/question.model';

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
  template?: TemplateGQL;

  @Field()
  section?: SectionGQL;

  @Field()
  question?: QuestionGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
