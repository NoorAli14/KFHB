import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';

describe('Compliance Module (e2e)', () => {
  let app: INestApplication;

  const headers: { [key: string]: any } = {
    'x-tenant-id': '9013C327-1190-4875-A92A-83ACA9029160',
    'x-user-id': '828605C2-7E50-40BC-AA88-C064CE63C155',
    'x-correlation-id': '7D55A5DB-739A-4B80-BD37-D3D30358D655',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const sections: any[] = [
    {
      name: 'Template 3 Section 1',
      name_ar: 'Template 1 Section 2',
      status: 'ACTIVE',
      level: 'level 1',
      template_id: '123-121',
      id: '123-121',
    },
    {
      name: 'Test Section 2',
      name_ar: 'Test Section 2',
      status: 'ACTIVE',
      level: 'level 2',
      template_id: '123-122',
      id: '123-122',
    },
    {
      name: 'Test Section 3',
      name_ar: 'Test Section 3',
      status: 'ACTIVE',
      level: 'level 2',
      template_id: '123-123',
      id: '123-123',
    },
  ];

  const sectionInput: any = {
    name: 'Template 3 Section 1',
    name_ar: 'Template 1 Section 2',
    status: 'ACTIVE',
    level: 'level 1',
    template_id: '123-121',
    id: '123-121',
  };

  it(`Should fetch list of sections`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{sectionsList{name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.sectionsList;
        expect(data[0].name).toBe(sectionInput.name);
        expect(data[0].status).toBe(sectionInput.status);
      })
      .expect(200)
      .end(done);
  });

  it(`Should return single section base on section id`, done => {
    return request(app.getHttpServer())
      .post('/graphql')

      .send({
        query: `{findSection(id: "d2d409a9-8cf3-439f-a4d0-2361dd59cd98") {name name_ar status}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body.data.findSection;
        expect(data.name).toBe(sectionInput.name);
        expect(data.name_ar).toBe(sectionInput.name_ar);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
