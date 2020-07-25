import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { ServiceRegistry } from '@common/service.registry';

@Global()
@Module({
  providers: [ConfigurationService, ServiceRegistry],
  exports: [ConfigurationService, ServiceRegistry],
  imports: [],
})
export class CommonModule {}
