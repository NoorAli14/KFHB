import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), HealthModule],
})
export class AppModule {}
