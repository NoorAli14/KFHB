import { Test, TestingModule } from '@nestjs/testing';
import { TemplateResponsesResolver } from './template-responses.resolver';

describe('TemplateResponsesResolver', () => {
  let resolver: TemplateResponsesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateResponsesResolver],
    }).compile();

    resolver = module.get<TemplateResponsesResolver>(TemplateResponsesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
