import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewOptionInput } from './option.dto';

describe('Complaince Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const options: any[] = [
    {
      name: 'Low',
      name_ar: 'Low',
      status: 'Active',
      question_id: '123-121',
      id: '123-121',
    },
    {
      name: 'Hihn',
      name_ar: 'High',
      status: 'Active',
      question_id: '123-122',
      id: '123-122',
    },
    {
      name: 'Test Section 3',
      name_ar: 'Test Section 3',
      status: 'Active',
      question_id: '123-123',
      id: '123-123',
    },
  ];

  const optionInput: any = {
    name: 'Low',
    name_ar: 'Low',
    status: 'Active',
    question_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of options`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{optionsList {name name_ar status}}`,
      })
      .expect(({ body }) => {
        const data = body.data.templatesList;
        expect(data[0].name).toBe(optionInput.name);
        expect(data[0].name_ar).toBe(optionInput.name_ar);
        expect(data[0].status).toBe(optionInput.status);
        expect(data).toBe(options);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single section base on section id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')

      .send({
        query: `{findSection(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {name name_ar status level}}`,
      })
      .expect(({ body }) => {
        const data = body.data.findTemplateByName;
        expect(data.name).toBe(optionInput.name);
        expect(data[0].name_ar).toBe(optionInput.name_ar);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
