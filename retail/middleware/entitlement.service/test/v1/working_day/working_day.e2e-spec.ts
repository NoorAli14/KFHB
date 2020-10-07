import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {WorkingDayInput} from '@app/v1/working-days/working-day.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


describe('Working-Day Module (e2e)', () => {
  let app: INestApplication;
  let workingDayId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Working-Day`, done => {
    const input: WorkingDayInput = {
      week_day: "MONDAY",
      start_time_local: "0900",
      end_time_local: "1800",
      full_day: 0,
      remarks: "Approved",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addWorkingDay", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F6",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addWorkingDay;
        workingDayId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  }, 500000);

  it(`updates Working-Day`, done => {
    const input: WorkingDayInput = {
      week_day: "MONDAY",
      start_time_local: "0900",
      end_time_local: "1800",
      full_day: 0,
      remarks: "Not-Approved",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateWorkingDay", input, "id remarks", workingDayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F6",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateWorkingDay;
      expect(data.remarks).toBe("Not-Approved");
    })
    .expect(200)
    .end(done);
  }, 500000);

  it(`lists Working-Days`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("workingDaysList", "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F6",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.workingDaysList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  }, 500000);

  it(`gets Working-Day by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findWorkingDayById", "id remarks", workingDayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F6",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findWorkingDayById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  }, 500000);

  it(`searches Working-Days by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "remarks", record_value: "Approved"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findWorkingDayBy", checks, "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findWorkingDayBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  }, 500000);

  it(`deletes Working-Day`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteWorkingDay", workingDayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F6",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteWorkingDay;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  }, 500000);

  afterAll(async () => {
    await app.close();
  });
});
