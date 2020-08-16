import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { OtpRepository } from '@rubix/core/repository/';
import { OtpResolver } from './otp.resolver';
import { OtpService } from './otp.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    OtpService,
    OtpRepository,
    OtpResolver,
  ],
})
export class OtpModule {}
