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
    jest.setTimeout(50000);
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


  // CC list of emails.

  const sendNewAppointmentEmailInput : SendEmailInput ={
    subject: 'New Appointment',
    template: 'appointment_sucess',
    to: 'ahmad.raza@virtualforce.io',
    cc: ["2014fsd@gmail.com", "2015fsd@gmail.com"],
    context: [
      {"key": "title", "value": "New Appointment" },
      {"key": "customer_id", "value": "4512sdswd232s4454"},
      {"key": "customer_name", "value": "Ahmad Raza"},
      {"key": "appointment_date", "value": "11-11-2020"},
      {"key": "appointment_time", "value": "19:00"},
    ]
  }

  it(`Send Email with Appointment template and Check CC functionality.`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery("sendEmail",sendNewAppointmentEmailInput, "to cc"),
      })
      .expect(({ body }) => {
        const data = body.data.sendEmail;
        expect(data.to).toBe(sendNewAppointmentEmailInput.to);
        expect(data.cc).toMatchObject(sendNewAppointmentEmailInput.cc);
      })
      .expect(200)
      .end(done);
  });

  // BCC List of Emails.

  const bccEmailInput : SendEmailInput ={
    subject: 'New Appointment',
    template: 'appointment_sucess',
    bcc: ["ahmad.raza@virtualforce.io", "2014fsd@gmail.com"],
    context: [
      {"key": "title", "value": "New Appointment" },
      {"key": "customer_id", "value": "4512sdswd232s4454"},
      {"key": "customer_name", "value": "Ahmad Raza"},
      {"key": "appointment_date", "value": "11-11-2020"},
      {"key": "appointment_time", "value": "19:00"},
    ]
  }

  it(`Send Email as BCC to recepients.`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery("sendEmail",bccEmailInput, "bcc"),
      })
      .expect(({ body }) => {
        const data = body.data.sendEmail;
        expect(data.bcc).toMatchObject(bccEmailInput.bcc);
      })
      .expect(200)
      .end(done);
  });

  // Test with no Recepients.

  const withoutRecepientsEmailInput : SendEmailInput ={
    subject: 'New Appointment',
    template: 'appointment_sucess',
    context: [
      {"key": "title", "value": "New Appointment" },
      {"key": "customer_id", "value": "4512sdswd232s4454"},
      {"key": "customer_name", "value": "Ahmad Raza"},
      {"key": "appointment_date", "value": "11-11-2020"},
      {"key": "appointment_time", "value": "19:00"},
    ]
  }

  it(`Test Send email without any kind of recepients.`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery("sendEmail",withoutRecepientsEmailInput, "subject template"),
      })
      .expect(({ body }) => {
        const errors = body.errors;
        expect(errors[0].message).toBe("No recipients defined");
      })
      .expect(200)
      .end(done);
  });
  

  afterAll(async () => {
    await app.close();
  });
});
