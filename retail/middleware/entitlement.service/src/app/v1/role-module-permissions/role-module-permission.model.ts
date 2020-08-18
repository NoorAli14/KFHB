import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class RoleModulePermission {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  role_module_id?: string;

  @Field({ nullable: true })
  permission_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
