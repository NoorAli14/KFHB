import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { SendEmailInput } from './email.dto';
import { createQuery } from '@rubix/common/tests/e2e.tests';

describe('Email Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const sendEmailInput: SendEmailInput = {
    subject: 'e2e testing email.',
    template: 'default',
    to: 'ahmad.raza@virtualforce.io',
    body: '<p>Hello. this is e2e testing email.</p>',
  };

  it(`Send Email with default template`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery("sendEmail",sendEmailInput, "to subject"),
      })
      .expect(({ body }) => {
        const data = body.data.sendEmail;
        expect(data.to).toBe(sendEmailInput.to);
        expect(data.subject).toBe(sendEmailInput.subject);
      })
      .expect(200)
      .end(done);
  });

  const sendTemplateEmailInput : SendEmailInput ={
    subject: 'e2e testing email with custome template.',
    template: 'sample',
    to: 'ahmad.raza@virtualforce.io',
    context: [
      { "key": "title", "value": "This is sample title from e2e testing." },
      {"key": "name", "value": "This is sample value from e2e testing."},
    ]
  }

  it(`Send Email with sample template`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery("sendEmail",sendTemplateEmailInput, "to subject"),
      })
      .expect(({ body }) => {
        const data = body.data.sendEmail;
        expect(data.to).toBe(sendTemplateEmailInput.to);
        expect(data.subject).toBe(sendTemplateEmailInput.subject);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
