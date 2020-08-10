import { Resolver, Query, Args } from '@nestjs/graphql';
import {HttpExceptionFilter} from "@common/filters/http-exception.filter";
import {UseFilters} from "@nestjs/common";

import { User } from "@app/v1/users/user.model";
import {LoginService} from "@app/v1/login/login.service";
import {LoginInput} from "@app/v1/login/login.dto";

@Resolver(User)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Query(() => User)
  @UseFilters(new HttpExceptionFilter())
  async login(@Args('input') input: LoginInput): Promise<any> {
    return this.loginService.verifyUser(input);
  }
}
