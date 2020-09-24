import { ApiProperty } from '@nestjs/swagger';

export class Template {
  readonly id: string;

  @ApiProperty({
    example: 'Template 1',
    description: 'Name of the Template',
  })
  name: string;

  @ApiProperty({
    example: 'Template 1 in Arabic',
    description: 'Name of the Template',
  })
  name_ar: string;

  @ApiProperty({
    example: 'Tendant ID',
    description: 'Tendant ID',
  })
  tenant_id: string;
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
  name_ar: string;

  @Field(() => [SectionGQL])
  sections?: SectionGQL[];

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
