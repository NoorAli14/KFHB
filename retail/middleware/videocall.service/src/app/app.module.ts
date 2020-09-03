import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from 'nestjs-redis';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigurationService) => configService.REDIS,
      inject: [ConfigurationService],
    }),
    HealthModule,
  ],
})
export class AppModule {}
