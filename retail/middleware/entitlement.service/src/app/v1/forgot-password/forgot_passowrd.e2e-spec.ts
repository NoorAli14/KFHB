import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {V1Module} from '@app/v1/v1.module';
import {createPayloadObject, getDeleteMutation, getMutation} from '@common/tests';
import {CreateUserInput} from '@app/v1/users/user.dto';
import {ChangePasswordInput, ForgotPasswordInput} from '@app/v1/forgot-password/forgot-password.dto';

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
      email:"forgot_e2e@jest.com",
    };
    const query =
      `query {
      forgotPassword (input: ${createPayloadObject(input)}){
       id password_reset_token
      }
    }`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: query
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.forgotPassword;
        password_reset_token = data.password_reset_token;
        expect(data.id).toBe(userId);
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of User not found`, done => {
    const input: ForgotPasswordInput = {
      email:"dummy@something.com",
    };
    const query =
      `query {
      forgotPassword (input: ${createPayloadObject(input)}){
       id password_reset_token
      }
    }`;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("User Not Found");
    })
    .expect(200)
    .end(done);
  });

  it(`changes password using password_reset_token`, done => {
    const input: ChangePasswordInput = {
      password_reset_token: password_reset_token,
      password: "something_updated"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("changePassword", input, "id email")
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.changePassword;
      expect(data.id).toBe(userId);
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Invalid Invitation Token`, done => {
    const input: ChangePasswordInput = {
      password_reset_token: "some_token",
      password: "something_updated"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("changePassword", input, "id email")
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
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
    email:"forgot_e2e@jest.com",
    first_name: "forgot_e2e",
    last_name: "jest",
    status: "ACTIVE",
    password: "something"
  };
  const res = await request(app.getHttpServer())
  .post('/graphql')
  .send({
    query: getMutation("addUser", input2, "id"),
  }).set({
    "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
    "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
  });
  return res.body.data.addUser.id;
}

async function deleteUser(app: INestApplication, userId: string): Promise<void> {
  await request(app.getHttpServer())
  .post('/graphql')
  .send({
    query: getDeleteMutation("deleteUser", userId),
  }).set({
    "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
    "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
  });
}
