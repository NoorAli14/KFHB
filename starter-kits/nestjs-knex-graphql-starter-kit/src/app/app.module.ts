import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './v1/v1.module';
import { CommonModule } from '@common/common.module';
@Module({
  imports: [CommonModule, V1Module],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
