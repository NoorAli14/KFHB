import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import {IdentityService} from './identity.service'

@Module({
  imports: [RepositoryModule],
  providers: [ConfigurationService, IdentityService],
  export: [IdentityService]
})
export class IdentityModule {}
