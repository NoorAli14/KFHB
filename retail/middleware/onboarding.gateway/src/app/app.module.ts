import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { V1Module } from './v1/v1.module';
import { CommonModule } from '@common/common.module';
@Module({
  imports: [HealthModule, CommonModule, V1Module],
})
export class AppModule {}
