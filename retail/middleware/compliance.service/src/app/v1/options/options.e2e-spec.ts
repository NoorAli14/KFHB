import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

describe('Complaince Module (e2e)', () => {
  let app: INestApplication;

  const headers: { [key: string]: any } = {
    'x-tenant-id': '9013C327-1190-4875-A92A-83ACA9029160',
    'x-user-id': '828605C2-7E50-40BC-AA88-C064CE63C155',
    'x-correlation-id': '7D55A5DB-739A-4B80-BD37-D3D30358D655',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const optionInput: any = {
    name: 'Low',
    name_ar: 'Low',
    status: 'ACTIVE',
    question_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of options`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{optionsList {name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.optionsList;
        if (data) {
          expect(data).toBeInstanceOf(Array);
          expect(data).toHaveLength(data.length);
        } else {
          expect(data).toBeUndefined();
        }
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single oprtion base on option id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')

      .send({
        query: `{findOption(id: "CB92A7AA-E6EC-4856-B740-0D320ECF77F9") {name name_ar status }}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.findOption;
        if (data) {
          expect(data.name).toBe(optionInput.name);
          expect(data.name_ar).toBe(optionInput.name_ar);
        } else {
          expect(data).toBeUndefined();
        }
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
