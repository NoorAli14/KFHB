import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { TemplateResponsesService } from './template-responses.service';
import { TemplateResponseGQL } from './template-response.model';

@Injectable()
export class TemplateResponseLoader
  implements NestDataLoader<string, TemplateResponseGQL> {
  constructor(
    private readonly templateResponsesService: TemplateResponsesService,
  ) {}

  generateDataLoader(): DataLoader<string, TemplateResponseGQL> {
    return new DataLoader<string, TemplateResponseGQL>(keys =>
      this.templateResponsesService.findByIds(keys),
    );
  }
}
