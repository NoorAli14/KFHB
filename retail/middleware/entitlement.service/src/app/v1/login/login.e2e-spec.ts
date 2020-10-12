import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {V1Module} from '@app/v1/v1.module';
import {createPayloadObject, getDeleteMutation, getMutation} from '@common/tests';
import {CreateUserInput} from '@app/v1/users/user.dto';
import {LoginInput} from '@app/v1/login/login.dto';

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
      email:"logine2e@jest.com",
      password: "something"
    };
    const query =
      `query {
      login (input: ${createPayloadObject(input)}){
       id email
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
        const data = body.data.login;
        expect(data.id).toBe(userId);
      })
      .expect(200)
      .end(done);
  });

  it(`should return error of Invalid Email or Password`, done => {
    const input: LoginInput = {
      email:"logine2e@jest.com",
      password: "wrong_password"
    };
    const query =
      `query {
      login (input: ${createPayloadObject(input)}){
       id email
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
      expect(error.message).toBe("Invalid Email or Password");
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
    email:"logine2e@jest.com",
    first_name: "logine2e",
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
