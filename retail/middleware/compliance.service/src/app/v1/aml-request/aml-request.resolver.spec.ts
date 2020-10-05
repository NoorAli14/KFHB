import { Test, TestingModule } from '@nestjs/testing';
import { AmlRequestResolver } from './aml-request.resolver';

describe('AmlRequestResolver', () => {
  let resolver: AmlRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmlRequestResolver],
    }).compile();

    resolver = module.get<AmlRequestResolver>(AmlRequestResolver);
  });
});
