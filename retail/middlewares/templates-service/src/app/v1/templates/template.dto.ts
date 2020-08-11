import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @IsUUID()
  @IsOptional()
  readonly id: string;
  @ApiProperty()
	@IsString()
  @MaxLength(255)
  readonly name: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewTemplateInput {
  @Field({ nullable: false })
  @MaxLength(255)
  name: string;
}
