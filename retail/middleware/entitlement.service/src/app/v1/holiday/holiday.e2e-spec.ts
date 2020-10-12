import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HolidayInput } from '@app/v1/holiday/holiday.dto';
import {V1Module} from '@app/v1/v1.module';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {KeyValInput} from '@common/inputs/key-val.input';

describe('Holiday Module (e2e)', () => {
  let app: INestApplication;
  let holidayId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Holiday`, done => {
    const input: HolidayInput = {
      description: "Independence Day",
      holiday_date: "2020-08-14",
      remarks: "Approved",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addHoliday", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addHoliday;
        holidayId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates Holiday`, done => {
    const input: HolidayInput = {
      description: "Independence Day",
      holiday_date: "2020-08-14",
      status: "ACTIVE",
      remarks: "Not-Approved",
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateHoliday", input, "id remarks", holidayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateHoliday;
      expect(data.remarks).toBe("Not-Approved");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Holidays`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("holidaysList", "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.holidaysList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`gets Holiday by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findHolidayById", "id remarks", holidayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findHolidayById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Holidays by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "remarks", record_value: "Approved"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findHolidayBy", checks, "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findHolidayBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Holiday`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteHoliday", holidayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteHoliday;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Holiday Not Found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findHolidayById", "id remarks", holidayId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Holiday Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
