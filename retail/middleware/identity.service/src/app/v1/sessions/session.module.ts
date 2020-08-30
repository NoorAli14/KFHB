import { Module } from '@nestjs/common';
// import { IdentityModule, IdentityService } from '@rubix/common';

import {
  RepositoryModule,
  SessionRepository,
  CustomerRepository,
} from '@rubix/core';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    SessionsService,
    SessionRepository,
    CustomerRepository,
    SessionsResolver,
  ],
})
export class SessionModule {}
