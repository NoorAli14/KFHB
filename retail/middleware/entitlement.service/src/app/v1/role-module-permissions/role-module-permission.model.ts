import {IsNotEmpty, IsString} from "class-validator";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class RoleModulePermission {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsString()
  role_module_id?: string;

  @Field()
  @IsString()
  permission_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
