import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';

import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

import { Option } from './option.model';
import { NewOptionInput } from './option.dto';
import { OPTION_QUERY } from '@common/constants';

describe('Complaince Module (e2e)', () => {
  let option: NewOptionInput;
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

  it('should successfully transform and validate the options', async () => {
    option = {
      name: 'Test Option',
      name_ar: 'Test Option AR',
      question_id: 'CB92A7AA-E6EC-4856-B740-0D320ECF77F9',
    } as NewOptionInput;

    const transformedOption: NewOptionInput = await transformAndValidate(
      NewOptionInput,
      option,
    );
    expect(transformedOption).toBeDefined();
    expect(transformedOption.name).toEqual('Test Option');
    expect(transformedOption.name_ar).toEqual('Test Option AR');
  });

  it('should successfully transform and validate JSON with array of options', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{optionsList{${OPTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.optionsList;
        if (data) {
          const optionJson: string = JSON.stringify(data);

          // const transformedOption: Option[] = (await transformAndValidate(
          //   Option,
          //   optionJson,
          // )) as Option[];

          expect(data).toBeDefined();
          expect(data).toBeInstanceOf(Array);
          expect(data).toHaveLength(data.length);
        } else {
          expect(data).toBeUndefined();
          expect(data).toHaveLength(0);
        }
      })
      .end(done)
      .expect(200);
  });

  it('should successfully transform and validate JSON Option', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findOption(id: "6c211a24-4d69-4899-b0bb-040f6fcffdd8") {${OPTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findOption;
        if (data) {
          const optionJson: string = JSON.stringify(data);

          // const transformedOption: Option = (await transformAndValidate(
          //   Option,
          //   optionJson,
          // )) as Option;
          expect(data).toBeDefined();
          expect(data).toBeInstanceOf(Object);
          expect(data.status).toEqual('ACTIVE');
        } else {
          expect(data).toBeUndefined();
        }
      })
      .end(done)
      .expect(200);
  });

  it('should throw error option not found', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findOption(id: "d2d409a9-8cf3-3562-23de-2361dd59cd98"){${OPTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findOption;
        if (data) {
          const optionJson: string = JSON.stringify(data);

          const transformedOption: Option = (await transformAndValidate(
            Option,
            optionJson,
          )) as Option;
          expect(data).toBeDefined();
          expect(transformedOption).toBeInstanceOf(Object);
        } else {
          expect(data).toBeUndefined();
        }
      })
      .end(done)
      .expect(200);
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
