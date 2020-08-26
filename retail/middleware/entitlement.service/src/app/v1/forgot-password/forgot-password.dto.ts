import {Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class ForgotPasswordInput {
  @Field()
  email: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  token: string;

  @Field()
  password: string;
}

@ObjectType()
export class ForgotPasswordOutput {
  @Field()
  token?: string;

  @Field()
  token_expiry?: Date;
}
