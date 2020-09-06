import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { EvaluationsController } from './evaluations.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [SessionsController, EvaluationsController],
  providers: [SessionsController, SessionsService, GqlClientService],
})
export class SessionModule {}
