import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Session {
  @Field(() => ID)
  id?: string;

  @Field()
  user_id: string;

  @Field()
  tenant_id: string;

  @Field()
  check_id?: string;

  @Field()
  reference_id?: string;

  @Field({ nullable: true })
  target_user_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field()
  created_by: string;

  @Field()
  created_on?: Date;

  @Field()
  updated_by: string;

  @Field()
  updated_on?: Date;
}
