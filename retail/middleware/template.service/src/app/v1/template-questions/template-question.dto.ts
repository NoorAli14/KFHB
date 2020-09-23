import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTemplateQuestionDto {
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  rules: string;

  @ApiProperty()
  @IsBoolean()
  status: string;

  @ApiProperty()
  @IsUUID()
  template_id: string;

  @ApiProperty()
  @IsUUID()
  section_id: string;

  @ApiProperty()
  @IsUUID()
  question_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateQuestionInput {
  @Field()
  @MaxLength(255)
  rules: string;

  @Field()
  status: string;

  @Field()
  template_id: string;

  @Field()
  section_id: string;

  @Field()
  question_id: string;
}
