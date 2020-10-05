import { Test, TestingModule } from '@nestjs/testing';
import { TemplateQuestionsResolver } from './template-questions.resolver';
import { TemplateQuestionsService } from './template-questions.service';

describe('TemplateQuestionsResolver', () => {
  let resolver: TemplateQuestionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateQuestionsResolver,
        {
          provide: TemplateQuestionsService,
          useFactory: () => ({
            findTemplateQuestion: jest.fn((id: string) => ({
              id: id,
              role: 'test role',
              status: false,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<TemplateQuestionsResolver>(TemplateQuestionsResolver);
  });

  describe('findTemplateQuestion', () => {
    expect(resolver.findTemplateQuestion('123-123-123', [])).toEqual({
      id: '123-123-123',
      role: 'test role',
      status: false,
    });
  });
});
