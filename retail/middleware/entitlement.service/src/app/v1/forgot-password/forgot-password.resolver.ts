import {Resolver, Query, Args, Mutation, Info} from "@nestjs/graphql";

import {User, UserWithForgetPasswordToken} from "@app/v1/users/user.model";
import {ChangePasswordInput, ForgotPasswordInput} from "@app/v1/forgot-password/forgot-password.dto";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";
import {graphqlKeys} from "@common/utilities";

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => UserWithForgetPasswordToken)
  async forgotPassword(@Args('input') input: ForgotPasswordInput, @Info() info): Promise<any> {
    const keys = graphqlKeys(info, ['password_reset_token', 'password_reset_token_expiry']);
    return this.forgetPasswordService.verifyAndGetToken(input, keys);
  }

  @Mutation(() => User)
  async changePassword(@Args('input') input: ChangePasswordInput, @Info() info): Promise<any> {
    const keys = graphqlKeys(info);
    return this.forgetPasswordService.changePassword(input, keys);
  }
}
