import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import {
  transformAndValidate,
  transformAndValidateSync,
} from 'class-transformer-validator';

import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { NewAttachmentInput } from './attachment.dto';
import { createAttachmantQuery } from '@common/tests/e2e.tests';
import { uuidV4 } from '@common/utilities';
import { ATTACHMENT_QUERY, IMAGE_BASE64 } from '@common/constants';
import { Attachment } from './attachment.model';

describe('Video Call Module (e2e)', () => {
  let attachment: NewAttachmentInput;
  let app: INestApplication;

  const headers: { [key: string]: any } = {
    'x-tenant-id': '9013c327-1190-4875-a92a-83aca9029160',
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

  it('Should transfoem and validate the response based on attachment', async () => {
    attachment = {
      customer_id: headers['x-user-id'],
      attachment_type: 'attachment_type',
      file_content: 'imageBase64',
    } as NewAttachmentInput;

    const transformedResponse: NewAttachmentInput = await transformAndValidate(
      NewAttachmentInput,
      attachment,
    );
    expect(transformedResponse).toBeDefined();
    expect(transformedResponse).toEqual(attachment);
    expect(transformedResponse).toBeInstanceOf(NewAttachmentInput);
  });

  it('should fetch an attachment and validate the response', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
          findAttachment(
            id: "09cba282-e584-49e6-af8b-2307ab9d19c2",
            customer_id: "828605C2-7E50-40BC-AA88-C064CE63C155"
          ){${ATTACHMENT_QUERY}}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.findAttachment;
        const attachmentJson: string = JSON.stringify(data);

        const transformedResponse: Attachment = transformAndValidateSync(
          Attachment,
          attachmentJson,
        ) as Attachment;
        expect(transformedResponse).toBeDefined();
        expect(transformedResponse).toBeInstanceOf(Object);
      })
      .end(done)
      .expect(200);
  });

  it('should attachment throw not found exception', done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `{
          findAttachment(
            id: "828605c2-7e50-9808-aa88-c064ce63c155",
            customer_id: "828605C2-7E50-40BC-A788-C064CE63C155"
          ){${ATTACHMENT_QUERY}}}`,
      })
      .set(headers)
      .expect(({ body }) => {
        const { errors } = body;
        expect(errors).toBeDefined();
        expect(errors).toBeInstanceOf(Array);
        expect(errors[0].message).toEqual('Attachment not found');
      })
      .end(done)
      .expect(200);
  });

  it('should create attachment abd validate the response as well as the request payload', done => {
    attachment = {
      customer_id: uuidV4(),
      attachment_type: 'attachment_type',
      file_content: IMAGE_BASE64,
    } as NewAttachmentInput;

    const newAttachmentJson: string = JSON.stringify(attachment);

    transformAndValidateSync(
      NewAttachmentInput,
      newAttachmentJson,
    ) as NewAttachmentInput;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createAttachmantQuery(
          'addAttachment',
          attachment,
          ATTACHMENT_QUERY,
        ),
      })
      .set(headers)
      .expect(({ body }) => {
        const data = body?.data?.addAttachment;
        const attachmentJson: string = JSON.stringify(data);

        const transformedResponse: Attachment = transformAndValidateSync(
          Attachment,
          attachmentJson,
        ) as Attachment;
        expect(transformedResponse).toBeDefined();
        expect(transformedResponse).toBeInstanceOf(Object);
      })
      .end(done)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
