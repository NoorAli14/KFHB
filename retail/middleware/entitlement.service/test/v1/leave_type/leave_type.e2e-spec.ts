import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createMutationQuery } from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';


describe('Leave-Type Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Leave Type`, done => {
    const addLeaveTypeInput: LeaveTypeInput = {
      name: "sick",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createMutationQuery("addLeaveType", addLeaveTypeInput, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addLeaveType;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
