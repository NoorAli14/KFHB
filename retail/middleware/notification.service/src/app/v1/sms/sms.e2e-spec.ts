import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { SendSMSInput } from './sms.dto';
import { createQuery } from '@rubix/common';

describe('SMS', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const sendSMSInput: SendSMSInput = {
    to: "+923217675129",
    body: "this is sample message",
  };

  it(`Send SMS`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery(
          'sendSMS',
          sendSMSInput,
          'to body',
        ),
      })
      .expect(({ body }) => {
        const data = body.data.sendSMS;
        expect(data.to).toBe(sendSMSInput.to);
        expect(data.body).toBe(sendSMSInput.body);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});