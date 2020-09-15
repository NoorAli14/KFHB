import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EmailModule } from './email.module';
import { EmailService } from './email.service';
import Server from '@rubix/core/server';

describe('Email', () => {
  let app: INestApplication;
  const emailService = { sendEmail: () => [{"to": "ahmad.raza@virtualforce.io"}] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EmailModule],
    })
      .overrideProvider(EmailService)
      .useValue(emailService)
      .compile();

    app = moduleRef.createNestApplication();
    const server = new Server(app);
    await server.init();
  });

  it(`Send Email with Template`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send(`mutation {
        sendEmail(
          input: {
            to: "ahmad.raza@virtualforce.io"
            template: "sample"
            subject: "Congratulations for new Role Ahmad"
            body: ""
            context: [
              { key: "title", value: "SAMPLETITLE" }
              {key: "name", value: "Ahmad"}
              {key: "body", value: "Hello Ahmad, hope this mail will find you in a good health"}
            ]
          }
        ) {
          to
        }
      }`)
      .expect(200)
        .expect({
            data: emailService.sendEmail(),
        })
      .end((err,res) => {
        console.log("-----------------------------------------------")
        console.log("-----------------------------------------------")
        console.log("-----------------------------------------------")
        console.log("-----------------------------------------------")
        console.log("-----------------------------------------------")
        console.log(res)
        console.log(err)
    })
  });

  it(`Send Email without Template`, () => {
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    console.log("-----------------------------------------------")
    return request(app.getHttpServer())
      .post('/graphql')
      .send(`mutation {
        sendEmail(
          input: {
            to: "ahmad.raza@virtualforce.io"
            template: "default"
            subject: "This is sample subject from testcases."
            body: "<p>This Sample message is going to deliver.</p>"
          }
        ) {
          to
        }
      }`)
      .expect(200)
        .expect({
            data: emailService.sendEmail(),
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