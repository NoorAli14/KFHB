import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
@Module({
  imports: [GqlClientModule, CommonModule],
  controllers: [],
  providers: [NotificationsService, GqlClientService, ConfigurationService],
  exports: [NotificationsService],
})
export class NotificationModule {}
