import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {RoleInput} from '@app/v1/roles/role.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


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
      name: "E2E",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addRole", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addRole;
        roleId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates Role`, done => {
    const input: RoleInput = {
      name: "E2E-updated",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateRole", input, "id name", roleId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      console.log("///////////////////update/////////////////");
      console.log(body);
      const data = body.data.updateRole;
      expect(data.name).toBe("E2E-updated");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Roles`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("rolesList", "id name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.rolesList;
      expect(data.length).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      console.log("///////////////////byID/////////////////");
      console.log(body);
      const data = body.data.findRoleById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Roles by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "E2E"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findRoleBy", checks, "id name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      console.log("///////////////////byProps/////////////////");
      console.log(body);
      const data = body.data.findRoleBy;
      expect(data.length).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      console.log("///////////////////delete/////////////////");
      console.log(body);
      const data = body.data.deleteRole;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
