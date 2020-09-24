import { Test, TestingModule } from '@nestjs/testing';
import { OptionsService } from './options.service';
import { BadRequestException } from '@nestjs/common';

describe('OptionsService', () => {
  let service: OptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionsService],
    }).compile();

    service = module.get<OptionsService>(OptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOneOption', () => {
    it('should successfully return a cat', () => {
      expect(service.findById('6D44CFC4-CDD1-445D-ACCF-2099ED4D347A')).toEqual({
        name: 'test option',
        name_ar: 'test ar name',
        question_id: '12-23',
        id: '6D44CFC4-CDD1-445D-ACCF-2099ED4D347A',
      });
    });
    it('should throw an error', () => {
      const noIdCall = () => service.findById('1221');
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No cat with id not an id found');
    });
  });
});
