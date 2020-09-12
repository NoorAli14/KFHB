import { Test, TestingModule } from '@nestjs/testing';
import { AmlResponseResolver } from './aml-response.resolver';

describe('AmlResponseResolver', () => {
  let resolver: AmlResponseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmlResponseResolver],
    }).compile();

    resolver = module.get<AmlResponseResolver>(AmlResponseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
