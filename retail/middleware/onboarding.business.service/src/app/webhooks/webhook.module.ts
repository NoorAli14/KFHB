import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, GqlClientService],
})
export class WebhookModule { }
