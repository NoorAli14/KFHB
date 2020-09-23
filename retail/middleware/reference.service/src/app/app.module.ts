import { Module } from '@nestjs/common';
import { CommonModule } from "@common/common.module";
import { HealthModule } from './health/health.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
@Module({
  imports: [CommonModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
