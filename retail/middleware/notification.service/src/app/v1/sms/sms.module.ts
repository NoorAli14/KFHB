import { Module } from '@nestjs/common';
import { SMSResolver } from './sms.resolver';
import { SMSService } from './sms.service';
import { HttpClientService } from '@common/connections/httpclient/httpclient.service'
import { httpClientModule } from '@common/connections/httpclient/httpclinet.module'

@Module({
  imports: [httpClientModule],
  controllers: [],
  providers: [SMSService, SMSResolver, HttpClientService],
  exports: [SMSService]
})
export class SMSModule {}
