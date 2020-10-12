import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {createPayloadObject, getChecksQuery, getDeleteMutation, getMutation, getQuery} from '@common/tests';
import {V1Module} from '@app/v1/v1.module';
import {CheckAvailabilityInput, CreateUserInput, UpdatePasswordInput, UpdateUserInput} from '@app/v1/users/user.dto';
import {KeyValInput} from '@common/inputs/key-val.input';


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
      email:"teste2e@jest.com",
      first_name: "teste2e",
      last_name: "jest",
      status: "ACTIVE",
      password: "something"
    };
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getMutation("addUser", input, "id"),
      }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
      .expect(( {body} ) => {
        const data = body.data.addUser;
        userId = data.id;
        expect(data.id).toBeDefined();
      })
      .expect(200)
      .end(done);
  });

  it(`updates User`, done => {
    const input: UpdateUserInput = {
      email:"test_updated@jest.com",
      last_name: "jest-updated",
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updateUser", input, "id last_name", userId),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.updateUser;
      expect(data.last_name).toBe("jest-updated");
    })
    .expect(200)
    .end(done);
  });

  it(`updates logged-in User's password`, done => {
    const input: UpdatePasswordInput = {
      current_password: "something",
      new_password: "something2"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updatePassword", input, "id last_name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": userId
    })
    .expect(( {body} ) => {
      const data = body.data.updatePassword;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`should return error of Password Mismatch`, done => {
    const input: UpdatePasswordInput = {
      current_password: "something_wrong",
      new_password: "something2"
    };
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getMutation("updatePassword", input, "id last_name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": userId
    })
    .expect(( {body} ) => {
      const [error] = body.errors;
      expect(error.message).toBe("Password Mismatch");
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.usersList;
      expect(data.length).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`lists available agents`, done => {
    const input: CheckAvailabilityInput = {
      call_time: new Date().toISOString(),
      gender: "M"
    };
    const query =
      `query {
      findAvailableAgents (input: ${createPayloadObject(input)}){
       id last_name
      }
    }`;
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: query,
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findAvailableAgents;
      expect(data.length).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.resetInvitationToken;
      expect(data.id).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findUserById;
      expect(data.id).toBeDefined();
    })
    .expect(200)
    .end(done);
  });

  it(`searches Users by properties`, done => {
    const checks: KeyValInput[] = [
      {record_key: "last_name", record_value: "doe"}
    ];
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: getChecksQuery("findUserBy", checks, "id last_name"),
    }).set({
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.findUserBy;
      expect(data.length).toBeDefined();
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
      "x-tenant-id": "58B630C1-B884-43B1-AE17-E7214FDB09F7",
      "x-user-id": "289CB901-C8CB-444A-A0F0-2452019D7E0D"
    })
    .expect(( {body} ) => {
      const data = body.data.deleteUser;
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

  afterAll(async () => {
    await app.close();
  });
});
