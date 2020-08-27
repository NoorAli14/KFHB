import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Notify {
  @Field()
  id: string;

  @Field()
  platform: string;

  @Field()
  device_id: string;

  @Field()
  text: string;

  @Field()
  status: string;

  @Field()
  created_on: Date;

  @Field()
  created_by: string;

  @Field()
  updated_on?: Date;

  @Field()
  updated_by?: string;

  @Field()
  deleted_on?: Date;

  @Field()
  deleted_by?: string;
}