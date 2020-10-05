import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';

describe('QuestionsResolver', () => {
  let resolver: QuestionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionsResolver,
        {
          provide: QuestionsService,
          useFactory: () => ({
            findQuestion: jest.fn((id: string) => ({
              id: id,
              title: 'test question',
              title_ar: 'test question ar',
              rules: 'test rules',
              status: 'test status',
              type: 'test type',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<QuestionsResolver>(QuestionsResolver);
  });

  describe('findQuestion', () => {
    expect(resolver.findQuestion('123-123-123', [])).toEqual({
      id: '123-123-123',
      title: 'test question',
      title_ar: 'test question ar',
      rules: 'test rules',
      status: 'test status',
      type: 'test type',
    });
  });
});
