import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [GqlClientModule],
  controllers: [SessionsController],
  providers: [SessionsController, SessionsService, GqlClientService],
})
export class SessionModule {}
