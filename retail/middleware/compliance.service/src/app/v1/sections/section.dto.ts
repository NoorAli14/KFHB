import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewSectionInput {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @MaxLength(255)
  name_ar: string;

  @Field()
  @MaxLength(255)
  level: string;

  @Field()
  template_id: string;
}
