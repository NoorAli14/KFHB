import { Module } from '@nestjs/common';
import { AmlResponseService } from './aml-response.service';
import { AmlResponseResolver } from './aml-response.resolver';
import { AmlResponseRepository } from '@core/repository/aml-response-repository';

@Module({
  imports: [],
  providers: [AmlResponseService, AmlResponseRepository, AmlResponseResolver],
})
export class AmlResponseModule {}
