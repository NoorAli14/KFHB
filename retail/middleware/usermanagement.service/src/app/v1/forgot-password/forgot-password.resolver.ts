import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from '@app/v1/users/user.model';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
} from '@app/v1/forgot-password/forgot-password.dto';
import { ForgotPasswordService } from '@app/v1/forgot-password/forgot-password.service';
import { Tenant, Fields } from '@common/decorators';
import { ITenant } from '@common/interfaces';

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => User)
  async forgotPassword(
    @Args('input') input: ForgotPasswordInput,
    @Fields() output: string[],
    @Tenant() tenant: ITenant,
  ): Promise<any> {
    return this.forgetPasswordService.verifyAndGetToken(tenant, input, output);
  }

  @Mutation(() => User)
  async changePassword(
    @Args('input') input: ChangePasswordInput,
    @Fields() output: string[],
    @Tenant() tenant: ITenant,
  ): Promise<any> {
    return this.forgetPasswordService.changePassword(tenant, input, output);
  }
}
