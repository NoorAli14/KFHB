import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';

import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

import { NewQuestionInput } from './question.dto';
import { Question } from './question.model';
import { QUESTION_QUERY } from '@common/constants';

describe('Complaince Module (e2e)', () => {
  let question: NewQuestionInput;
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

  it('should successfully transform and validate the question response', async () => {
    question = {
      title: 'Test Question',
      title_ar: 'Test Question AR',
      rules: '{required: true}',
      type: 'text',
    } as NewQuestionInput;

    const transformedQuestion: NewQuestionInput = await transformAndValidate(
      NewQuestionInput,
      question,
    );
    expect(transformedQuestion).toBeDefined();
    expect(transformedQuestion.title).toEqual('Test Question');
    expect(transformedQuestion.title_ar).toEqual('Test Question AR');
  });

  it('should fetch list of question and validate based on question model', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{questionsList{${QUESTION_QUERY}}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.questionsList;
        const questionJson: string = JSON.stringify(data);

        const transformedQuestion: Question[] = transformAndValidateSync(
          Question,
          questionJson,
        ) as Question[];

        expect(transformedQuestion).toBeDefined();
        expect(transformedQuestion).toBeInstanceOf(Array);
        expect(transformedQuestion).toHaveLength(data.length);
        expect(transformedQuestion[0].title).toEqual('Question 3');
        expect(transformedQuestion[0].options).toBeInstanceOf(Array);
      })
      .end(done)
      .expect(200);
  });

  it('should fetch question, transform and validate the response', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {${QUESTION_QUERY}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.findQuestion;
        const questionJson: string = JSON.stringify(data);

        const transformedQuestion: Question = transformAndValidateSync(
          Question,
          questionJson,
        ) as Question;
        expect(transformedQuestion).toBeDefined();
        expect(transformedQuestion).toBeInstanceOf(Question);
        expect(transformedQuestion.status).toEqual('ACTIVE');
        expect(transformedQuestion.options).toBeInstanceOf(Array);
      })
      .end(done)
      .expect(200);
  });

  it('should throw error question not found', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d2d409a9-8cf3-3562-23de-2361dd59cd98"){${QUESTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findQuestion;

        expect(data).toBeUndefined();
        expect(!data).toBeTruthy();
      })
      .end(done)
      .expect(200);
  });

  const questionInput: any = {
    title: 'Question 3',
    title_ar: 'Question 3',
    status: 'ACTIVE',
    rules: '{required: true}',
    section_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of questions`, done => {
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

  it(`Should return single question base on question id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {id title title_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findQuestion;
        expect(data.title).toBe(questionInput.title);
        expect(data.title_ar).toBe(questionInput.title_ar);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
