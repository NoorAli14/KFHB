import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateSectionDto {
  @IsUUID()
  @IsOptional()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name_ar: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  level: string;

  @ApiProperty()
  @IsUUID()
  template_id: string;
}

// Graphql Example DTO
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
