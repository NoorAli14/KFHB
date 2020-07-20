import { Module } from '@nestjs/common';

import { OtpController } from './otp.controller';

@Module({
  imports: [],
  controllers: [OtpController],
  providers: [OtpController],
})
export class OtpModule {}
