import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { CustomersService } from '../v1/customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, GqlClientService, CustomersService],
})
export class WebhookModule {}
