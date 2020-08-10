import {Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class ForgotPasswordInput {
  @Field({ nullable: true })
  email: string;
}

@InputType()
export class ChangePasswordInput {
  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  password: string;
}

@ObjectType()
export class ForgotPasswordOutput {
  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  token_expiry?: Date;
}
