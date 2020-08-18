import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserRole {
  @Field(() => ID)
  id?: string;

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
