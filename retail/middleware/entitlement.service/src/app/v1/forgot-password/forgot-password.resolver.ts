import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from '@app/v1/users/user.model';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
} from '@app/v1/forgot-password/forgot-password.dto';
import { ForgotPasswordService } from '@app/v1/forgot-password/forgot-password.service';
import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => User)
  async forgotPassword(
    @Args('input') input: ForgotPasswordInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<any> {
    return this.forgetPasswordService.verifyAndGetToken(currentUser, input, output);
  }

  @Mutation(() => User)
  async changePassword(
    @Args('input') input: ChangePasswordInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<any> {
    return this.forgetPasswordService.changePassword(currentUser, input, output);
  }
}
