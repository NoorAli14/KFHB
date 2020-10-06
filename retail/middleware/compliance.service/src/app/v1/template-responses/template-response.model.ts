// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';
import { Template } from '../templates/template.model';

@ObjectType()
export class TemplateResponse {
  @Field()
  id: string;

  @Field()
  @IsJSON()
  results: string;

  @Field()
  @IsString()
  @IsOptional()
  remarks: string;

  @Field()
  @IsUUID()
  user_id: string;

  template_id: string;

  @Field(() => Template, { nullable: true })
  template: Template;

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
