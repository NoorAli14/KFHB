import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

import { User } from "@app/v1/users/user.model";
import {ChangePasswordInput, ForgotPasswordInput, ForgotPasswordOutput} from "@app/v1/forgot-password/forgot-password.dto";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => ForgotPasswordOutput)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<any> {
    return this.forgetPasswordService.verifyAndGetToken(input);
  }

  @Mutation(() => String)
  async changePassword(@Args('input') input: ChangePasswordInput): Promise<any> {
    return this.forgetPasswordService.changePassword(input);
  }
}
