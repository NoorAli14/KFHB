import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { QuestionsService } from '../../app/v1/questions/questions.service';
import { Question } from '../../app/v1/questions/question.model';

@Injectable()
export class QuestionLoaderForSection
  implements NestDataLoader<string, Question> {
  constructor(private readonly questionsService: QuestionsService) {}

  generateDataLoader(): DataLoader<string, Question> {
    return new DataLoader<string, Question>((keys, columns) =>
      this.questionsService.findBySectionId(keys, columns),
    );
  }
}

@Injectable()
export class QuestionLoaderForOption
  implements NestDataLoader<string, Question> {
  constructor(private readonly questionsService: QuestionsService) {}

  generateDataLoader(): DataLoader<string, Question> {
    return new DataLoader<string, Question>((keys, columns) =>
      this.questionsService.findByIdsSorted(keys, columns),
    );
  }
}

@Injectable()
export class QuestionLoaderForTemplateQuestion
  implements NestDataLoader<string, Question> {
  constructor(private readonly questionsService: QuestionsService) {}

  generateDataLoader(): DataLoader<string, Question> {
    return new DataLoader<string, Question>((keys, columns) =>
      this.questionsService.findByIdsSorted(keys, columns),
    );
  }
}
