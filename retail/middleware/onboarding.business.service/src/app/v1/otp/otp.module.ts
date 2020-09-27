import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { OtpController } from './otp.controller';

import { OtpService } from './otp.service';
@Module({
  imports: [GqlClientModule],
  controllers: [OtpController],
  providers: [OtpService, GqlClientService],
})
export class OtpModule {}