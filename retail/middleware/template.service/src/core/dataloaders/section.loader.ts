import * as DataLoader from 'dataloader';
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { SectionsService } from "../../app/v1/sections/sections.service";
import { SectionGQL } from "../../app/v1/sections/section.model";

@Injectable()
export class SectionLoader implements NestDataLoader<string, SectionGQL> {
  constructor(private readonly sectionsService: SectionsService) {}

  generateDataLoader(): DataLoader<string, SectionGQL> {
    return new DataLoader<string, SectionGQL>(keys =>
      this.sectionsService.findByTemplateQuestionId(keys)
    );
  }
}