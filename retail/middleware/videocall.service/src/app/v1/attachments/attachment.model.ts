import { Field, ObjectType } from '@nestjs/graphql';
import { STATUS } from '@common/constants';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@ObjectType()
export class Attachment {
  @Field()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  tenant_id: string;

  @Field({ nullable: true })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  file_name: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  file_size: number;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  file_path: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  attachment_type: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsEnum(Object.keys(STATUS))
  status: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  created_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  updated_on: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  updated_by: string;

  @Field({ nullable: true })
  deleted_on: string;

  @Field({ nullable: true })
  deleted_by: string;
}
