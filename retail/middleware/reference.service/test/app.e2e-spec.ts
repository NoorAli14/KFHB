import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@app/app.module';

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
    // const router = server._events.request._router;
    // console.log('API:', router);
  });

  it('/GET info', (done) => {
    return request(server)
      .get('/info')
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
