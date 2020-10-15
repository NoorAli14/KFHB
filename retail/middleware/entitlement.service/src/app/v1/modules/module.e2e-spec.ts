import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {ModuleInput} from '@app/v1/modules/module.dto';
import {KeyValInput} from '@common/inputs/key-val.input';
import {Module} from "@app/v1/modules/module.model";


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
      name: "module_e2e_testing",
      status: "ACTIVE"
    };
    const input_validated: ModuleInput = transformAndValidateSync(
        ModuleInput,
        input,
    ) as ModuleInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addModule", input_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const data = body?.data?.addModule;
        moduleId = data?.id;
        const module_json: string = JSON.stringify(data);
        const module_validated: Module = transformAndValidateSync(
            Module,
            module_json,
        ) as Module;
        expect(module_validated).toBeDefined();
        expect(module_validated).toBeInstanceOf(Module);
      })
      .expect(200)
      .end(done);
  }, 50000);

  it(`updates Module`, done => {
    const input: ModuleInput = {
      name: "module_e2e_testing_updated",
      status: "ACTIVE"
    };
    const input_validated: ModuleInput = transformAndValidateSync(
        ModuleInput,
        input,
    ) as ModuleInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateModule", input_validated, "id name", moduleId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.updateModule;
      expect(data?.name).toBe("module_e2e_testing_updated");
      const module_json: string = JSON.stringify(data);
      const module_validated: Module = transformAndValidateSync(
          Module,
          module_json,
      ) as Module;
      expect(module_validated).toBeDefined();
      expect(module_validated).toBeInstanceOf(Module);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.modulesList;
      expect(data?.length).toBeDefined();
      const module_json: string = JSON.stringify(data);
      const module_validated: Module[] = transformAndValidateSync(
          Module,
          module_json,
      ) as Module[];
      expect(module_validated).toBeDefined();
      expect(module_validated).toBeInstanceOf(Array);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findModuleById;
      const module_json: string = JSON.stringify(data);
      const module_validated: Module = transformAndValidateSync(
          Module,
          module_json,
      ) as Module;
      expect(module_validated).toBeDefined();
      expect(module_validated).toBeInstanceOf(Module);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Modules by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "name", record_value: "module_e2e_testing_updated"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findModuleBy", checks, "id name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.findModuleBy;
      expect(data?.length).toBeDefined();
      const module_json: string = JSON.stringify(data);
      const module_validated: Module[] = transformAndValidateSync(
          Module,
          module_json,
      ) as Module[];
      expect(module_validated).toBeDefined();
      expect(module_validated).toBeInstanceOf(Array);
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteModule;
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
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Module Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
