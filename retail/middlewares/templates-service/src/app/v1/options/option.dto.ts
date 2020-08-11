import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateOptionDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsUUID()
  quesion_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewOptionInput {
  @Field()
  @MaxLength(255)
  name: string;

  @Field()
  @IsUUID()
  question_id: string;
}
