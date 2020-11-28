import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Fields, CurrentUser } from '@common/decorators';
import { Otp, OTPResponse } from './otp.model';
import { OtpService } from './otp.service';
import { GenerateOTPInput, VerifyOTPInput } from './otp.dto';

@Resolver(Otp)
export class OtpResolver {
  constructor(private readonly otpService: OtpService) {}

  @Mutation(() => Otp)
  generateOtp(
    @Args('input') input: GenerateOTPInput,
    @Fields() columns: string[],
    @CurrentUser() user: { [key: string]: any },
  ): Promise<Otp | any> {
    return this.otpService.create(user, input, columns);
  }

  @Mutation(() => OTPResponse)
  verifyOtp(@Args('input') input: VerifyOTPInput): Promise<OTPResponse> {
    return this.otpService.verify(input);
  }
}
