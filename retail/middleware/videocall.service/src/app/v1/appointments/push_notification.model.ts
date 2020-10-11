import { Field, ObjectType } from '@nestjs/graphql';
import { PLATFORMS } from '@common/constants';
import { Length, IsEnum } from 'class-validator';

@ObjectType()
export class PushNotificationModel {
  @Field()
  @IsEnum(PLATFORMS)
  platform: string;

  @Field()
  @Length(5, 255)
  device_id: string;

  @Field()
  token?: string;

  @Field()
  @Length(5, 255)
  message_title: string;

  @Field()
  @Length(5, 255)
  message_body: string;

  @Field()
  @Length(5, 255)
  image_url?: string;
}
