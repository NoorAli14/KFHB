import { Test, TestingModule } from '@nestjs/testing';
import { AmlResponseResolver } from './aml-response.resolver';
import { AmlResponseService } from './aml-response.service';

describe('AmlResponseResolver', () => {
  let resolver: AmlResponseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmlResponseResolver,
        {
          provide: AmlResponseService,
          useFactory: () => ({
            getAmlStatus: jest.fn((customer_id, reference_no) => ({
              id: 5,
              response_on: reference_no,
              request_reference: 'Alm Request Ref',
              response_status: 'Aml Status',
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<AmlResponseResolver>(AmlResponseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getAmlStatueByRefNo', () => {
    it('should get the aml statue of customer', () => {
      expect(
        resolver.getAmlStatueByRefNo(
          '6D44CFC4-CDD1-445D-ACCF-2099ED4D347A',
          '6D44CFC4-CDD1-445D-ACCF-2099ED4D347A',
          [],
        ),
      ).toEqual({
        id: 5,
        response_on: '6D44CFC4-CDD1-445D-ACCF-2099ED4D347A',
        request_reference: 'Alm Request Ref',
        response_status: 'Aml Status',
      });
    });
  });
});
