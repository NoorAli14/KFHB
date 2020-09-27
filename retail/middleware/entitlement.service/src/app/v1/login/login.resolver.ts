import { Resolver, Query, Args } from '@nestjs/graphql';

import { User } from '@app/v1/users/user.model';
import { LoginService } from '@app/v1/login/login.service';
import { LoginInput } from '@app/v1/login/login.dto';
import { Tenant, Fields } from '@common/decorators';
import { ITenant } from '@common/interfaces';

@Resolver(User)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Query(() => User)
  async login(
    @Args('input') input: LoginInput,
    @Fields() output: string[],
    @Tenant() tenant: ITenant,
  ): Promise<User> {
    return this.loginService.verifyUser(tenant, input, output);
  }
}
