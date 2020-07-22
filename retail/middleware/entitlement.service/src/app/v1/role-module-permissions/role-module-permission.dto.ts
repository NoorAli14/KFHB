import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class RoleModulePermissionInput {
  @Field()
  role_module_id?: string;

  @Field()
  permission_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
