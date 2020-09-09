import { Module } from '@nestjs/common';
import { IdentityModule, IdentityService } from '@rubix/common/http/';

import {
  RepositoryModule,
  SessionRepository,
  CustomerRepository,
} from '@rubix/core';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';

@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [
    SessionsService,
    SessionRepository,
    CustomerRepository,
    SessionsResolver,
    IdentityService,
  ],
})
export class SessionModule {}
