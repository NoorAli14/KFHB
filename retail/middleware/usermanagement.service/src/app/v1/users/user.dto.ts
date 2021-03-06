import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { GENDER, NUMBERS, STATUS } from '@common/constants';
import { IdsInput } from '@common/inputs/ids.input';
import { Type } from 'class-transformer';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsEmail()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(GENDER))
  gender: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_owner: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({ strict: true })
  date_of_birth: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
  nationality_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(STATUS))
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  invitation_token: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  invitation_token_expiry: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token_expiry: string;

  @Field(() => [IdsInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => IdsInput)
  roles: IdsInput[];

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  entity_id: string;
}

@InputType()
export class CreateUserInput extends UpdateUserInput {
  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  current_password: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  new_password: string;
}

@InputType()
export class CheckAvailabilityInput {
  @Field()
  @IsString()
  @IsISO8601({ strict: true })
  call_time: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(GENDER))
  gender: string;
}
