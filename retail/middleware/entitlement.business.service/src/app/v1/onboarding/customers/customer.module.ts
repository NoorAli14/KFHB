import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [CustomersController],
  providers: [CustomersService, GqlClientService],
})
export class CustomerModule {}
