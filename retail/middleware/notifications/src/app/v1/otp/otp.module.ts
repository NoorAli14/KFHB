import { Module, HttpModule } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { OtpRepository } from '@rubix/core/repository/';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';
import { EmailModule } from '../email/email.module';
import { SMSModule } from '../sms/sms.module';
import { httpClientService } from '@common/connections/httpclient/httpclient.service'
import { httpClientModule } from '@common/connections/httpclient/httpclinet.module'
@Module({
  imports: [RepositoryModule, EmailModule, SMSModule, httpClientModule
  ],
  providers: [
    OtpService,
    OtpRepository,
    OtpResolver,
    httpClientService,
  ],
})
export class OtpModule {}
