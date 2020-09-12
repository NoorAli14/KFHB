import { Module } from '@nestjs/common';
import { AmlRequestService } from './aml-request.service';
import { AmlRequestResolver } from './aml-request.resolver';

@Module({
  imports: [],
  providers: [AmlRequestService, AmlRequestResolver],
})
export class AmlRequestModule {}
