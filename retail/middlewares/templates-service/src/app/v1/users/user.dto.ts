import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
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
export class NewUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  last_name?: string;

  @Field()
  @Length(5, 255)
  email: string;

  @Field()
  @Length(5, 255)
  password: string;
}
