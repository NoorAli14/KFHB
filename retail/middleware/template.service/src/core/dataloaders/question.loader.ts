import * as DataLoader from 'dataloader';
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { QuestionsService } from "../../app/v1/questions/questions.service";
import { QuestionGQL } from "../../app/v1/questions/question.model";

@Injectable()
export class QuestionLoader implements NestDataLoader<string, QuestionGQL> {
  constructor(private readonly questionsService: QuestionsService) {}

  generateDataLoader(): DataLoader<string, QuestionGQL> {
    return new DataLoader<string, QuestionGQL>(keys =>
      this.questionsService.findByTemplateQuestionId(keys)
    );
  }
}