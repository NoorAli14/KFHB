import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

describe('Complince Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const templates: any[] = [
    {
      name: 'KYC Template',
      name_ar: 'KYC Template',
      status: 'Active',
      id: '123-121',
    },
    {
      name: 'CRS Template',
      name_ar: 'CRS Template',
      status: 'Active',
      id: '123-122',
    },
    {
      name: 'FATCA Template',
      name_ar: 'FATCA Template',
      status: 'Active',
      id: '123-123',
    },
  ];

  const templateInput: any = {
    name: 'FATCA',
    name_ar: 'FATCA AR',
    status: 'Active',
    id: '123-121',
  };

  it(`Should fetch list of templates`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{templatesList{name name_ar status}}`,
      })
      .expect(({ body }) => {
        const data = body.data.templatesList;
        expect(data[0].name).toBe(templateInput.name);
        expect(data[0].status).toBe(templateInput.status);
        expect(data).toBe(templates);
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
      .expect(({ body }) => {
        const data = body.data.findTemplateByName;
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
