import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateResponseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  results: string;

  @Field()
  @IsString()
  @IsOptional()
  remarks: string;

  @Field()
  @IsUUID()
  template_id: string;

  @Field()
  @IsUUID()
  user_id: string;
}
