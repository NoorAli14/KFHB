import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {ModuleInput} from '@app/v1/modules/module.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


describe('Module Module (e2e)', () => {
  let app: INestApplication;
  let moduleId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds Module`, done => {
    const input: ModuleInput = {
      name: "E2E-testing",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addModule", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addModule;
        moduleId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  }, 50000);

  it(`updates Module`, done => {
    const input: ModuleInput = {
      name: "E2E-updated",
      status: "ACTIVE"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateModule", input, "id name", moduleId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateModule;
      expect(data.name).toBe("E2E-updated");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Modules`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("modulesList", "id name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.modulesList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`gets Module by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findModuleById", "id name", moduleId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findModuleById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Modules by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "E2E-testing"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findModuleBy", checks, "id name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findModuleBy;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`deletes Module`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteModule", moduleId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteModule;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Module Not Found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findModuleById", "id name", moduleId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Module Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
