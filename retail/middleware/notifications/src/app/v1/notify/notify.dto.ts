import { IsOptional, Length, MaxLength, IsEmail, IsMobilePhone, IsEnum } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { DEFAULT_NOTIFY_PLATEFORMS } from '@rubix/common/constants';

@InputType('NotifyInput')
export class NotifyInput {

  @Field()
  @IsEnum(DEFAULT_NOTIFY_PLATEFORMS)
  platform: string;

  @Field()
  @Length(5, 255)
  device_id: string;

  @Field()
  text?: string;
}