import { Module, HttpModule } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { ServiceRegistry } from '@common/service.registry';
import { GqlClientService } from './gqlclient.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (serviceRegistry: ServiceRegistry) =>
        serviceRegistry.get('CUSTOMER'),
      inject: [ServiceRegistry],
    }),
  ],
  providers: [GqlClientService],
  exports: [GqlClientService, HttpModule],
})
export class GqlClientModule {}
