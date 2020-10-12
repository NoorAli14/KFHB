import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


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
      name: "E2E-testing",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addLeaveType", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addLeaveType;
        leaveTypeId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates Leave-Type`, done => {
    const input: LeaveTypeInput = {
      name : 'E2E-testing',
      status : 'INACTIVE'
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateLeaveType", input, "id status", leaveTypeId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateLeaveType;
      expect(data.status).toBe("INACTIVE");
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.leaveTypeList;
      expect(data.length).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findLeaveTypeById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Leave-Types by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "E2E-testing"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findLeaveTypeBy", checks, "id name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findLeaveTypeBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Leave Type already exists`, done => {
    const input: LeaveTypeInput = {
      name: "E2E-testing",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addLeaveType", input, "id"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Leave Type already exists");
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteLeaveType;
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Leave Type Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
