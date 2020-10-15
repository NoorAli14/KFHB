import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {createPayloadObject, getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {CheckAvailabilityInput, CreateUserInput, UpdatePasswordInput, UpdateUserInput} from '@app/v1/users/user.dto';
import {KeyValInput} from '@common/inputs/key-val.input';
import {User} from "@app/v1/users/user.model";


describe('User Module (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`adds User`, done => {
    const input: CreateUserInput = {
      email:"user_e2e_testing@jest.com",
      first_name: "user_e2e_testing",
      last_name: "jest",
      status: "ACTIVE",
      password: "something"
    };
    const input_validated: CreateUserInput = transformAndValidateSync(
        CreateUserInput,
        input,
    ) as CreateUserInput;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addUser", input_validated, "id"),
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const user = body?.data?.addUser;
        userId = user?.id;
        const user_json: string = JSON.stringify(user);
        const user_validated: User = transformAndValidateSync(
            User,
            user_json,
        ) as User;
        expect(user_validated).toBeDefined();
        expect(user_validated).toBeInstanceOf(User);
      })
      .expect(200)
      .end(done);
  });

  it(`updates User`, done => {
    const input: UpdateUserInput = {
      last_name: "jest-updated",
    };
    const input_validated: UpdateUserInput = transformAndValidateSync(
        UpdateUserInput,
        input,
    ) as UpdateUserInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateUser", input_validated, "id last_name", userId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.updateUser;
      expect(user?.last_name).toBe("jest-updated");
      const user_json: string = JSON.stringify(user);
      const user_validated: User = transformAndValidateSync(
          User,
          user_json,
      ) as User;
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(User);
    })
    .expect(200)
    .end(done);
  });

  it(`updates logged-in User's password`, done => {
    const input: UpdatePasswordInput = {
      current_password: "something",
      new_password: "something2"
    };
    const input_validated: UpdatePasswordInput = transformAndValidateSync(
        UpdatePasswordInput,
        input,
    ) as UpdatePasswordInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updatePassword", input_validated, "id last_name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": userId
    })
    .expect(( {body} ) => {
      const user = body?.data?.updatePassword;
      const user_json: string = JSON.stringify(user);
      const user_validated: User = transformAndValidateSync(
          User,
          user_json,
      ) as User;
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(User);
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Password Mismatch`, done => {
    const input: UpdatePasswordInput = {
      current_password: "something_wrong",
      new_password: "something2"
    };
    const input_validated: UpdatePasswordInput = transformAndValidateSync(
        UpdatePasswordInput,
        input,
    ) as UpdatePasswordInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updatePassword", input_validated, "id last_name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": userId
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Password Mismatch");
    })
    .expect(200)
    .end(done);
  });

  it(`lists Users`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("usersList", "id last_name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.usersList;
      expect(user?.length).toBeDefined();
      const user_json: string = JSON.stringify(user);
      const user_validated: User[] = transformAndValidateSync(
          User,
          user_json,
      ) as User[];
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`lists available agents`, done => {
    const input: CheckAvailabilityInput = {
      call_time: new Date().toISOString(),
      gender: "M"
    };
    const input_validated: CheckAvailabilityInput = transformAndValidateSync(
        CheckAvailabilityInput,
        input,
    ) as CheckAvailabilityInput;
    const query =
      `query {
      findAvailableAgents (input: ${createPayloadObject(input_validated)}){
       id last_name
      }
    }`;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query,
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.findAvailableAgents;
      expect(user?.length).toBeDefined();
      const user_json: string = JSON.stringify(user);
      const user_validated: User[] = transformAndValidateSync(
          User,
          user_json,
      ) as User[];
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`resets the invitation_token of User`, done => {
    const query =
      `mutation {
      resetInvitationToken (id: "${userId}"){
       id last_name
      }
    }`;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query,
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.resetInvitationToken;
      const user_json: string = JSON.stringify(user);
      const user_validated: User = transformAndValidateSync(
          User,
          user_json,
      ) as User;
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(User);
    })
    .expect(200)
    .end(done);
  });

  it(`gets User by ID`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findUserById", "id last_name", userId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.findUserById;
      const user_json: string = JSON.stringify(user);
      const user_validated: User = transformAndValidateSync(
          User,
          user_json,
      ) as User;
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(User);
    })
    .expect(200)
    .end(done);
  });

  it(`searches Users by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "last_name", record_value: "jest-updated"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findUserBy", checks, "id last_name"),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const user = body?.data?.findUserBy;
      expect(user?.length).toBeDefined();
      const user_json: string = JSON.stringify(user);
      const user_validated: User[] = transformAndValidateSync(
          User,
          user_json,
      ) as User[];
      expect(user_validated).toBeDefined();
      expect(user_validated).toBeInstanceOf(Array);
    })
    .expect(200)
    .end(done);
  });

  it(`deletes User`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getDeleteMutation("deleteUser", userId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.deleteUser;
      expect(data).toBeTruthy();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of User Not Found`, done => {
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getQuery("findUserById", "id last_name", userId),
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("User Not Found");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
