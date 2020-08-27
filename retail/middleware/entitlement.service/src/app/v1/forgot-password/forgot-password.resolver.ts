import {Resolver, Query, Args, Mutation} from "@nestjs/graphql";

import {User} from "@app/v1/users/user.model";
import {ChangePasswordInput, ForgotPasswordInput} from "@app/v1/forgot-password/forgot-password.dto";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";
import {Fields} from '@common/decorators';

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => User)
  async forgotPassword(@Args('input') input: ForgotPasswordInput, @Fields() columns: string[]): Promise<any> {
    return this.forgetPasswordService.verifyAndGetToken(input, columns);
  }

  @Mutation(() => User)
  async changePassword(@Args('input') input: ChangePasswordInput, @Fields() columns: string[]): Promise<any> {
    return this.forgetPasswordService.changePassword(input, columns);
  }
}
