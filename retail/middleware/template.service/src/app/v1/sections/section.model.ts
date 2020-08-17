import { ApiProperty } from '@nestjs/swagger';

export class Section {
  readonly id: string;

  @ApiProperty({
    example: 'Question 1',
    description: 'Name of the Question',
  })
  name: string;

  @ApiProperty({
    example: 'Question Type',
    description: 'Question Type',
  })
  level: string;

  @ApiProperty({
    example: 'Template ID',
    description: 'Template ID',
  })
  template_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { TemplateGQL } from '../templates/template.model';
import { QuestionGQL } from '../questions/question.model';

@ObjectType()
export class SectionGQL {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  level: string;

  @Field(() => [QuestionGQL])
  questions?: QuestionGQL[];

  template_id?: string;

  @Field(() => TemplateGQL)
  template?: TemplateGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
