import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger';
import {
  AuthGuard,
  CurrentUser,
  SuccessDto,
  DELIVERY_MODES,
  CUSTOMER_LAST_STEPS,
  OTP_STATUSES,
  STATUSES,
  PermissionsGuard,
} from '@common/index';
import { OtpService } from './otp.service';
import { User } from '../users/user.entity';
import { VerifyOTPDto } from './otp.dto';
import { CustomersService } from '../customers/customers.service';
@ApiTags('OTP Module')
@Controller('otp')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class OtpController {
  constructor(private readonly otpService: OtpService, private readonly customerService: CustomersService) {}

  @Post('/sms/send')
  @ApiOperation({
    summary: 'Send sms otp',
    description: 'A successful request returns the HTTP 200 OK status code and a JSON response body.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'SMS OTP has been successfully send.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async send_sms_otp(@CurrentUser() currentUser: User): Promise<SuccessDto> {
    const result = await this.otpService.send(currentUser, DELIVERY_MODES.MOBILE);
    if (result?.status === STATUSES.SUCCESS) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_SMS_OTP_SENT);
    }
    return result;
  }

  @Post('/email/send')
  @ApiOperation({
    summary: 'Send email otp',
    description: 'A successful request returns the HTTP 200 OK status code and a JSON response body.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Email OTP has been successfully send.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async send_email_otp(@CurrentUser() currentUser: User): Promise<SuccessDto> {
    const result = await this.otpService.send(currentUser, DELIVERY_MODES.EMAIL);
    if (result?.status === STATUSES.SUCCESS) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_EMAIL_OTP_SENT);
    }
    return result;
  }

  @Post('/sms/verify')
  @ApiOperation({
    summary: 'Verify sms otp',
    description: 'A successful request returns the HTTP 200 OK status code and a JSON response body.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'SMS OTP has been successfully verified.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async sms_verify_otp(@CurrentUser() currentUser: User, @Body() input: VerifyOTPDto): Promise<SuccessDto> {
    const result = await this.otpService.verify(currentUser, input);
    if (result?.status === OTP_STATUSES.VERIFIED) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_SMS_OTP_VERIFIED);
    }
    return result;
  }

  @Post('/email/verify')
  @ApiOperation({
    summary: 'Verify email otp',
    description: 'A successful request returns the HTTP 200 OK status code and a JSON response body.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Email OTP has been successfully verified.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async email_verify_otp(@CurrentUser() currentUser: User, @Body() input: VerifyOTPDto): Promise<SuccessDto> {
    const result = await this.otpService.verify(currentUser, input);
    if (result?.status === OTP_STATUSES.VERIFIED) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_EMAIL_OTP_VERIFIED);
    }
    return result;
  }
}
