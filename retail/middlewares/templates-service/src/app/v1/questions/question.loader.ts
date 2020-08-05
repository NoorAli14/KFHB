import DataLoader = require("dataloader");
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { QuestionsService } from "./questions.service";
import { QuestionGQL } from "./question.model";

@Injectable()
export class QuestionLoader implements NestDataLoader<string, QuestionGQL> {
  constructor(private readonly questionsService: QuestionsService) {}

  generateDataLoader(): DataLoader<string, QuestionGQL> {
    return new DataLoader<string, QuestionGQL>(keys =>
      this.questionsService.findByIds(keys)
    );
  }
}