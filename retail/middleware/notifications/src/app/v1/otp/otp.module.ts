import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { OtpRepository } from '@rubix/core/repository/';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';
import { EmailModule } from '../email/email.module';
import { SMSModule } from '../sms/sms.module';

@Module({
  imports: [RepositoryModule, EmailModule, SMSModule],
  providers: [
    OtpService,
    OtpRepository,
    OtpResolver,
  ],
})
export class OtpModule {}
