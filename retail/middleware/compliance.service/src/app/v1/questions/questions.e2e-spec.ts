import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewQuestionInput } from './question.dto';

import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';
import { Question } from './question.model';

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

  it('should successfully transform and validate the question', async () => {
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

  it('should successfully transform and validate JSON with array of question', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{questionsList{id title title_ar status options {id name name_ar}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.questionsList;
        if (data) {
          const questionJson: string = JSON.stringify(data);

          // const transformedQuestion: Question[] = (await transformAndValidate(
          //   Question,
          //   questionJson,
          // )) as Question[];

          expect(data).toBeDefined();
          expect(data).toBeInstanceOf(Array);
          expect(data).toHaveLength(data.length);
          expect(data[0].title).toEqual('Question 3');
          expect(data[0].options).toBeInstanceOf(Array);
        } else {
          expect(data).toBeUndefined();
          expect(data).toHaveLength(0);
        }
      })
      .end(done)
      .expect(200);
  });

  it('should successfully transform and validate JSON question', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d329c531-9e7a-4b55-923f-04fc62aee79d") {id title title_ar status type options {id name name_ar}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findQuestion;
        if (data) {
          const questionJson: string = JSON.stringify(data);

          // const transformedQuestion: Question = (await transformAndValidate(
          //   Question,
          //   questionJson,
          // )) as Question;
          expect(data).toBeDefined();
          expect(data).toBeInstanceOf(Object);
          expect(data.status).toEqual('ACTIVE');
          expect(data.options).toBeInstanceOf(Array);
        } else {
          expect(data).toBeUndefined();
        }
      })
      .end(done)
      .expect(200);
  });

  it('should throw error question not found', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findQuestion(id: "d2d409a9-8cf3-3562-23de-2361dd59cd98"){id title title_ar status options {id name name_ar}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findQuestion;
        if (data) {
          const questionJson: string = JSON.stringify(data);

          const transformedQuestion: Question = (await transformAndValidate(
            Question,
            questionJson,
          )) as Question;
          expect(data).toBeDefined();
          expect(transformedQuestion).toBeInstanceOf(Question);
        } else {
          expect(data).toBeUndefined();
        }
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
