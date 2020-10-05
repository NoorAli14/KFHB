import { Test, TestingModule } from '@nestjs/testing';
import { TemplateResponsesService } from './template-responses.service';

describe('TemplateResponsesService', () => {
  let service: TemplateResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateResponsesService],
    }).compile();

    service = module.get<TemplateResponsesService>(TemplateResponsesService);
  });
});
