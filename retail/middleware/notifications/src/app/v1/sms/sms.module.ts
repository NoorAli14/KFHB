import { Module } from '@nestjs/common';
import { SMSResolver } from './sms.resolver';
import { SMSService } from './sms.service';


@Module({
  imports: [],
  controllers: [],
  providers: [SMSService, SMSResolver],
  exports: [SMSService]
})
export class SMSModule {}
