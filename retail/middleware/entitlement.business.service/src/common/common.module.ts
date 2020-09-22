import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { RegistryService } from './services/registry.service';

@Global()
@Module({
  providers: [ConfigurationService, RegistryService],
  exports: [ConfigurationService, RegistryService],
})
export class CommonModule {}
