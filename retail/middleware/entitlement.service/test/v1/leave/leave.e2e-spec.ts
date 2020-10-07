import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {LeaveInput} from '@app/v1/leave/leave.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


describe('Leave Module (e2e)', () => {
  let app: INestApplication;
  let leaveId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Leave`, done => {
    const input: LeaveInput = {
      start_date:"2020-10-06",
      end_date:"2020-10-06",
      remarks:"Approved",
      status:"ACTIVE",
      leave_type_id:"8E1A07CD-44BC-4008-B7C7-13F1032FC57D",
      user_id:"A2429C7C-E776-4661-B978-F0430EAAF26C"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addLeave", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addLeave;
        leaveId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates Leave`, done => {
    const input: LeaveInput = {
      start_date:"2020-10-06",
      end_date:"2020-10-06",
      remarks:"Not-Approved",
      status:"ACTIVE",
      leave_type_id:"8E1A07CD-44BC-4008-B7C7-13F1032FC57D",
      user_id:"A2429C7C-E776-4661-B978-F0430EAAF26C"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateLeave", input, "id remarks", leaveId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateLeave;
      expect(data.remarks).toBe("Not-Approved");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Leaves`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("leavesList", "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.leavesList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`gets Leave by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findLeaveById", "id remarks", leaveId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findLeaveById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Leaves by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "remarks", record_value: "Approved"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findLeaveBy", checks, "id remarks"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findLeaveBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Leave`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteLeave", leaveId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteLeave;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
