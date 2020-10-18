import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {transformAndValidateSync} from "class-transformer-validator";

import {V1Module} from '@app/v1/v1.module';
import {createPayloadObject, getDeleteMutation, getMutation} from '@common/tests';
import {CreateUserInput} from '@app/v1/users/user.dto';
import {LoginInput} from '@app/v1/login/login.dto';
import {User} from "@app/v1/users/user.model";

describe('Login Module (e2e)', () => {
  let app: INestApplication;
  let userId: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    userId = await addUser(app);
  });

  it(`tests user login`, done => {
    const input: LoginInput = {
      email:"login_e2e_testing@jest.com",
      password: "something"
    };
    const input_validated: LoginInput = transformAndValidateSync(
        LoginInput,
        input,
    ) as LoginInput;
    const query =
      `query {
      login (input: ${createPayloadObject(input_validated)}){
       id email
      }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: query
      }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
      .expect(( {body} ) => {
        const user = body?.data?.login;
        expect(user?.id).toBe(userId);
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

  it(`should return error of Invalid Email or Password`, done => {
    const input: LoginInput = {
      email:"login_e2e_testing@jest.com",
      password: "wrong_password"
    };
    const input_validated: LoginInput = transformAndValidateSync(
        LoginInput,
        input,
    ) as LoginInput;
    const query =
      `query {
      login (input: ${createPayloadObject(input_validated)}){
       id email
      }
    }`;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body?.errors;
      expect(error?.message).toBe("Invalid Email or Password");
    })
    .expect(200)
    .end(done);
  });

  afterAll(async () => {
    await deleteUser(app, userId);
    await app.close();
  });
});

async function addUser(app: INestApplication): Promise<string> {
  const input2: CreateUserInput = {
    email:"login_e2e_testing@jest.com",
    first_name: "login_e2e_testing",
    last_name: "jest",
    status: "ACTIVE",
    password: "something"
  };
  const res = await request(app.getHttpServer())
  .post('/graphql')
  .send({
    query: getMutation("addUser", input2, "id"),
  }).set({
        "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
        "x-user-id": process.env.ENV_RBX_E2E_USER_ID
  });
  return res?.body?.data?.addUser?.id;
}

async function deleteUser(app: INestApplication, userId: string): Promise<void> {
  await request(app.getHttpServer())
  .post('/graphql')
  .send({
    query: getDeleteMutation("deleteUser", userId),
  }).set({
        "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
        "x-user-id": process.env.ENV_RBX_E2E_USER_ID
  });
}
