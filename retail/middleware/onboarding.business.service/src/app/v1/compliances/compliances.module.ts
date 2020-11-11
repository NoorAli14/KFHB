import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { CompliancesController } from './compliances.controller';
import { ComplianceService } from './compliances.service';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [CompliancesController],
  providers: [CompliancesController, ComplianceService, CustomersService, GqlClientService],
})
export class ComplianceModule {}
