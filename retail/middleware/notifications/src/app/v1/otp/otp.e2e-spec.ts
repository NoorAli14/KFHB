import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { OtpModule } from './otp.module';
import { OtpService } from './otp.service';
import Server from '@rubix/core/server';

describe('Email', () => {
  let app: INestApplication;
  const otpService = { sendOtp: () => [{"user_id": "515032eb-5af8-40f0-b3ed-6063000294ff"}] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [OtpModule],
    })
      .overrideProvider(OtpService)
      .useValue(otpService)
      .compile();

    app = moduleRef.createNestApplication();
    const server = new Server(app);
    await server.init();
  });

  it(`Generate and Send OTP Code on via SMS and Email`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-tenant-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .set('x-user-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .send(`mutation {
        generateOtp(
          input: {
            user_id: "515032eb-5af8-40f0-b3ed-6063000294ff"
            delivery_mode: "both"
            mobile_no:"+923217575752"
            email:"ahmad.raza@virtualforce.io"
          }
        ) {
          otp_code
          user_id,
          id
        }
      }
      `)
      .expect(200)
        .expect({
            data: otpService.sendOtp(),
        },)
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });

  it(`Generate and Send OTP Code Via Email Only`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-tenant-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .set('x-user-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .send(`mutation {
        generateOtp(
          input: {
            user_id: "515032eb-5af8-40f0-b3ed-6063000294ff"
            delivery_mode: "email"
            email:"ahmad.raza@virtualforce.io"
          }
        ) {
          otp_code
          user_id,
          id
        }
      }
      `)
      .expect(200)
        .expect({
            data: otpService.sendOtp(),
        },)
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });

  it(`Generate and Send OTP Code Via SMS Only`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-tenant-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .set('x-user-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .send(`mutation {
        generateOtp(
          input: {
            user_id: "515032eb-5af8-40f0-b3ed-6063000294ff"
            delivery_mode: "mobile"
            mobile_no:"+923217575752"
          }
        ) {
          otp_code
          user_id,
          id
        }
      }
      `)
      .expect(200)
        .expect({
            data: otpService.sendOtp(),
        },)
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });

  // Verify OTP Code Test Case.

  afterAll(async () => {
    await app.close();
  });
});