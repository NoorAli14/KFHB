import { Module, HttpModule } from '@nestjs/common';
import { CommonModule } from '../../common.module';
import { HttpClientService } from './httpclient.service';
import { ConfigurationService } from '../../configuration/configuration.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (_config: ConfigurationService) => ({
        timeout: _config.HTTP.TIMEOUT,
        maxRedirects: _config.HTTP.MAXDIRECTS,
      }),
      inject: [ConfigurationService],
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService, HttpModule],
})
export class httpClientModule {}
