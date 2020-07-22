import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesResolver } from './templates.resolver';

describe('TemplatesResolver', () => {
  let resolver: TemplatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplatesResolver],
    }).compile();

    resolver = module.get<TemplatesResolver>(TemplatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
