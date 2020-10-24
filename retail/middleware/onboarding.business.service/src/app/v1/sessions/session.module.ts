import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [SessionsController],
  providers: [SessionsController, SessionsService, CustomersService, GqlClientService],
})
export class SessionModule {}
