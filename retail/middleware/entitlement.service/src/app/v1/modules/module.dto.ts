import {Field, ID, InputType} from "@nestjs/graphql";

@InputType()
export class ModuleInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  parent_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
