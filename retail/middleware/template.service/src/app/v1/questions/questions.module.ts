import { Module } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '@core/repository/question.repository';

@Module({
  imports: [],
  providers: [
    QuestionsResolver,
    QuestionsService,
    QuestionRepository,
  ],
})
export class QuestionsModule {}
