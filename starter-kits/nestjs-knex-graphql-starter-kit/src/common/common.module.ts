import { Global, Module } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Global()
@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
  imports: [],
})
export class CommonModule {}
