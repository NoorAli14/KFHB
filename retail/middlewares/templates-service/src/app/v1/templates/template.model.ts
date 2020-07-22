import { ApiProperty } from '@nestjs/swagger';

export class Template {
  readonly id: string;

  @ApiProperty({
    example: 'Template 1',
    description: 'Name of the Template',
  })
  name: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { SectionGQL } from '../sections/section.model';

@ObjectType()
export class TemplateGQL {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
