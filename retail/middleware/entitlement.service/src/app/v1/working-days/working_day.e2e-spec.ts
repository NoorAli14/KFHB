import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {WorkingDayInput} from '@app/v1/working-days/working-day.dto';
import {KeyValInput} from '@common/inputs/key-val.input';
import {WorkingDay} from "@app/v1/working-days/working-day.model";

describe('Working-Day Module (e2e)', () => {
  let app: INestApplication;
  let workingDayId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
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
    const input_validated: WorkingDayInput = transformAndValidateSync(
        WorkingDayInput,
        input,
    ) as WorkingDayInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addWorkingDay", input_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const working_day = body?.data?.addWorkingDay;
        workingDayId = working_day?.id;
        const working_day_json: string = JSON.stringify(working_day);
        const working_day_validated: WorkingDay = transformAndValidateSync(
            WorkingDay,
            working_day_json,
        ) as WorkingDay;
        expect(working_day_validated).toBeDefined();
        expect(working_day_validated).toBeInstanceOf(WorkingDay);
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Working Day already exists`, done => {
    const input: WorkingDayInput = {
      week_day: "MONDAY",
      start_time_local: "0900",
      end_time_local: "1800",
      full_day: 0,
      remarks: "Approved",
      status: "ACTIVE"
    };
    const input_validated: WorkingDayInput = transformAndValidateSync(
        WorkingDayInput,
        input,
    ) as WorkingDayInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addWorkingDay", input_validated, "id"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Working Day already exists");
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Working Day start time should be less than end time`, done => {
    const input: WorkingDayInput = {
      week_day: "TUESDAY",
      start_time_local: "1800",
      end_time_local: "0900",
      full_day: 0,
      remarks: "Approved",
      status: "ACTIVE"
    };
    const input_validated: WorkingDayInput = transformAndValidateSync(
        WorkingDayInput,
        input,
    ) as WorkingDayInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addWorkingDay", input_validated, "id"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Working Day start time should be less than end time");
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Working Day start-time/end-time should be in range [0000-2359]`, done => {
    const input: WorkingDayInput = {
      week_day: "TUESDAY",
      start_time_local: "0900",
      end_time_local: "2500",
      full_day: 0,
      remarks: "Approved",
      status: "ACTIVE"
    };
    const input_validated: WorkingDayInput = transformAndValidateSync(
        WorkingDayInput,
        input,
    ) as WorkingDayInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addWorkingDay", input_validated, "id"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Working Day start-time/end-time should be in range [0000-2359]");
    })
    .expect(200)
    .end(done);
  });

  it(`updates Working-Day`, done => {
    const input: WorkingDayInput = {
      week_day: "MONDAY",
      start_time_local: "0900",
      end_time_local: "1800",
      full_day: 0,
      remarks: "Not-Approved",
      status: "ACTIVE"
    };
    const input_validated: WorkingDayInput = transformAndValidateSync(
        WorkingDayInput,
        input,
    ) as WorkingDayInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateWorkingDay", input_validated, "id remarks", workingDayId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const working_day = body?.data?.updateWorkingDay;
      expect(working_day?.remarks).toBe("Not-Approved");
      const working_day_json: string = JSON.stringify(working_day);
      const working_day_validated: WorkingDay = transformAndValidateSync(
          WorkingDay,
          working_day_json,
      ) as WorkingDay;
      expect(working_day_validated).toBeDefined();
      expect(working_day_validated).toBeInstanceOf(WorkingDay);
    })
    .expect(200)
    .end(done);
  });

  it(`lists Working-Days`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("workingDaysList", "id remarks"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.workingDaysList;
      expect(data?.length).toBeDefined();
      const working_day_json: string = JSON.stringify(data);
      const working_day_validated: WorkingDay[] = transformAndValidateSync(
          WorkingDay,
          working_day_json,
      ) as WorkingDay[];
      expect(working_day_validated).toBeDefined();
      expect(working_day_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`gets Working-Day by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findWorkingDayById", "id remarks", workingDayId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const working_day = body.data.findWorkingDayById;
      const working_day_json: string = JSON.stringify(working_day);
      const working_day_validated: WorkingDay = transformAndValidateSync(
          WorkingDay,
          working_day_json,
      ) as WorkingDay;
      expect(working_day_validated).toBeDefined();
      expect(working_day_validated).toBeInstanceOf(WorkingDay);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Working-Days by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "remarks", record_value: "Not-Approved"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findWorkingDayBy", checks, "id remarks"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const working_day = body?.data?.findWorkingDayBy;
      expect(working_day?.length).toBeDefined();
      const working_day_json: string = JSON.stringify(working_day);
      const working_day_validated: WorkingDay[] = transformAndValidateSync(
          WorkingDay,
          working_day_json,
      ) as WorkingDay[];
      expect(working_day_validated).toBeDefined();
      expect(working_day_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Working-Day`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteWorkingDay", workingDayId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteWorkingDay;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Working Day Not Found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findWorkingDayById", "id remarks", workingDayId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Working Day Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
