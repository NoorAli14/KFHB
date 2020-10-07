import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { createQueryObject } from '@common/tests/e2e.tests';

describe('Complince Module (e2e)', () => {
  let app: INestApplication;

  const templateResponses: any = {
    results: 'Test response results',
    remarks: 'Test response remarks',
    template_id: '37678c69-dde5-4452-a66b-401f32211427',
    user_id: '828605C2-7E50-40BC-AA88-C064CE63C155',
  };
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

  it(`Should fetch template response`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findTemplateResponseByUserId(user_id: "828605C2-7E50-40BC-AA88-C064CE63C155"){id results status remarks user_id template {id name}}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.findTemplateResponseByUserId;
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(data.length);
        expect(
          data
            .map((response: any) => response.user_id)
            .includes(
              data[0].user_id || '828605C2-7E50-40BC-AA88-C064CE63C155',
            ),
        ).toBeTruthy();
      })
      .expect(200)
      .end(done);
  });

  it(`Should create template response`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{addTemplateResponse(input: ${createQueryObject(
          templateResponses,
        )}){id status remaks}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.addTemplateResponse;
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
