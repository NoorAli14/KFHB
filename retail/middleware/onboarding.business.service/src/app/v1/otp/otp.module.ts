import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { OtpController } from './otp.controller';

import { OtpService } from './otp.service';
import { CustomersService } from '../customers/customers.service';
@Module({
  imports: [GqlClientModule],
  controllers: [OtpController],
  providers: [OtpService, CustomersService, GqlClientService],
})
export class OtpModule {}