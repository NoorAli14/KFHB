import { Module, HttpModule } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { OtpRepository } from '@rubix/core/repository/';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';
import { EmailModule } from '../email/email.module';
import { SMSModule } from '../sms/sms.module';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';

@Module({
  imports: [RepositoryModule, EmailModule, SMSModule, 
    HttpModule.registerAsync({
      useFactory: async (_config: ConfigurationService) => ({
        timeout: _config.HTTP.TIMEOUT,
        maxRedirects: _config.HTTP.MAXDIRECTS
      }),
      inject: [ConfigurationService],
    })
  ],
  providers: [
    OtpService,
    OtpRepository,
    OtpResolver,
  ],
})
export class OtpModule {}
