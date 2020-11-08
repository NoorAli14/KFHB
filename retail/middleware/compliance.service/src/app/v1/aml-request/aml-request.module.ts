import { Module, HttpModule } from '@nestjs/common';
import { AmlRequestService } from './aml-request.service';
import { AmlRequestResolver } from './aml-request.resolver';
import {
  AmlRequestRepository,
  AmlResponseRepository,
  TemplateResponsesRepository,
} from '@core/repository';
// import { GqlClientService, GqlClientModule } from '@common/index';

@Module({
  imports: [HttpModule],
  providers: [
    AmlRequestService,
    AmlRequestRepository,
    AmlResponseRepository,
    TemplateResponsesRepository,
    AmlRequestResolver,
  ],
})
export class AmlRequestModule {}
