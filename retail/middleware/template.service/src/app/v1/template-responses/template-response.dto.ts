import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateTemplateResponseDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  results: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  remarks: string;

  @ApiProperty()
  @IsUUID()
  template_id: string;

  @ApiProperty()
  @IsUUID()
  user_id: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateResponseInput {
  @Field()
  // @MaxLength(1000)
  results: string;

  @Field()
  remarks: string;

  @Field()
  template_id: string;

  @Field()
  user_id: string;
}
