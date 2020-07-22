import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTemplateResponseDto {
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  value: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  remarks: string;

  @ApiProperty()
  @IsUUID()
  template_question_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateResponseInput {
  @Field()
  @MaxLength(255)
  value: string;

  @Field()
  remarks: string;

  @Field()
  template_question_id: string;
}
