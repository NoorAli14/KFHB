import { Test, TestingModule } from '@nestjs/testing';
import { OptionsResolver } from './options.resolver';
import { OptionsService } from './options.service';

describe('OptionsResolver', () => {
  let resolver: OptionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OptionsResolver,
        {
          provide: OptionsService,
          useFactory: () => ({
            findOption: jest.fn((id: string) => ({
              name: 'test option',
              name_ar: 'test ar name',
              question_id: '12-23',
              id,
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<OptionsResolver>(OptionsResolver);
  });

  describe('findOption', () => {
    it('should get one option', () => {
      const expected = {
        name: 'test option',
        name_ar: 'test ar name',
        id: '6D44CFC4-CDD1-445D-ACCF-2099ED4D347A',
      };
      expect(
        resolver.findOption('6D44CFC4-CDD1-445D-ACCF-2099ED4D347A', [
          'id',
          'name',
          'name_ar',
        ]),
      ).toEqual(expected);
    });
  });
});
