import { Test, TestingModule } from '@nestjs/testing';
import { OptionsResolver } from './options.resolver';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';

describe('OptionsResolver', () => {
  let resolver: OptionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionsResolver,
        {
          provide: OptionsService,
          useFactory: () => ({
            findOption: jest.fn((id: { id: string }) => ({
              age: 3,
              name: 'test option',
              name_ar: 'test ar name',
              question_id: '12-23',
              ...id,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<OptionsResolver>(OptionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findOption', () => {
    it('should get one cat', () => {
      expect(resolver.findOption('500', [])).toEqual({
        name: 'Test Cat',
        breed: 'Test Breed',
        age: 3,
        id: '500',
      });
    });
  });
});
