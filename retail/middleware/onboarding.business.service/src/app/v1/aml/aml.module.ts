import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { AmlService } from './aml.service';
import { AmlController } from './aml.controller';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [AmlController],
  providers: [AmlService, CustomersService, GqlClientService],
})
export class AmlModule {}
