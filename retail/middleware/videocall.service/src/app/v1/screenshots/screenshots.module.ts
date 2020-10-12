import { Module } from '@nestjs/common';
import { ScreenshotsResolver } from './screenshots.resolver';
import { ScreenshotsService } from './screenshots.service';
import { ScreenshotsRepository } from '@core/repository';

@Module({
  providers: [ScreenshotsResolver, ScreenshotsService, ScreenshotsRepository],
})
export class ScreenshotsModule {}
