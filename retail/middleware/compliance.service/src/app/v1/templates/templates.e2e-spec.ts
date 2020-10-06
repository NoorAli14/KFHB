import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import {
  classToClass,
  classToClassFromExist,
  classToPlain,
  classToPlainFromExist,
  plainToClass,
  plainToClassFromExist,
} from 'class-transformer';

import { transformAndValidate } from 'class-transformer-validator';
import { NewTemplateInput } from './template.dto';

describe('Complince Module (e2e)', () => {
  let template: NewTemplateInput;
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

  it('should successfully transform and validate the template', async () => {
    const template = {
      name: 'Test Template',
      name_ar: 'Test Template',
    } as NewTemplateInput;

    const transformedTemplate: NewTemplateInput = await transformAndValidate(
      NewTemplateInput,
      template,
    );
    expect(transformedTemplate).toBeDefined();
    expect(transformedTemplate.name).toEqual('Test Template');
  });

  it('should successfully transform and validate JSON with array of Templates', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{templatesList{name name_ar status}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body.data.templatesList;
        const templateJson: string = JSON.stringify(data);

        const transformedTemplate: NewTemplateInput[] = (await transformAndValidate(
          NewTemplateInput,
          templateJson,
        )) as NewTemplateInput[];
        console.log(transformedTemplate, '-=-=- transform template -=-=-');
        console.log(data, '-=-=- transform 121 template -=-=-');
        expect(data).toBeDefined();
        expect(transformedTemplate).toBeInstanceOf(Array);
        expect(transformedTemplate).toHaveLength(transformedTemplate.length);
        expect(transformedTemplate[0].name).toEqual('FATCA');
      })
      .end(done)
      .expect(200);
  });

  const templateInput: any = {
    name: 'FATCA',
    name_ar: 'FATCA AR',
    status: 'ACTIVE',
    id: '123-121',
  };

  it(`Should fetch list of templates`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{templatesList{name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.templatesList;
        expect(data[0].name).toBe(templateInput.name);
        expect(data[0].status).toBe(templateInput.status);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single template base on template name`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findTemplateByName(name: "FATCA") {name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findTemplateByName;
        expect(data.name).toBe(templateInput.name);
        expect(data.name_ar).toBe(templateInput.name_ar);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single template base on template id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findTemplate(id: "37678c69-dde5-4452-a66b-401f32211427") {name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findTemplate;
        expect(data.name).toBe(templateInput.name);
        expect(data.name_ar).toBe(templateInput.name_ar);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
