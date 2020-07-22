import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class PermissionInput {
  @Field({ nullable: true })
  record_type?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
