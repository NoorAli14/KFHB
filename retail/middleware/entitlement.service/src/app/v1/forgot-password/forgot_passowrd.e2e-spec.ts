import * as request from 'supertest';
import {transformAndValidateSync} from "class-transformer-validator";
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import {V1Module} from '@app/v1/v1.module';
import {createPayloadObject, getDeleteMutation, getMutation} from '@common/tests';
import {CreateUserInput} from '@app/v1/users/user.dto';
import {ChangePasswordInput, ForgotPasswordInput} from '@app/v1/forgot-password/forgot-password.dto';
import {User} from "@app/v1/users/user.model";

describe('Forgot-Password Module (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let password_reset_token: string;

  beforeAll(async () => {
    jest.setTimeout(500000);
    const moduleRef = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    userId = await addUser(app);
  });

  it(`requests for password_reset_token`, done => {
    const input: ForgotPasswordInput = {
      email:"forgot_password_e2e_testing@jest.com",
    };
    const input_validated: ForgotPasswordInput = transformAndValidateSync(
        ForgotPasswordInput,
        input,
    ) as ForgotPasswordInput;
    const query =
      `query {
      forgotPassword (input: ${createPayloadObject(input_validated)}){
       id password_reset_token
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
        const user = body?.data?.forgotPassword;
        password_reset_token = user?.password_reset_token;
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

  it(`should return error of User not found`, done => {
    const input: ForgotPasswordInput = {
      email:"temp_e2e_testing@jest.com",
    };
    const input_validated: ForgotPasswordInput = transformAndValidateSync(
        ForgotPasswordInput,
        input,
    ) as ForgotPasswordInput;
    const query =
      `query {
      forgotPassword (input: ${createPayloadObject(input_validated)}){
       id password_reset_token
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
      expect(error?.message).toBe("User Not Found");
    })
    .expect(200)
    .end(done);
  });

  it(`changes password using password_reset_token`, done => {
    const input: ChangePasswordInput = {
      password_reset_token: password_reset_token,
      password: "something_updated"
    };
    const input_validated: ChangePasswordInput = transformAndValidateSync(
        ChangePasswordInput,
        input,
    ) as ChangePasswordInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("changePassword", input_validated, "id email")
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const data = body?.data?.changePassword;
      const user_json: string = JSON.stringify(data);
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

  it(`should return error of Invalid Invitation Token`, done => {
    const input: ChangePasswordInput = {
      password_reset_token: "some_token",
      password: "something_updated"
    };
    const input_validated: ChangePasswordInput = transformAndValidateSync(
        ChangePasswordInput,
        input,
    ) as ChangePasswordInput;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("changePassword", input_validated, "id email")
    }).set({
          "x-tenant-id": process.env.ENV_RBX_E2E_TENANT_ID,
          "x-user-id": process.env.ENV_RBX_E2E_USER_ID
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Invalid/Expired Invitation Token");
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
    email:"forgot_password_e2e_testing@jest.com",
    first_name: "forgot_password_e2e_testing",
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
