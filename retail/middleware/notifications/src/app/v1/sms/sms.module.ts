import { Module, HttpModule } from '@nestjs/common';
import { SMSResolver } from './sms.resolver';
import { SMSService } from './sms.service';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { httpClientService } from '@common/connections/httpclient/httpclient.service'
import { httpClientModule } from '@common/connections/httpclient/httpclinet.module'

@Module({
  imports: [httpClientModule],
  controllers: [],
  providers: [SMSService, SMSResolver, httpClientService],
  exports: [SMSService]
})
export class SMSModule {}
