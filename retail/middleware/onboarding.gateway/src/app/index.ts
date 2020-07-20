import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { V1Module } from './v1/v1.module';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [AppModule, CommonModule, V1Module],
})
export class ApplicationModule {}
