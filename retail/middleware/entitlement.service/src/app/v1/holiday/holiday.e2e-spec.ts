import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import { HolidayInput } from '@app/v1/holiday/holiday.dto';
import {V1Module} from '@app/v1/v1.module';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {KeyValInput} from '@common/inputs/key-val.input';
import {Holiday} from "@app/v1/holiday/holiday.model";

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
      description: "holiday_e2e_testing",
      holiday_date: "1970-01-01",
      remarks: "Approved",
      status: "ACTIVE"
    };
    const holiday_validated: HolidayInput = transformAndValidateSync(
        HolidayInput,
        input,
    ) as HolidayInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addHoliday", holiday_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const data = body?.data?.addHoliday;
        holidayId = data?.id;
        const holiday_json: string = JSON.stringify(data);
        const holiday_validated: Holiday = transformAndValidateSync(
            Holiday,
            holiday_json,
        ) as Holiday;
        expect(holiday_validated).toBeDefined();
        expect(holiday_validated).toBeInstanceOf(Holiday);
      })
      .expect(200)
      .end(done);
  });

  it(`updates Holiday`, done => {
    const input: HolidayInput = {
      description: "holiday_e2e_testing",
      holiday_date: "1970-01-01",
      status: "ACTIVE",
      remarks: "Not-Approved",
    };
    const holiday_validated: HolidayInput = transformAndValidateSync(
        HolidayInput,
        input,
    ) as HolidayInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateHoliday", holiday_validated, "id remarks", holidayId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.updateHoliday;
      expect(data?.remarks).toBe("Not-Approved");
      const holiday_json: string = JSON.stringify(data);
      const holiday_validated: Holiday = transformAndValidateSync(
          Holiday,
          holiday_json,
      ) as Holiday;
      expect(holiday_validated).toBeDefined();
      expect(holiday_validated).toBeInstanceOf(Holiday);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.holidaysList;
      expect(data?.length).toBeDefined();
      const holiday_json: string = JSON.stringify(data);
      const holiday_validated: Holiday[] = transformAndValidateSync(
          Holiday,
          holiday_json,
      ) as Holiday[];
      expect(holiday_validated).toBeDefined();
      expect(holiday_validated).toBeInstanceOf(Array);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findHolidayById;
      const holiday_json: string = JSON.stringify(data);
      const holiday_validated: Holiday = transformAndValidateSync(
          Holiday,
          holiday_json,
      ) as Holiday;
      expect(holiday_validated).toBeDefined();
      expect(holiday_validated).toBeInstanceOf(Holiday);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Holidays by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "remarks", record_value: "Not-Approved"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findHolidayBy", checks, "id remarks"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findHolidayBy;
      expect(data?.length).toBeDefined();
      const holiday_json: string = JSON.stringify(data);
      const holiday_validated: Holiday[] = transformAndValidateSync(
          Holiday,
          holiday_json,
      ) as Holiday[];
      expect(holiday_validated).toBeDefined();
      expect(holiday_validated).toBeInstanceOf(Array);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteHoliday;
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Holiday Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
