import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { Fields } from '@common/decorators';
import { Otp, OTPResponse } from './otp.model';
import { OtpService } from './otp.service';
import { GenerateOTPInput, VerifyOTPInput } from './otp.dto';

@Resolver(Otp)
export class OtpResolver {

  constructor(
    private readonly otpService: OtpService,
  ) {}

  @Mutation(() => Otp)
  generateOtp(
    @Args('input') input: GenerateOTPInput,
    @Fields() columns: string[]
  ): Promise<Otp | any> {
    return this.otpService.create(input, columns);
  }

  @Mutation(() => OTPResponse)
  verifyOtp(
    @Args('input') input: VerifyOTPInput,
    @Fields() columns: string[]
  ): Promise<OTPResponse> {
    return this.otpService.verify(input, columns);
  }
}
