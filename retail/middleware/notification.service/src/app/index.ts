import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [V1Module, AppModule],
})
export class ApplicationModule {}
