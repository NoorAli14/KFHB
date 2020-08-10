import * as DataLoader from 'dataloader';
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { SectionsService } from "./sections.service";
import { SectionGQL } from "./section.model";

@Injectable()
export class SectionLoader implements NestDataLoader<string, SectionGQL> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, SectionGQL> {
    return new DataLoader<string, SectionGQL>(keys =>
      this.sectionsService.findByTemplateQuestionId(keys)
    );
  }
}