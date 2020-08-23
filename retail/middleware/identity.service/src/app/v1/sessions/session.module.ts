import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { SessionRepository } from '@rubix/core/repository/';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';

@Module({
  imports: [RepositoryModule],
  providers: [SessionsService, SessionRepository, SessionsResolver],
})
export class SessionModule {}
