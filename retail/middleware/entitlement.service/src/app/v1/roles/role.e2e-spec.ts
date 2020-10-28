import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {getChecksQuery, getDeleteMutation, getListWithPaginationQuery, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {RoleInput} from '@app/v1/roles/role.dto';
import {KeyValInput} from '@common/inputs/key-val.input';
import {Role, RolesWithPagination} from "@app/v1/roles/role.model";

describe('Role Module (e2e)', () => {
  let app: INestApplication;
  let roleId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Role`, done => {
    const input: RoleInput = {
      name: "role_e2e_testing",
      status: "ACTIVE"
    };
    const input_validated: RoleInput = transformAndValidateSync(
        RoleInput,
        input,
    ) as RoleInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addRole", input_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const data = body?.data?.addRole;
        roleId = data?.id;
        const role_json: string = JSON.stringify(data);
        const role_validated: Role = transformAndValidateSync(
            Role,
            role_json,
        ) as Role;
        expect(role_validated).toBeDefined();
        expect(role_validated).toBeInstanceOf(Role);
      })
      .expect(200)
      .end(done);
  });

  it(`updates Role`, done => {
    const input: RoleInput = {
      name: "role_e2e_testing_updated",
      status: "ACTIVE"
    };
    const input_validated: RoleInput = transformAndValidateSync(
        RoleInput,
        input,
    ) as RoleInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateRole", input_validated, "id name", roleId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.updateRole;
      expect(data?.name).toBe("role_e2e_testing_updated");
      const role_json: string = JSON.stringify(data);
      const role_validated: Role = transformAndValidateSync(
          Role,
          role_json,
      ) as Role;
      expect(role_validated).toBeDefined();
      expect(role_validated).toBeInstanceOf(Role);
    })
    .expect(200)
    .end(done);
  });

  it(`lists Roles`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getListWithPaginationQuery("rolesList", "id name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.rolesList;
      const role_json: string = JSON.stringify(data);
      const role_validated: RolesWithPagination = transformAndValidateSync(
          RolesWithPagination,
          role_json,
      ) as RolesWithPagination;
      expect(role_validated).toBeDefined();
      expect(role_validated).toBeInstanceOf(RolesWithPagination);
      expect(role_validated.data).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`gets Role by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findRoleById", "id name", roleId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findRoleById;
      const role_json: string = JSON.stringify(data);
      const role_validated: Role = transformAndValidateSync(
          Role,
          role_json,
      ) as Role;
      expect(role_validated).toBeDefined();
      expect(role_validated).toBeInstanceOf(Role);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Roles by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "role_e2e_testing_updated"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findRoleBy", checks, "id name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findRoleBy;
      const role_json: string = JSON.stringify(data);
      const role_validated: Role[] = transformAndValidateSync(
          Role,
          role_json,
      ) as Role[];
      expect(role_validated).toBeDefined();
      expect(role_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Role with this name already exists`, done => {
    const input: RoleInput = {
      name: "role_e2e_testing_updated",
      status: "ACTIVE"
    };
    const input_validated: RoleInput = transformAndValidateSync(
        RoleInput,
        input,
    ) as RoleInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("addRole", input_validated, "id"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Role with this name already exists");
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Role`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteRole", roleId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteRole;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Role not found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findRoleById", "id name", roleId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Role not found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
