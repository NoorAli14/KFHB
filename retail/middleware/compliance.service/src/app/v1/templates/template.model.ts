import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Section } from '../sections/section.model';

@ObjectType()
export class Template {
  @Field()
  id: string;

  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(255)
  name_ar: string;

  @Field(() => [Section], { nullable: true })
  sections?: Section[];

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
