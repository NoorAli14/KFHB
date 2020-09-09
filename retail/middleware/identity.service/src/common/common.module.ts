import { Global, Module } from '@nestjs/common';
import {
  ConfigurationService,
  DBConfigurationService,
} from '@rubix/common/configuration/';

@Global()
@Module({
  providers: [ConfigurationService, DBConfigurationService],
  exports: [ConfigurationService, DBConfigurationService],
  imports: [],
})
export class CommonModule {}
