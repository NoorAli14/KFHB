import { Module, HttpModule } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { RegistryService } from '@common/services/registry.service';
import { GqlClientService } from './gqlclient.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (serviceRegistry: RegistryService) =>
        serviceRegistry.get('CUSTOMER'),
      inject: [RegistryService],
    }),
  ],
  providers: [GqlClientService],
  exports: [GqlClientService, HttpModule],
})
export class GqlClientModule {}
