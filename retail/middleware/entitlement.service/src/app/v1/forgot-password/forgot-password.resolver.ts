import { Resolver, Query, Args } from '@nestjs/graphql';
import {HttpExceptionFilter} from "@common/filters/http-exception.filter";
import {UseFilters} from "@nestjs/common";

import { User } from "@app/v1/users/user.model";
import {ChangePasswordInput, ForgotPasswordInput, ForgotPasswordOutput} from "@app/v1/forgot-password/forgot-password.dto";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";

@Resolver(User)
export class ForgotPasswordResolver {
  constructor(private readonly forgetPasswordService: ForgotPasswordService) {}

  @Query(() => ForgotPasswordOutput)
  @UseFilters(new HttpExceptionFilter())
  async forgetPassword(@Args('input') input: ForgotPasswordInput): Promise<any> {
    return this.forgetPasswordService.verifyAndGetToken(input);
  }

  @Query(() => String)
  @UseFilters(new HttpExceptionFilter())
  async changePassword(@Args('input') input: ChangePasswordInput): Promise<any> {
    return this.forgetPasswordService.changePassword(input);
  }
}
