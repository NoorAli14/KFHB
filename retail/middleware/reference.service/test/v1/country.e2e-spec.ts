import request from 'supertest';
import Ajv from 'ajv';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CountryModule } from '@app/v1/countries/country.module';

expect.extend({
  toBeValid(isValid, errorMessage) {
    return {
      message: () => (isValid ? '' : errorMessage),
      pass: isValid,
    };
  },
});

describe('Country Controller (e2e)', () => {
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
      imports: [CountryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  it('/GET countries (should get list of countries)', async done => {
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
            continent_code: {
              type: 'string',
            },
            phone_code: {
              type: 'string',
            },
            nationality: {
              type: 'string',
            },
          },
          required: [
            'id',
            'name',
            'iso_code',
            'continent_code',
            'phone_code',
            'nationality',
          ],
        },
      ],
    };
    const ajv = new Ajv({ coerceTypes: true });
    const validate = ajv.compile(schema);
    const response = await request(server)
      .get('/countries')
      .expect(200);
    const responseData = response.body;
    const valid = validate(responseData);
    expect(valid).toBeValid(ajvErrorMessage(validate.errors));
    done();
  });

  it('/GET countries/:id (should get one country)', async done => {
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
        continent_code: {
          type: 'string',
        },
        phone_code: {
          type: 'string',
        },
        nationality: {
          type: 'string',
        },
      },
      required: [
        'id',
        'name',
        'iso_code',
        'continent_code',
        'phone_code',
        'nationality',
      ],
    };
    const ajv = new Ajv({ coerceTypes: true });
    const validate = ajv.compile(schema);
    const response = await request(server)
      .get('/countries/37D4A517-8D44-4ED9-81A1-58FDE7950972')
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
