import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewQuestionInput } from './question.dto';

describe('Complaince Module (e2e)', () => {
  let app: INestApplication;

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
      status: 'Active',
      rules: '{required: true}',
      section_id: '123-121',
      id: '123-121',
    },
    {
      title: 'Test Section 2',
      title_ar: 'Test Section 2',
      status: 'Active',
      rules: '{required: true}',
      section_id: '123-122',
      id: '123-122',
    },
    {
      title: 'Test Section 3',
      title_ar: 'Test Section 3',
      status: 'Active',
      rules: '{required: true}',
      section_id: '123-123',
      id: '123-123',
    },
  ];

  const questionInput: any = {
    title: 'Question 3',
    title_ar: 'Question 3',
    status: 'Active',
    rules: '{required: true}',
    section_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of sections`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{questionsList{title title_ar status level}}`,
      })
      .expect(({ body }) => {
        const data = body.data.questionsList;
        expect(data[0].title).toBe(questionInput.title);
        expect(data[0].title_ar).toBe(questionInput.title_ar);
        expect(data[0].status).toBe(questionInput.status);
        expect(data).toBe(questions);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single section base on section id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')

      .send({
        query: `{findQuestion(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {title title_ar status level}}`,
      })
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
