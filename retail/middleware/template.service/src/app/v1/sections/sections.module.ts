import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionRepository } from '@core/repository/section.repository';
import { SectionsResolver } from './sections.resolver';

@Module({
  imports: [],
  providers: [SectionsService, SectionRepository, SectionsResolver],
})
export class SectionsModule {}
