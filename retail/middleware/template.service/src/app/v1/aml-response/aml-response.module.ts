import { Module } from '@nestjs/common';
import { AmlResponseService } from './aml-response.service';
import { AmlResponseResolver } from './aml-response.resolver';

@Module({
  imports: [],
  providers: [AmlResponseService, AmlResponseResolver],
})
export class AmlResponseModule {}
