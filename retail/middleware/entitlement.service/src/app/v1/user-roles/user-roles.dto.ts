import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class UserRoleInput {
  @Field()
  user_id?: string;

  @Field()
  role_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}