import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ModuleV1 } from './v1/v1.module';
import { CommonModule } from '@common/common.module';
import { WebhookModule } from './webhooks/webhook.module'
@Module({
  imports: [HealthModule, CommonModule, ModuleV1, WebhookModule],
})
export class AppModule { }
