import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewQuestionInput } from './question.dto';

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

  const questions: any[] = [
    {
      title: 'Question 3',
      title_ar: 'Question 3',
      status: 'ACTIVE',
      rules: '{required: true}',
      section_id: '123-121',
      id: '123-121',
    },
    {
      title: 'Test Section 2',
      title_ar: 'Test Section 2',
      status: 'ACTIVE',
      rules: '{required: true}',
      section_id: '123-122',
      id: '123-122',
    },
    {
      title: 'Test Section 3',
      title_ar: 'Test Section 3',
      status: 'ACTIVE',
      rules: '{required: true}',
      section_id: '123-123',
      id: '123-123',
    },
  ];

  const questionInput: any = {
    title: 'Question 3',
    title_ar: 'Question 3',
    status: 'ACTIVE',
    rules: '{required: true}',
    section_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of sections`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{questionsList{id title title_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.questionsList;
        expect(data[0].title).toBe(questionInput.title);
        expect(data[0].title_ar).toBe(questionInput.title_ar);
        expect(data[0].status).toBe(questionInput.status);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single section base on section id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {id title title_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findQuestion;
        expect(data.title).toBe(questionInput.title);
        expect(data[0].title_ar).toBe(questionInput.title_ar);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
