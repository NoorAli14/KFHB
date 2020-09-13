import { Module } from '@nestjs/common';
import { AmlRequestService } from './aml-request.service';
import { AmlRequestResolver } from './aml-request.resolver';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';

@Module({
  imports: [],
  providers: [AmlRequestService, AmlRequestRepository, AmlRequestResolver],
})
export class AmlRequestModule {}
