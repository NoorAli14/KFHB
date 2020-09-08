import { Module, HttpModule } from '@nestjs/common';
import { SMSResolver } from './sms.resolver';
import { SMSService } from './sms.service';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';


@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (_config: ConfigurationService) => ({
        timeout: _config.HTTP.TIMEOUT,
        maxRedirects: _config.HTTP.MAXDIRECTS
      }),
      inject: [ConfigurationService],
    })
  ],
  controllers: [],
  providers: [SMSService, SMSResolver],
  exports: [SMSService]
})
export class SMSModule {}
