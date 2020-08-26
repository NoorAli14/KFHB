import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { TemplatesService } from '../../app/v1/templates/templates.service';
import { TemplateGQL } from '../../app/v1/templates/template.model';

@Injectable()
export class TemplateLoaderForSection
  implements NestDataLoader<string, TemplateGQL> {
  constructor(private readonly templatesService: TemplatesService) {}

  generateDataLoader(): DataLoader<string, TemplateGQL> {
    return new DataLoader<string, TemplateGQL>((keys, columns) =>
      this.templatesService.findByIdsSorted(keys, columns),
    );
  }
}

@Injectable()
export class TemplateLoaderForTemplateQuestion
  implements NestDataLoader<string, TemplateGQL> {
  constructor(private readonly templatesService: TemplatesService) {}

  generateDataLoader(): DataLoader<string, TemplateGQL> {
    return new DataLoader<string, TemplateGQL>((keys, columns) =>
      this.templatesService.findByIdsSorted(keys, columns),
    );
  }
}
