import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Permission {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  record_type?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
