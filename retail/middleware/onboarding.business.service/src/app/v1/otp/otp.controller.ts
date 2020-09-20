import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  AuthGuard,
  CurrentUser,
  SuccessDto,
  DELIVERY_MODES,
} from '@common/index';
import { OtpService } from './otp.service';
import { User } from '../users/user.entity';
import { VerifyOTPDto } from './otp.dto';
@ApiTags('OTP Module')
@Controller('otp')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('/sms/send')
  @ApiOperation({
    summary: 'Send sms otp',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body.',
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
    return this.otpService.send(currentUser, DELIVERY_MODES.MOBILE);
  }

  @Post('/email/send')
  @ApiOperation({
    summary: 'Send email otp',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body.',
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
    return this.otpService.send(currentUser, DELIVERY_MODES.EMAIL);
  }

  @Post('/verify')
  @ApiOperation({
    summary: 'Verify sms/email otp',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body.',
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
  async verify_otp(
    @CurrentUser() currentUser: User,
    @Body() input: VerifyOTPDto,
  ): Promise<SuccessDto> {
    return this.otpService.verify(currentUser, input);
  }
}
