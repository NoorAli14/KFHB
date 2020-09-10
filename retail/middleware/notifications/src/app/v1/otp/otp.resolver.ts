import {
  Resolver,
  Mutation,
  Args,
  GraphQLExecutionContext,
  Context,
} from '@nestjs/graphql';
import { Fields } from '@common/decorators';
import { Otp, OTPResponse } from './otp.model';
import { OtpService } from './otp.service';
import { GenerateOTPInput, VerifyOTPInput } from './otp.dto';
import { getTenantID, getMutateProps } from '@rubix/common/utilities';

@Resolver(Otp)
export class OtpResolver {

  constructor(
    private readonly otpService: OtpService,
  ) {}

  @Mutation(() => Otp)
  generateOtp(
    @Args('input') input: GenerateOTPInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Otp | any> {
    input['tenant_id'] = getTenantID(context['req'].headers);
    input = getMutateProps('created', context['req'].headers, input);
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
