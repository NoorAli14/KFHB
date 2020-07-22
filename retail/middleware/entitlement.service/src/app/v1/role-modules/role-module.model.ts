import {IsNotEmpty, IsString} from "class-validator";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class RoleModule {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsString()
  module_id?: string;

  @Field()
  @IsString()
  role_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
