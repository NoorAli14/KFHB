import { Module } from '@nestjs/common';
import {
  CommonModule,
  GqlClientModule,
  GqlClientService,
  ConfigurationService,
} from '@common/index';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [GqlClientModule, CommonModule],
  providers: [NotificationsService, GqlClientService, ConfigurationService],
  exports: [NotificationsService],
})
export class NotificationModule { }
