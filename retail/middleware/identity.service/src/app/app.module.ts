import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
