import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

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
  type: string;
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
  type: string;
}
