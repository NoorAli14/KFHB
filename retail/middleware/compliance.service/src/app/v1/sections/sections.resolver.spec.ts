import { Test, TestingModule } from '@nestjs/testing';
import { SectionsResolver } from './sections.resolver';
import { SectionsService } from './sections.service';

describe('SectionsResolver', () => {
  let resolver: SectionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsResolver,
        {
          provide: SectionsService,
          useFactory: () => ({
            findSection: jest.fn((id: string) => ({
              id: id,
              name: 'sextion name',
              name_ar: 'section name ar',
              level: 'test level',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<SectionsResolver>(SectionsResolver);
  });

  describe('findSection', () => {
    expect(resolver.findSection('123-123-123', [])).toEqual({
      id: '123-123-123',
      name: 'sextion name',
      name_ar: 'section name ar',
      level: 'test level',
    });
  });
});
