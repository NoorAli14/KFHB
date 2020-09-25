import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateResponseInput {
  @Field()
  @MaxLength(1000)
  results: string;

  @Field()
  remarks: string;

  @Field()
  template_id: string;

  @Field()
  user_id: string;
}
