import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SMSModule } from './sms.module';
import { SMSService } from './sms.service';
import Server from '@rubix/core/server';

describe('SMS', () => {
  let app: INestApplication;
  const smsService = { sendSMS: () => [{"to": "03217675129", "body":"this is sample message"}] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SMSModule],
    })
      .overrideProvider(SMSService)
      .useValue(smsService)
      .compile();

    app = moduleRef.createNestApplication();
    const server = new Server(app);
    await server.init();
  });

  it(`Send SMS`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send(`mutation {
        sendSMS(
          input: {
            to: "03217675129"
            body: "this is sample message"
          }
        ) {
          to
          body
        }
      }
      `)
      .expect(200)
        .expect({
            data: smsService.sendSMS(),
        })
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });

  afterAll(async () => {
    await app.close();
  });
});