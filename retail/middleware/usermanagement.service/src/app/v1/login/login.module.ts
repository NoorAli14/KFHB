import { Module } from '@nestjs/common';

import { Encrypter } from '@common/encrypter';
import { LoginResolver } from '@app/v1/login/login.resolver';
import { LoginService } from '@app/v1/login/login.service';
import { RepositoryModule } from '@core/repository/repository.module';
import { UserRepository } from '@core/repository';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    LoginResolver,
    LoginService,
    Encrypter,
    UserRepository,
    SystemAuditLogService,
  ],
})
export class LoginModule {}
