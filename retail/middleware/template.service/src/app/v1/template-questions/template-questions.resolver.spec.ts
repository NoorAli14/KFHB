import { Test, TestingModule } from '@nestjs/testing';
import { TemplateQuestionsResolver } from './template-questions.resolver';

describe('TemplateQuestionsResolver', () => {
  let resolver: TemplateQuestionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateQuestionsResolver],
    }).compile();

    resolver = module.get<TemplateQuestionsResolver>(TemplateQuestionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
