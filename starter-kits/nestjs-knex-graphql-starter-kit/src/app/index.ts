import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { V1Module } from './v1/v1.module';
import { AppModule } from './app.module';

@Module({
  imports: [
    RouterModule.forRoutes([
      { path: '/api/v1', module: V1Module },
      { path: '/app', module: AppModule },
    ]),
    V1Module,
    AppModule,
  ],
})
export class ApplicationModule {}
