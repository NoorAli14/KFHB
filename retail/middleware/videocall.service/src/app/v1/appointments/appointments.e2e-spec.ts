import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewAppointmentInput } from './appointment.dto';
import { createQuery } from '@common/tests/e2e.tests';
import { uuidV4 } from '@common/utilities';

describe('Video Call Module (e2e)', () => {
  let app: INestApplication;

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
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        mutation: createQuery(
          'addAppointment',
          newAppointmentInput,
          'id call_time status',
        ),
      })
      .expect(({ body }) => {
        const data = body.data.addAppointment;
        expect(data.call_time).toBe(newAppointmentInput.call_time);
        expect(data.gender).toBe(newAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  const createAppointmentInput: NewAppointmentInput = {
    call_time: new Date('2020-10-30 12:39:10'),
    gender: 'F',
    status: 'SCHEDULE',
    user_id: uuidV4(),
  };

  it(`mutation create template`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        mutation: createQuery(
          'addAppointment',
          createAppointmentInput,
          'id status gender',
        ),
      })
      .expect(({ body }) => {
        const data = body.data.addAppointment;
        expect(data.status).toBe(createAppointmentInput.status);
        expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  it(`should return appointment based on user Id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointmentByUserId(user_id:"${uuidV4()}"){call_time status gender}}`,
      })
      .expect(({ body }) => {
        const data = body.data.findAppointmentByUserId;
        expect(data.status).toBe(createAppointmentInput.status);
        expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  it(`should return appointment base on appointment Id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findAppointment(user_id:"${uuidV4()}"){call_time status gender}}`,
      })
      .expect(({ body }) => {
        const data = body.data.findAppointment;
        expect(data.status).toBe(createAppointmentInput.status);
        expect(data.gender).toBe(createAppointmentInput.gender);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
