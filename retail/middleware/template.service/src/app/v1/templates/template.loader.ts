import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { TemplatesService } from './templates.service';
import { TemplateGQL } from './template.model';

@Injectable()
export class TemplateLoader implements NestDataLoader<string, TemplateGQL> {
  constructor(private readonly templatesService: TemplatesService) {}

  generateDataLoader(): DataLoader<string, TemplateGQL> {
    return new DataLoader<string, TemplateGQL>(keys =>
      this.templatesService.findByTemplateQuestionId(keys),
    );
  }
}
