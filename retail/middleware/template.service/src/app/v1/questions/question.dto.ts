import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateQuestionDto {
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title_ar: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  type: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  rules: string;

  @ApiProperty()
  @IsBoolean()
  status: string;

  @ApiProperty()
  @IsUUID()
  section_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewQuestionInput {
  @Field()
  @MaxLength(255)
  title: string;

  @Field()
  @MaxLength(255)
  title_ar: string;

  @Field()
  @MaxLength(255)
  type: string;

  @Field()
  @MaxLength(255)
  rules: string;

  @Field()
  status: string;

  @Field()
  section_id: string;
}
