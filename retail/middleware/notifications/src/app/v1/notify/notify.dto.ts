import { Length, IsEnum, IsOptional, MaxLength, IsJSON } from 'class-validator';
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
  token: string;

  @Field()
  @Length(5, 255)
  message_title: string;

  @Field()
  @Length(5, 255)
  message_body: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 255)
  image_url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(4000)
  payload?: string;
  
}
