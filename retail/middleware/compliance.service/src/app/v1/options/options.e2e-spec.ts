import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewOptionInput } from './option.dto';

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

  const options: any[] = [
    {
      name: 'Low',
      name_ar: 'Low',
      status: 'ACTIVE',
      question_id: '123-121',
      id: '123-121',
    },
    {
      name: 'Hihn',
      name_ar: 'High',
      status: 'ACTIVE',
      question_id: '123-122',
      id: '123-122',
    },
    {
      name: 'Test Section 3',
      name_ar: 'Test Section 3',
      status: 'ACTIVE',
      question_id: '123-123',
      id: '123-123',
    },
  ];

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
        const data = body.data.optionsList;
        expect(data[0].name).toBe(optionInput.name);
        expect(data[0].name_ar).toBe(optionInput.name_ar);
        expect(data[0].status).toBe(optionInput.status);
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
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findSection;
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
