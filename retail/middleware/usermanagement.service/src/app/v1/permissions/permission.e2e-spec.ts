import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { transformAndValidateSync } from 'class-transformer-validator';

import {
  getChecksQuery,
  getDeleteMutation,
  getMutation,
  getQuery,
} from '@common/tests';
import { V1Module } from '@app/v1/v1.module';
import { PermissionInput } from '@app/v1/permissions/permission.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Permission } from '@app/v1/permissions/permission.model';

describe('Permission Module (e2e)', () => {
  let app: INestApplication;
  let permissionId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Permission`, done => {
    const input: PermissionInput = {
      record_type: 'permission_e2e_testing',
    };
    const permission_validated: PermissionInput = transformAndValidateSync(
      PermissionInput,
      input,
    ) as PermissionInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation(
          'addPermission',
          permission_validated,
          'id record_type',
        ),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.addPermission;
        permissionId = data?.id;
        const permission_json: string = JSON.stringify(data);
        const permission_validated: Permission = transformAndValidateSync(
          Permission,
          permission_json,
        ) as Permission;
        expect(permission_validated).toBeDefined();
        expect(permission_validated).toBeInstanceOf(Permission);
      })
      .expect(200)
      .end(done);
  }, 50000);

  it(`updates Permission`, done => {
    const input: PermissionInput = {
      record_type: 'permission_e2e_testing_updated',
    };
    const permission_validated: PermissionInput = transformAndValidateSync(
      PermissionInput,
      input,
    ) as PermissionInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation(
          'updatePermission',
          permission_validated,
          'id record_type',
          permissionId,
        ),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.updatePermission;
        expect(data?.record_type).toBe('permission_e2e_testing_updated');
        const permission_json: string = JSON.stringify(data);
        const permission_validated: Permission = transformAndValidateSync(
          Permission,
          permission_json,
        ) as Permission;
        expect(permission_validated).toBeDefined();
        expect(permission_validated).toBeInstanceOf(Permission);
      })
      .expect(200)
      .end(done);
  });

  it(`lists Permissions`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('permissionsList', 'id record_type'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.permissionsList;
        expect(data?.length).toBeDefined();
        const permission_json: string = JSON.stringify(data);
        const permission_validated: Permission[] = transformAndValidateSync(
          Permission,
          permission_json,
        ) as Permission[];
        expect(permission_validated).toBeDefined();
        expect(permission_validated).toBeInstanceOf(Array);
      })
      .expect(200)
      .end(done);
  });

  it(`gets Permission by ID`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('findPermissionById', 'id record_type', permissionId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.findPermissionById;
        const permission_json: string = JSON.stringify(data);
        const permission_validated: Permission = transformAndValidateSync(
          Permission,
          permission_json,
        ) as Permission;
        expect(permission_validated).toBeDefined();
        expect(permission_validated).toBeInstanceOf(Permission);
      })
      .expect(200)
      .end(done);
  });

  it(`searches Permissions by properties`, done => {
    const checks: KeyValInput[] = [
      {
        record_key: 'record_type',
        record_value: 'permission_e2e_testing_updated',
      },
    ];
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getChecksQuery('findPermissionBy', checks, 'id record_type'),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.findPermissionBy;
        expect(data?.length).toBeDefined();
        const permission_json: string = JSON.stringify(data);
        const permission_validated: Permission[] = transformAndValidateSync(
          Permission,
          permission_json,
        ) as Permission[];
        expect(permission_validated).toBeDefined();
        expect(permission_validated).toBeInstanceOf(Array);
      })
      .expect(200)
      .end(done);
  });

  it(`deletes Permission`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getDeleteMutation('deletePermission', permissionId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const data = body?.data?.deletePermission;
        expect(data).toBeTruthy();
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Permission Not Found`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getQuery('findPermissionById', 'id record_type', permissionId),
      })
      .set({
        'x-tenant-id': process.env.ENV_RBX_E2E_TENANT_ID,
        'x-user-id': process.env.ENV_RBX_E2E_USER_ID,
      })
      .expect(({ body }) => {
        const [error] = body?.errors;
        expect(error?.message).toBe('Permission Not Found');
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
