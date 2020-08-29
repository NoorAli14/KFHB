import { Resolver, Query, Args } from "@nestjs/graphql";

import { User } from "@app/v1/users/user.model";
import { LoginService } from "@app/v1/login/login.service";
import { LoginInput } from "@app/v1/login/login.dto";
import {Fields} from '@common/decorators';

@Resolver(User)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Query(() => User)
  async login(@Args('input') input: LoginInput, @Fields() columns: string[]): Promise<User> {
    return this.loginService.verifyUser(input, columns);
  }
}
