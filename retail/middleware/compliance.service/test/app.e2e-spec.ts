import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';
import { NewOptionInput } from '@app/v1/options/option.dto';

const options: any[] = [
  {
    name: 'Test Name 1',
    name_ar: 'Test Name',
    question_id: '123-234',
    id: '123-121',
  },
  {
    name: 'Test Name 2',
    name_ar: 'Test Name 2',
    question_id: '123-212',
    id: '123-122',
  },
  {
    name: 'Test Name 3',
    name_ar: 'Test Name 3',
    question_id: '123-233',
    id: '123-123',
  },
];

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/ (GET)', () => {
  //   return request(server)
  //     .get('/')
  //     .expect(404)
  //     .expect(
  //       '{"statusCode":404,"message":"Cannot GET /","error":"Not Found"}',
  //     );
  // });

  describe(gql, () => {
    describe('options', () => {
      it('should get the options array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{optionsList {id name name_ar}}' })
          .expect(200)
          .expect(res => {
            expect(res.body.data.optionsList).toEqual(options);
          });
      });
      describe('one option', () => {
        it('should get a single option', () => {
          return request(app.getHttpServer())
            .post(gql)
            .send({ query: '{findOption(id:"123-121"){id name name_ar}}' })
            .expect(200)
            .expect(res => {
              expect(res.body.data.findOption).toEqual({
                name: 'Test Name 1',
                name_ar: 'Test Name',
                question_id: '123-234',
                id: '123-121',
              });
            });
        });
        it('should get an error for bad id', () => {
          return request(app.getHttpServer())
            .post(gql)
            .send({
              query: '{findOption(id: "500"){id name name_ar}}',
            })
            .expect(200)
            .expect(res => {
              expect(res.body.data).toBe(null);
              // expect(res.body.errors[0].message).toBe(
              //   'No option with id 500 found',
              // );
            });
        });
      });
      // it('should create a new option and have it added to the array', () => {
      //   return (
      //     request(app.getHttpServer())
      //       .post(gql)
      //       .send({
      //         query:
      //           'mutation {insertCat(newCat: { name: "Vanitas", breed: "Calico", age: 100 }) {breed name id age}}',
      //       })
      //       .expect(200)
      //       .expect(res => {
      //         expect(res.body.data.insertCat).toEqual({
      //           name: 'Vanitas',
      //           breed: 'Calico',
      //           age: 100,
      //           id: '4',
      //         });
      //       })
      //       // chain another request to see our original one works as expected
      //       .then(() =>
      //         request(app.getHttpServer())
      //           .post(gql)
      //           .send({ query: '{getCats {id name breed age}}' })
      //           .expect(200)
      //           .expect(res => {
      //             expect(res.body.data.getCats).toEqual(
      //               cats.concat([
      //                 {
      //                   name: 'Vanitas',
      //                   breed: 'Calico',
      //                   age: 100,
      //                   id: '4',
      //                 },
      //               ]),
      //             );
      //           }),
      //       )
      //   );
      // });
    });
  });
});
