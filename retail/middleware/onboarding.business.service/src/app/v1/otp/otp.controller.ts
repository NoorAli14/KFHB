import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('OTP Module')
@Controller('otp')
export class OtpController {
  @Post('/sms/send')
  @ApiOkResponse()
  async send_sms_otp(): Promise<any> {}

  @Post('/sms/status')
  @ApiOkResponse()
  async check_sms_otp_status(): Promise<any> {}

  @Post('/sms/verify')
  @ApiOkResponse()
  async verify_sms_otp(): Promise<any> {}

  @Post('/email/send')
  @ApiOkResponse()
  async send_email_otp(): Promise<any> {}

  @Post('/email/status')
  @ApiOkResponse()
  async check_email_otp_status(): Promise<any> {}

  @Post('/email/verify')
  @ApiOkResponse()
  async verify_email_otp(): Promise<any> {}
}
