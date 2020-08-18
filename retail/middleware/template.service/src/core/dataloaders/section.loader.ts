import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { SectionsService } from '../../app/v1/sections/sections.service';
import { SectionGQL } from '../../app/v1/sections/section.model';

@Injectable()
export class SectionLoaderForQuestion
  implements NestDataLoader<string, SectionGQL> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, SectionGQL> {
    return new DataLoader<string, SectionGQL>((keys, columns) =>
      this.sectionsService.findByIdsSorted(keys, columns),
    );
  }
}

@Injectable()
export class SectionLoaderForTemplate
  implements NestDataLoader<string, SectionGQL> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, SectionGQL> {
    return new DataLoader<string, SectionGQL>(async (keys, columns) =>
      this.sectionsService.findByTemplateId(keys, columns),
    );
  }
}
