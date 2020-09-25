import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { SectionsService } from '../../app/v1/sections/sections.service';
import { Section } from '../../app/v1/sections/section.model';

@Injectable()
export class SectionLoaderForQuestion
  implements NestDataLoader<string, Section> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, Section> {
    return new DataLoader<string, Section>((keys, columns) =>
      this.sectionsService.findByIdsSorted(keys, columns),
    );
  }
}

@Injectable()
export class SectionLoaderForTemplate
  implements NestDataLoader<string, Section> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, Section> {
    return new DataLoader<string, Section>(async (keys, columns) =>
      this.sectionsService.findByTemplateId(keys, columns),
    );
  }
}

@Injectable()
export class SectionLoaderForTemplateQuestion
  implements NestDataLoader<string, Section> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, Section> {
    return new DataLoader<string, Section>(async (keys, columns) =>
      this.sectionsService.findByIdsSorted(keys, columns),
    );
  }
}
