import { Test, TestingModule } from '@nestjs/testing';
import { TemplateQuestionsService } from './template-questions.service';

describe('TemplateQuestionsService', () => {
  let service: TemplateQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateQuestionsService],
    }).compile();

    service = module.get<TemplateQuestionsService>(TemplateQuestionsService);
  });
});
