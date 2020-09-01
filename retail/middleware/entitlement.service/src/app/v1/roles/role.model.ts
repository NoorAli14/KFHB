import {Field, ID, ObjectType} from "@nestjs/graphql";

import {ModuleInRole} from "@app/v1/modules/module.model";

@ObjectType()
export class Role {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
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

  @Field(type => [ModuleInRole], { nullable: true })
  modules?: ModuleInRole[];
}
