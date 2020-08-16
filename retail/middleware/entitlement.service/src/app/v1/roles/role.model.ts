import {IsNotEmpty, IsString} from "class-validator";
import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Module} from "@app/v1/modules/module.model";
import {Permission} from "@app/v1/permissions/permission.model";

@ObjectType()
export class Role {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;

  @Field({ nullable: true })
  updated_on?: string;

  @Field({ nullable: true })
  updated_by?: string;

  @Field({ nullable: true })
  deleted_on?: string;

  @Field({ nullable: true })
  deleted_by?: string;

  @Field(type => [Module], { nullable: true })
  modules?: Module[];

  @Field(type => [Permission], { nullable: true })
  permissions?: Permission[];
}
