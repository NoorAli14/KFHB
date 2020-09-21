import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { GenerateOTPInput } from './otp.dto';
import { createQuery } from '@rubix/common';

describe('Email', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const smsOTPInput: GenerateOTPInput = {
    user_id: '515032EB-5AF8-40F0-B3ED-6063000294FF',
    delivery_mode: 'mobile',
    mobile_no: '+923217575752',
  };

  const headers: { [key: string]: any } = {
    'x-tenant-id': '2b4bde18-8177-4947-9df4-23a5fcf65973',
    'x-user-id': '2b4bde18-8177-4947-9df4-23a5fcf65973',
  };

  it(`Generate and Send OTP Code on via SMS`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery('generateOtp', smsOTPInput, 'otp_code user_id'),
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.generateOtp;
        expect(data.user_id).toBe(smsOTPInput.user_id);

      })
      .expect(200)
      .end(done);
  });

  // let verifyOTPInput: VerifyOTPInput = {
  //   user_id: user_id,
  //   otp_code: otp_code,
  // };

  // // Verify OTP Code Test Case.

  // it(`Verify Generated OTP`, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: createQuery('verifyOtp', verifyOTPInput, 'status code'),
  //     })
  //     .expect(({ body }) => {
  //       const data = body.data.verifyOtp;
  //       expect(data.status).toBe(200);
  //       expect(data.code).toBe('OTP_VERIFIED');
  //     })
  //     .expect(200)
  //     .end(done);
  // });

  const emailOTPInput: GenerateOTPInput = {
    user_id: '515032EB-5AF8-40F0-B3ED-6063000294FF',
    delivery_mode: 'email',
    email: 'ahmad.raza@virtualforce.io',
  };

  it(`Generate and Send OTP Code on Email Address`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery('generateOtp', emailOTPInput, 'otp_code user_id'),
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.generateOtp;
        expect(data.user_id).toBe(emailOTPInput.user_id);
      })
      .expect(200)
      .end(done);
  });

  const OTPInput: GenerateOTPInput = {
    user_id: '515032EB-5AF8-40F0-B3ED-6063000294FF',
    delivery_mode: 'both',
    email: 'ahmad.raza@virtualforce.io',
    mobile_no: '+923217575752',
  };

  it(`Generate and Send OTP Code on SMS and EMAIL`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery('generateOtp', OTPInput, 'otp_code user_id'),
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.generateOtp;
        expect(data.user_id).toBe(OTPInput.user_id);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
