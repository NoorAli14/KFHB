import { Test, TestingModule } from '@nestjs/testing';
import { AmlResponseService } from './aml-response.service';

describe('AmlResponseService', () => {
  let service: AmlResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmlResponseService],
    }).compile();

    service = module.get<AmlResponseService>(AmlResponseService);
  });
});
