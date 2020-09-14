import { Module } from '@nestjs/common';
import { CommonModule } from '@rubix/common/common.module';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';
import { IdentityService } from './identity.service';

@Module({
  imports: [CommonModule],
  providers: [ConfigurationService, IdentityService],
})
export class IdentityModule {}
