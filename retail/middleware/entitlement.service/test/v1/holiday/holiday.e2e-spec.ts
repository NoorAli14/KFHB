import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HolidayInput } from '@app/v1/holiday/holiday.dto';
import {createMutationQuery, createUpdateQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';


describe('Holiday Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds holiday`, done => {
    const input: HolidayInput = {
      description: "Independence Day",
      holiday_date: "2020-08-14",
      remarks: "Approved",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createMutationQuery("addHoliday", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addHoliday;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates holiday`, done => {
    const input: HolidayInput = {
      description: "Independence Day",
      holiday_date: "2020-08-14",
      status: "ACTIVE",
      remarks: "Not-Approved",
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: createUpdateQuery("updateHoliday", input, "42C2754F-20F0-4903-90F9-644CC016EEDE", "id remarks"),
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

  afterAll(async () => {
    await app.close();
  });
});
