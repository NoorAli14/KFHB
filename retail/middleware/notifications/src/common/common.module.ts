import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { DBConfigurationService } from '@common/configuration/dbconfiguration.service';

@Global()
@Module({
  providers: [ConfigurationService, DBConfigurationService],
  exports: [ConfigurationService, DBConfigurationService],
  imports: [],
})
export class CommonModule {}
