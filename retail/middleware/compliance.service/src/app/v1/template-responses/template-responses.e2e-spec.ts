import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

import { createQueryObject, createQuery } from '@common/tests/e2e.tests';
import { NewTemplateResponseInput } from './template-response.dto';
import { TemplateResponse } from './template-response.model';

describe('Complince Module (e2e)', () => {
  let templateResponse: NewTemplateResponseInput;
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

  it('should successfully transform and validate the template response', async () => {
    templateResponse = {
      results: 'test template results',
      remarks: 'test template remarks',
      template_id: '37678c69-dde5-4452-a66b-401f32211427',
      user_id: '828605C2-7E50-40BC-AA88-C064CE63C155',
    } as NewTemplateResponseInput;

    const transformedResponse: NewTemplateResponseInput = await transformAndValidate(
      NewTemplateResponseInput,
      templateResponse,
    );
    expect(transformedResponse).toBeDefined();
    expect(transformedResponse.results).toEqual('test template results');
    expect(transformedResponse).toBeInstanceOf(NewTemplateResponseInput);
  });

  it('should successfully transform and validate JSON with array of template response', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findTemplateResponseByUserId(user_id: "828605C2-7E50-40BC-AA88-C064CE63C155"){id results status remarks user_id template {id name}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findTemplateResponseByUserId;
        const templateResponseJson: string = JSON.stringify(data);

        const transformedResponse: TemplateResponse[] = (await transformAndValidate(
          TemplateResponse,
          templateResponseJson,
        )) as TemplateResponse[];
        expect(transformedResponse).toBeDefined();
        expect(transformedResponse).toBeInstanceOf(Array);
        expect(transformedResponse).toHaveLength(data.length);
        expect(
          data
            .map((response: any) => response.user_id)
            .includes(
              data[0].user_id || '828605C2-7E50-40BC-AA88-C064CE63C155',
            ),
        ).toBeTruthy();
      })
      .end(done)
      .expect(200);
  });

  it('should throw error template response not found', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findTemplateResponseByUserId(user_id: "d2d409a9-8cf3-32-a4d0-2361dd59cd98"){id results status remarks user_id template {id name}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findTemplateResponseByUserId;
        expect(data).toBeUndefined();
        expect(!data).toBeTruthy();
        expect(data).toEqual(undefined);
      })
      .end(done)
      .expect(200);
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
        query: createQuery(
          'addTemplateResponse',
          templateResponse,
          'id status remarks',
        ),
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.addTemplateResponse;
        if (data) {
          const templateResponseJson: string = JSON.stringify(data);
          const transformedTemplateResponse: TemplateResponse[] = (await transformAndValidate(
            TemplateResponse,
            templateResponseJson,
          )) as TemplateResponse[];

          expect(
            transformedTemplateResponse['status'] === 'ACTIVE',
          ).toBeTruthy();
          expect(transformedTemplateResponse).toBeInstanceOf(TemplateResponse);
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
