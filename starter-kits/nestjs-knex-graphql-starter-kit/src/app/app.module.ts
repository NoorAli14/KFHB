import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module } from './v1/v1.module';
import { EnvModule } from 'src/config/env/env.module';

@Module({
  imports: [EnvModule, V1Module],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
