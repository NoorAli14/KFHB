import { ApiProperty } from '@nestjs/swagger';

export class TemplateResponse {
  readonly id: string;

  @ApiProperty({
    example: 'TRUE',
    description: 'Value of Response',
  })
  value: string;

  @ApiProperty({
    example: 'Remarks',
    description: 'Remarks on the Response',
  })
  Remarks: string;

  @ApiProperty({
    example: 'Template Question ID',
    description: 'Template Question ID',
  })
  template_question_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TemplateResponseGQL {
  @Field()
  id: string;

  @Field()
  value: string;

  @Field()
  remarks: string;

  @Field()
  template_question_id: string;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
