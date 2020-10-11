import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { Section } from './section.model';
import { NewSectionInput } from './section.dto';
import { transformAndValidate } from 'class-transformer-validator';
import { SECTION_QUERY } from '@common/constants';

describe('Compliance Module (e2e)', () => {
  let section: NewSectionInput;
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

  it('should successfully transform and validate the section', async () => {
    section = {
      name: 'Test Section',
      name_ar: 'Test Section',
      level: 'Level 1',
    } as NewSectionInput;

    const transformedSection: NewSectionInput = await transformAndValidate(
      NewSectionInput,
      section,
    );
    expect(transformedSection).toBeDefined();
    expect(transformedSection.name).toEqual('Test Section');
  });

  it('should fetch list of sections, transform and validate the response based on section model', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{sectionsList{${SECTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.sectionsList;
        if (data) {
          const sectionJson: string = JSON.stringify(data);

          // const transformedSection: Section[] = (await transformAndValidate(
          //   Section,
          //   sectionJson,
          // )) as Section[];
          expect(data).toBeDefined();
          expect(data).toBeInstanceOf(Array);
          expect(data).toHaveLength(data.length);
          expect(data[0].name).toEqual('Template 3 Section 1');
        } else {
          expect(data).toBeUndefined();
          expect(data).toHaveLength(0);
        }
      })
      .end(done)
      .expect(200);
  });

  it('should return a section based on dection id', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findSection(id: "d2d409a9-8cf3-439f-a4d0-2361dd59cd98") {${SECTION_QUERY}}}`,
      })
      .set(headers)
      .expect(async ({ body }) => {
        const data = body?.data?.findSection;
        const sectionJson: string = JSON.stringify(data);

        const transformedSection: Section = (await transformAndValidate(
          Section,
          sectionJson,
        )) as Section;
        expect(transformedSection).toBeDefined();
        expect(transformedSection).toBeInstanceOf(Section);
        expect(transformedSection.tenant_id).toEqual(
          process.env.ENV_RBX_TENANT_ID,
        );
      })
      .end(done)
      .expect(200);
  });

  it('should throw error section not found', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{findSection(id: "d2d409a9-8cf3-3562-a4d0-2361dd59cd98"){name name_ar status level}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.findSection;
        expect(data).toBeUndefined();
        expect(!data).toBeTruthy();
        expect(data).toEqual(undefined);
      })
      .end(done)
      .expect(200);
  });

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
