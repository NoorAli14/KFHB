import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';

import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewAppointmentInput } from './appointment.dto';
import { createQuery, createQueryObject } from '@common/tests/e2e.tests';
import { uuidV4 } from '@common/utilities';
import {
  APPOINTMENT_QUERY,
  APPOINTMENT_STATUS,
  GENDER,
} from '@common/constants';
import { Appointment } from './appointment.model';

describe('Video Call Module (e2e)', () => {
  let appointment: NewAppointmentInput;
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

  const newAppointmentInput: any = {
    call_time: new Date('2020-10-29 12:39:10'),
    gender: GENDER.MALE,
    user_id: uuidV4(),
  };

  it('should successfully transform and validate the appointment response', async () => {
    appointment = {
      call_time: new Date(),
      gender: GENDER.MALE,
      status: APPOINTMENT_STATUS.SCHEDULED,
      user_id: '828605C2-7E50-40BC-AA88-C064CE63C155',
    } as NewAppointmentInput;

    const transformedResponse: NewAppointmentInput = await transformAndValidate(
      NewAppointmentInput,
      appointment,
    );
    expect(transformedResponse).toBeDefined();
    expect(transformedResponse.gender).toEqual(GENDER.MALE);
    expect(transformedResponse).toBeInstanceOf(NewAppointmentInput);
  });

  it('should successfully transform and validate appointment', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointmentByUserId(user_id: "7d55a5db-739a-4b80-bd37-d3d30358d655"){${APPOINTMENT_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findAppointmentByUserId;
        if (data) {
          const appointmentJson: string = JSON.stringify(data);

          const transformedResponse: Appointment = (await transformAndValidate(
            Appointment,
            appointmentJson,
          )) as Appointment;
          expect(transformedResponse).toBeDefined();
          expect(transformedResponse).toBeInstanceOf(Object);
          expect(
            transformedResponse.user_id ===
              '7d55a5db-739a-4b80-bd37-d3d30358d655',
          ).toBeTruthy();
        } else {
          expect(data).toBeUndefined();
        }
      })
      .end(done)
      .expect(200);
  });

  it('should successfully transform and validate appointment [appointment id]', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointment(appointment_id: "1b9ed674-7afe-4664-ab8d-50f9de74062a"){${APPOINTMENT_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findAppointment;
        if (data) {
          const appointmentJson: string = JSON.stringify(data);

          const transformedResponse: Appointment = (await transformAndValidate(
            Appointment,
            appointmentJson,
          )) as Appointment;
          expect(transformedResponse).toBeDefined();
          expect(transformedResponse).toBeInstanceOf(Object);
          expect(
            transformedResponse.id === '1b9ed674-7afe-4664-ab8d-50f9de74062a',
          ).toBeTruthy();
        } else {
          expect(data).toBeUndefined();
        }
      })
      .end(done)
      .expect(200);
  });

  // it('should create and return appoinment object', done => {
  //   appointment = {
  //     call_time: new Date(),
  //     gender: 'M',
  //     status: APPOINTMENT_STATUS.SCHEDULED,
  //     user_id: '828605C2-7E50-40BC-AA88-C064CE63C155',
  //   } as NewAppointmentInput;

  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: createQuery(
  //         'addAppointment',
  //         appointment,
  //         'id call_time gender status created_on created_by updated_by updated_by',
  //       ),
  //     })
  //     .set(headers)
  //     .expect(async ({ body }) => {
  //       console.log(body.errors, '-=-=-=-=-=-=-');
  //       const data = body?.data?.addAppointment;
  //       if (data) {
  //         const appointmentJson: string = JSON.stringify(data);

  //         const transformedResponse: Appointment = (await transformAndValidate(
  //           Appointment,
  //           appointmentJson,
  //         )) as Appointment;
  //         expect(transformedResponse).toBeDefined();
  //         expect(transformedResponse).toBeInstanceOf(Object);
  //         expect(
  //           transformedResponse.status === appointment.status,
  //         ).toBeTruthy();
  //       } else {
  //         expect(data).toBeUndefined();
  //       }
  //     })
  //     .end(done)
  //     .expect(200);
  // });

  // it(`create/schedule an appointment`, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: createQuery(
  //         'addAppointment',
  //         newAppointmentInput,
  //         'id call_time gender status created_on created_by updated_by updated_by',
  //       ),
  //     })
  //     .set(headers)
  //     .expect(({ body, ...rest }) => {
  //       // console.log(body, '-=-=- create/schedule an appointment -=-=-', rest);
  //       const data = body.data.addAppointment;
  //       expect(data.call_time).toBe(newAppointmentInput.call_time);
  //       expect(data.gender).toBe(newAppointmentInput.gender);
  //     })
  //     .expect(200)
  //     .end(done);
  // });

  const createAppointmentInput: NewAppointmentInput = {
    call_time: new Date('2020-10-30 12:39:10'),
    gender: 'M',
    status: 'SCHEDULED',
    user_id: uuidV4(),
  };

  // it(`mutation create appointment`, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       mutation: createQuery(
  //         'addAppointment',
  //         createAppointmentInput,
  //         'id status gender',
  //       ),
  //     })
  //     .set(headers)
  //     .expect(({ body, ...rest }) => {
  //       // console.log(body, '-=-=- mutation create appointment -=-=-', rest);
  //       const data = body.data.addAppointment;
  //       expect(data.status).toBe(createAppointmentInput.status);
  //       // expect(data.gender).toBe(createAppointmentInput.gender);
  //     })
  //     .expect(200)
  //     .end(done);
  // });

  // it(`should return appointment based on user Id`, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `{findAppointmentByUserId(user_id:"7d55a5db-739a-4b80-bd37-d3d30358d655"){call_time status gender}}`,
  //     })
  //     .set(headers)
  //     .expect(({ body }) => {
  //       const data = body.data.findAppointmentByUserId;
  //       expect(data.status).toBe(createAppointmentInput.status);
  //       // expect(data.gender).toBe(createAppointmentInput.gender);
  //     })
  //     .expect(200)
  //     .end(done);
  // });

  // it(`should return appointment base on appointment Id`, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `{findAppointment(appointment_id:"e9110879-52fd-4fbe-b02d-5c1d8dec0a5b"){call_time status gender}}`,
  //     })
  //     .set(headers)
  //     .expect(({ body }) => {
  //       const data = body.data.findAppointment;
  //       expect(data.status).toBe(createAppointmentInput.status);
  //       expect(data.gender).toBe(createAppointmentInput.gender);
  //     })
  //     .expect(200)
  //     .end(done);
  // });

  // it(`should return error, appointment not found `, done => {
  //   return request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({
  //       query: `{findAppointment(user_id:"d071a9a3-70af-4ade-a741-04c90f7bb760"){call_time status gender}}`,
  //     })
  //     .set(headers)
  //     .expect(400)
  //     .end(done);
  // });

  afterAll(async () => {
    await app.close();
  });
});
