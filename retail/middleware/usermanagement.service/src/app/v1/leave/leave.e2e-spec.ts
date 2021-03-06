import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { transformAndValidateSync } from 'class-transformer-validator';

import {
  getChecksQuery,
  getDeleteMutation,
  getListWithPaginationQuery,
  getMutation,
  getQuery,
} from '@common/tests';
import { V1Module } from '@app/v1/v1.module';
import { LeaveInput } from '@app/v1/leave/leave.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { LeaveTypeInput } from '@app/v1/leave_type/leave_type.dto';
import { CreateUserInput } from '@app/v1/users/user.dto';
import { Leave, LeavesWithPagination } from '@app/v1/leave/leave.model';

describe('Leave Module (e2e)', () => {
  let app: INestApplication;
  let leaveId: string;
  let leaveTypeId: string;
  let userId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    leaveTypeId = await addLeaveType(app);
    userId = await addUser(app);
  });

  it(`adds Leave`, done => {
    const input: LeaveInput = {
      start_date: '1970-01-01',
      end_date: '1970-01-01',
      remarks: 'Approved',
      status: 'ACTIVE',
      leave_type_id: leaveTypeId,
      user_id: userId,
    };
    const leave_validated: LeaveInput = transformAndValidateSync(
      LeaveInput,
      input,
    ) as LeaveInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation('addLeave', leave_validated, 'id'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.addLeave;
        leaveId = data?.id;
        const leave_json: string = JSON.stringify(data);
        const leave_validated: Leave = transformAndValidateSync(
          Leave,
          leave_json,
        ) as Leave;
        expect(leave_validated).toBeDefined();
        expect(leave_validated).toBeInstanceOf(Leave);
      })
      .expect(200)
      .end(done);
  });

  it(`updates Leave`, done => {
    const input: LeaveInput = {
      start_date: '1970-01-01',
      end_date: '1970-01-01',
      remarks: 'Not-Approved',
      status: 'ACTIVE',
      leave_type_id: leaveTypeId,
      user_id: userId,
    };
    const leave_validated: LeaveInput = transformAndValidateSync(
      LeaveInput,
      input,
    ) as LeaveInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation(
          'updateLeave',
          leave_validated,
          'id remarks',
          leaveId,
        ),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.updateLeave;
        expect(data?.remarks).toBe('Not-Approved');
        const leave_json: string = JSON.stringify(data);
        const leave_validated: Leave = transformAndValidateSync(
          Leave,
          leave_json,
        ) as Leave;
        expect(leave_validated).toBeDefined();
        expect(leave_validated).toBeInstanceOf(Leave);
      })
      .expect(200)
      .end(done);
  });

  it(`lists Leaves`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getListWithPaginationQuery('leavesList', 'id remarks'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.leavesList;
        const leave_json: string = JSON.stringify(data);
        const leave_validated: LeavesWithPagination = transformAndValidateSync(
          LeavesWithPagination,
          leave_json,
        ) as LeavesWithPagination;
        expect(leave_validated).toBeDefined();
        expect(leave_validated).toBeInstanceOf(LeavesWithPagination);
        expect(leave_validated.data).toBeInstanceOf(Array);
      })
      .expect(200)
      .end(done);
  });

  it(`gets Leave by ID`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('findLeaveById', 'id remarks', leaveId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.findLeaveById;
        const leave_json: string = JSON.stringify(data);
        const leave_validated: Leave = transformAndValidateSync(
          Leave,
          leave_json,
        ) as Leave;
        expect(leave_validated).toBeDefined();
        expect(leave_validated).toBeInstanceOf(Leave);
      })
      .expect(200)
      .end(done);
  });

  it(`searches Leaves by properties`, done => {
    const checks: KeyValInput[] = [
      { record_key: 'remarks', record_value: 'Not-Approved' },
    ];
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getChecksQuery('findLeaveBy', checks, 'id remarks'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.findLeaveBy;
        expect(data?.length).toBeDefined();
        const leave_json: string = JSON.stringify(data);
        const leave_validated: Leave[] = transformAndValidateSync(
          Leave,
          leave_json,
        ) as Leave[];
        expect(leave_validated).toBeDefined();
        expect(leave_validated).toBeInstanceOf(Array);
      })
      .expect(200)
      .end(done);
  });

  it(`deletes Leave`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getDeleteMutation('deleteLeave', leaveId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.deleteLeave;
        expect(data).toBeTruthy();
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Leave Not Found`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('findLeaveById', 'id remarks', leaveId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const [error] = body?.errors;
        expect(error?.message).toBe('Leave Not Found');
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Leave start date should be less than end date`, done => {
    const input: LeaveInput = {
      start_date: '1970-01-02',
      end_date: '1970-01-01',
      remarks: 'Approved',
      status: 'ACTIVE',
      leave_type_id: leaveTypeId,
      user_id: userId,
    };
    const leave_validated: LeaveInput = transformAndValidateSync(
      LeaveInput,
      input,
    ) as LeaveInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation('addLeave', leave_validated, 'id'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const [error] = body?.errors;
        expect(error?.message).toBe(
          'Leave start date should be less than end date',
        );
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Leave Type Not Found`, done => {
    const input: LeaveInput = {
      start_date: '1970-01-01',
      end_date: '1970-01-01',
      remarks: 'Approved',
      status: 'ACTIVE',
      leave_type_id: '58B630C1-B884-43B1-AE17-E7214FDB09F7',
      user_id: userId,
    };
    const leave_validated: LeaveInput = transformAndValidateSync(
      LeaveInput,
      input,
    ) as LeaveInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation('addLeave', leave_validated, 'id'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const [error] = body?.errors;
        expect(error?.message).toBe('Leave Type Not Found');
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of User Not Found`, done => {
    const input: LeaveInput = {
      start_date: '1970-01-01',
      end_date: '1970-01-01',
      remarks: 'Approved',
      status: 'ACTIVE',
      leave_type_id: leaveTypeId,
      user_id: '58B630C1-B884-43B1-AE17-E7214FDB09F7',
    };
    const leave_validated: LeaveInput = transformAndValidateSync(
      LeaveInput,
      input,
    ) as LeaveInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation('addLeave', leave_validated, 'id'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const [error] = body?.errors;
        expect(error?.message).toBe('User Not Found');
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await deleteLeaveType(app, leaveTypeId);
    await deleteUser(app, userId);
    await app.close();
  });
});

async function addLeaveType(app: INestApplication): Promise<string> {
  const input: LeaveTypeInput = {
    name: 'leave_type_e2e_testing',
    status: 'ACTIVE',
  };
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation('addLeaveType', input, 'id'),
    })
    .set({
      'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
      'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
    });
  return res?.body?.data?.addLeaveType?.id;
}

async function addUser(app: INestApplication): Promise<string> {
  const input2: CreateUserInput = {
    email: 'leave_type_e2e_testing@jest.com',
    first_name: 'leave_type_e2e_testing',
    last_name: 'jest',
    status: 'ACTIVE',
    password: 'something',
  };
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation('addUser', input2, 'id'),
    })
    .set({
      'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
      'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
    });
  return res?.body?.data?.addUser?.id;
}

async function deleteUser(
  app: INestApplication,
  userId: string,
): Promise<void> {
  await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation('deleteUser', userId),
    })
    .set({
      'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
      'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
    });
}

async function deleteLeaveType(
  app: INestApplication,
  leaveTypeId: string,
): Promise<void> {
  await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation('deleteLeaveType', leaveTypeId),
    })
    .set({
      'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
      'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
    });
}
