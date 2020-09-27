import { MaxLength } from 'class-validator';
// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateInput {
  @Field({ nullable: false })
  @MaxLength(255)
  name: string;

  @Field({ nullable: false })
  @MaxLength(255)
  name_ar: string;
}
