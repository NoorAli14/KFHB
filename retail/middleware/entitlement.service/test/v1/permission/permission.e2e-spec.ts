import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {PermissionInput} from '@app/v1/permissions/permission.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


describe('Permission Module (e2e)', () => {
  let app: INestApplication;
  let permissionId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Permission`, done => {
    const input: PermissionInput = {
      record_type: "E2E"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addPermission", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addPermission;
        permissionId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  }, 50000);

  it(`updates Permission`, done => {
    const input: PermissionInput = {
      record_type: "E2E-updated"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updatePermission", input, "id record_type", permissionId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updatePermission;
      expect(data.record_type).toBe("E2E-updated");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Permissions`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("permissionsList", "id record_type"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.permissionsList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`gets Permission by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findPermissionById", "id record_type", permissionId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findPermissionById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Permissions by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "record_type", record_value: "E2E"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findPermissionBy", checks, "id record_type"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findPermissionBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Permission`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deletePermission", permissionId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deletePermission;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
