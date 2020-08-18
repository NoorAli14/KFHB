import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class RoleModule {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  module_id?: string;

  @Field({ nullable: true })
  role_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
