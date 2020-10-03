import request from 'supertest';
import Ajv from 'ajv';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CurrencyModule } from '@app/v1/currencies/currency.module';

expect.extend({
  toBeValid(isValid, errorMessage) {
    return {
      message: () => (isValid ? '' : errorMessage),
      pass: isValid,
    };
  },
});

describe('Currency Controller (e2e)', () => {
  let app: INestApplication;
  let server: any;

  const ajvErrorMessage = errors =>
    (errors || [])
      .map(error => {
        try {
          const [, index, fieldName] = /\[(.*)\].(.*)/.exec(error.dataPath);
          return `error with item #${index}'s field "${fieldName}". The error is: ${error.message}`;
        } catch (error) {
          return error.message;
        }
      })
      .join('\n');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CurrencyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('/GET currencies (should get list of currencies)', async done => {
    const schema = {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            iso_code: {
              type: 'string',
            },
            numeric_code: {
              type: 'integer',
            },
            minor_unit: {
              type: 'integer',
            },
          },
          required: ['id', 'name', 'iso_code', 'numeric_code', 'minor_unit'],
        },
      ],
    };
    const ajv = new Ajv({ coerceTypes: true });
    const validate = ajv.compile(schema);
    const response = await request(server)
      .get('/currencies')
      .expect(200);
    const responseData = response.body;
    const valid = validate(responseData);
    expect(valid).toBeValid(ajvErrorMessage(validate.errors));
    done();
  });

  it('/GET currencies/:id (should get one currency)', async done => {
    const schema = {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        iso_code: {
          type: 'string',
        },
        numeric_code: {
          type: 'integer',
        },
        minor_unit: {
          type: 'integer',
        },
      },
      required: ['id', 'name', 'iso_code', 'numeric_code', 'minor_unit'],
    };
    const ajv = new Ajv({ coerceTypes: true });
    const validate = ajv.compile(schema);
    const response = await request(server)
      .get('/currencies/0D358BBC-7ED6-4B97-AC07-2DC5C0FEEADC')
      .expect(200);
    const responseData = response.body;
    const valid = validate(responseData);
    expect(valid).toBeValid(ajvErrorMessage(validate.errors));
    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
