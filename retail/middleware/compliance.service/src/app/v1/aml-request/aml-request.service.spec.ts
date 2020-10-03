import { Test, TestingModule } from '@nestjs/testing';
import { AmlRequestService } from './aml-request.service';

describe('AmlRequestService', () => {
  let service: AmlRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmlRequestService],
    }).compile();

    service = module.get<AmlRequestService>(AmlRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
