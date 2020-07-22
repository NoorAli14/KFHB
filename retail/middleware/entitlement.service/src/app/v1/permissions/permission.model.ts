import {IsNotEmpty, IsString} from "class-validator";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Permission {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  record_type?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;
}
