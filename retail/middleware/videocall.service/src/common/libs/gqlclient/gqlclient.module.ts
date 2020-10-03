import { Module, HttpModule } from '@nestjs/common';
import { GqlClientService } from './gqlclient.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [GqlClientService],
  exports: [GqlClientService, HttpModule],
})
export class GqlClientModule {}
