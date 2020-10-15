import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsString} from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: string;
}
