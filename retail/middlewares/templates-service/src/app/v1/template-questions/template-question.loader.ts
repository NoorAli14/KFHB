import DataLoader = require("dataloader");
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { TemplateQuestionsService } from "./template-questions.service";
import { TemplateQuestionGQL } from "./template-question.model";

@Injectable()
export class TemplateQuestionLoader implements NestDataLoader<string, TemplateQuestionGQL> {
  constructor(private readonly templateQuestionsService: TemplateQuestionsService) {}

  generateDataLoader(): DataLoader<string, TemplateQuestionGQL> {
    return new DataLoader<string, TemplateQuestionGQL>(keys =>
      this.templateQuestionsService.findByIds(keys)
    );
  }
}