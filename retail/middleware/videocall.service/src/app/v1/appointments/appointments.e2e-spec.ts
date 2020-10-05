import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewAppointmentInput } from './appointment.dto';
import { createQuery, createQueryObject } from '@common/tests/e2e.tests';
import { uuidV4 } from '@common/utilities';

describe('Video Call Module (e2e)', () => {
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
    gender: 'M',
    user_id: uuidV4(),
  };

  it(`create/schedule an appointment`, done => {
    return (
      request(app.getHttpServer())
        .post('/graphql')
        // .send({
        //   mutation: createQuery(
        //     'addAppointment',
        //     newAppointmentInput,
        //     'id call_time status',
        //   ),
        // })
        .send({
          mutation: `{addAppointment(appointment: ${createQueryObject(
            newAppointmentInput,
          )}){call_time status gender}}`,
        })
        .set(headers)
        .expect(({ body, ...rest }) => {
          // console.log(body, '-=-=- create/schedule an appointment -=-=-', rest);
          const data = body.data.addAppointment;
          expect(data.call_time).toBe(newAppointmentInput.call_time);
          expect(data.gender).toBe(newAppointmentInput.gender);
        })
        .expect(200)
        .end(done)
    );
  });

  const createAppointmentInput: NewAppointmentInput = {
    call_time: new Date('2020-10-30 12:39:10'),
    gender: 'M',
    status: 'SCHEDULED',
    user_id: uuidV4(),
  };

  it(`mutation create appointment`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        mutation: createQuery(
          'addAppointment',
          createAppointmentInput,
          'id status gender',
        ),
      })
      .set(headers)
      .expect(({ body, ...rest }) => {
        // console.log(body, '-=-=- mutation create appointment -=-=-', rest);
        const data = body.data.addAppointment;
        expect(data.status).toBe(createAppointmentInput.status);
        // expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  it(`should return appointment based on user Id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointmentByUserId(user_id:"7d55a5db-739a-4b80-bd37-d3d30358d655"){call_time status gender}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findAppointmentByUserId;
        expect(data.status).toBe(createAppointmentInput.status);
        // expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  it(`should return appointment base on appointment Id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointment(appointment_id:"e9110879-52fd-4fbe-b02d-5c1d8dec0a5b"){call_time status gender}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findAppointment;
        expect(data.status).toBe(createAppointmentInput.status);
        expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  it(`should return error, appointment not found `, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointment(user_id:"d071a9a3-70af-4ade-a741-04c90f7bb760"){call_time status gender}}`,
      })
      .set(headers)
      .expect(400)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
