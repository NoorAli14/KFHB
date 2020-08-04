import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsInt()
  readonly id: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly first_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(30)
  readonly last_name?: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewPostInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  description?: string;

  @Field()
  @Length(5, 255)
  user_id: string;
}
