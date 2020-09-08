import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { CompliancesController } from './compliances.controller';
import { ComplianceService } from './compliances.service';

@Module({
  imports: [GqlClientModule],
  controllers: [CompliancesController],
  providers: [CompliancesController, ComplianceService, GqlClientService],
})
export class ComplianceModule {}
