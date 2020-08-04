import { ApiProperty } from '@nestjs/swagger';

export class TemplateResponse {
  readonly id: string;

  @ApiProperty({
    example: '{"q1": "abc", "answer": "TRUE"}',
    description: 'Response of the customer in JSON format',
  })
  results: string;

  @ApiProperty({
    example: 'Remarks',
    description: 'Remarks on the Response',
  })
  Remarks: string;

  @ApiProperty({
    example: 'Template ID',
    description: 'Template ID of the Associated Template',
  })
  template_id: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { IsJSON } from 'class-validator';

@ObjectType()
export class TemplateResponseGQL {
  @Field()
  id: string;

	@Field()
	@IsJSON()
  results: string;

  @Field()
  remarks: string;

  @Field()
  template_id: string;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
