import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createMutationQuery } from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {LeaveInput} from '@app/v1/leave/leave.dto';


describe('Leave Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds leave`, done => {
    const addLeaveInput: LeaveInput = {
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
        query: createMutationQuery("addLeave", addLeaveInput, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addLeave;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
