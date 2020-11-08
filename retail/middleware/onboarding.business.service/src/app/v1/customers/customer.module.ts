import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { CustomerController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [CustomerController],
  providers: [CustomersService, GqlClientService],
})
export class CustomerModule {}
