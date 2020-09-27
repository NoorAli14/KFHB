import { Module, HttpModule } from '@nestjs/common';
import { AmlRequestService } from './aml-request.service';
import { AmlRequestResolver } from './aml-request.resolver';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';
import { AmlResponseRepository } from '@core/repository/aml-response-repository';
// import { GqlClientService, GqlClientModule } from '@common/index';

@Module({
  imports: [HttpModule],
  providers: [
    AmlRequestService,
    AmlRequestRepository,
    AmlResponseRepository,
    AmlRequestResolver,
  ],
})
export class AmlRequestModule {}
