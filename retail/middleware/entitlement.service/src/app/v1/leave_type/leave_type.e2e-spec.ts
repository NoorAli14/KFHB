import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';
import {KeyValInput} from '@common/inputs/key-val.input';
import {LeaveType} from "@app/v1/leave_type/leave_type.model";


describe('Leave-Type Module (e2e)', () => {
  let app: INestApplication;
  let leaveTypeId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Leave-Type`, done => {
    const input: LeaveTypeInput = {
      name: "leave_type_e2e_testing",
      status: "ACTIVE"
    };
    const leave_type_validated: LeaveTypeInput = transformAndValidateSync(
        LeaveTypeInput,
        input,
    ) as LeaveTypeInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addLeaveType", leave_type_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const data = body?.data?.addLeaveType;
        leaveTypeId = data?.id;
        const leave_type_json: string = JSON.stringify(data);
        const leave_type_validated: LeaveType = transformAndValidateSync(
            LeaveType,
            leave_type_json,
        ) as LeaveType;
        expect(leave_type_validated).toBeDefined();
        expect(leave_type_validated).toBeInstanceOf(LeaveType);
      })
      .expect(200)
      .end(done);
  });

  it(`updates Leave-Type`, done => {
    const input: LeaveTypeInput = {
      name : 'leave_type_e2e_testing',
      status : 'INACTIVE'
    };
    const leave_type_validated: LeaveTypeInput = transformAndValidateSync(
        LeaveTypeInput,
        input,
    ) as LeaveTypeInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateLeaveType", leave_type_validated, "id status", leaveTypeId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.updateLeaveType;
      expect(data?.status).toBe("INACTIVE");
      const leave_type_json: string = JSON.stringify(data);
      const leave_type_validated: LeaveType = transformAndValidateSync(
          LeaveType,
          leave_type_json,
      ) as LeaveType;
      expect(leave_type_validated).toBeDefined();
      expect(leave_type_validated).toBeInstanceOf(LeaveType);
    })
    .expect(200)
    .end(done);
  });

  it(`lists Leave-Types`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("leaveTypeList", "id name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.leaveTypeList;
      expect(data?.length).toBeDefined();
      const leave_type_json: string = JSON.stringify(data);
      const leave_type_validated: LeaveType[] = transformAndValidateSync(
          LeaveType,
          leave_type_json,
      ) as LeaveType[];
      expect(leave_type_validated).toBeDefined();
      expect(leave_type_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`gets Leave-Type by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findLeaveTypeById", "id name", leaveTypeId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findLeaveTypeById;
      const leave_type_json: string = JSON.stringify(data);
      const leave_type_validated: LeaveType = transformAndValidateSync(
          LeaveType,
          leave_type_json,
      ) as LeaveType;
      expect(leave_type_validated).toBeDefined();
      expect(leave_type_validated).toBeInstanceOf(LeaveType);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Leave-Types by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "leave_type_e2e_testing"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findLeaveTypeBy", checks, "id name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findLeaveTypeBy;
      expect(data?.length).toBeDefined();
      const leave_type_json: string = JSON.stringify(data);
      const leave_type_validated: LeaveType[] = transformAndValidateSync(
          LeaveType,
          leave_type_json,
      ) as LeaveType[];
      expect(leave_type_validated).toBeDefined();
      expect(leave_type_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Leave Type already exists`, done => {
    const input: LeaveTypeInput = {
      name: "leave_type_e2e_testing",
      status: "ACTIVE"
    };
    const leave_type_validated: LeaveTypeInput = transformAndValidateSync(
        LeaveTypeInput,
        input,
    ) as LeaveTypeInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addLeaveType", leave_type_validated, "id"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Leave Type already exists");
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Leave-Type`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteLeaveType", leaveTypeId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteLeaveType;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Leave Type Not Found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findLeaveTypeById", "id name", leaveTypeId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Leave Type Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
