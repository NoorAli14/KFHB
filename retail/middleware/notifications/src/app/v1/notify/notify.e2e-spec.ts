import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app';
import { createQuery } from '@rubix/common/tests/e2e.tests';
import { NotifyInput } from './notify.dto';

describe('Notify', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const notifyInput: NotifyInput = {
    platform: 'ios',
    device_id: '4947-9df4-23a5fcf659',
    token:
      'dr4qn-2yxUhEv6hW6PJ5A3:APA91bG3Y1rVLTmuVlYKxb82P4LUEnYO45dqffuFTouAZSVDsCl05sO0OWNIgZPpubC7lsv8Sf5g9pI6yTuvRd8cMU1UU-z4ZQafH8EIVZxx4xmI0US3TkO2EUl6I6pg2KK8UCUPZUfK',
    message_title: 'AION Digital',
    message_body: ' this sample message is going to send.',
    image_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZELk_VnIIulq0wOTiIXsyhXh0GNXfMInuJg&usqp=CAU',
  };

  it(`Send Push Notification using FCM Token to IOS Device`, done => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createQuery(
          'sendPushNotification',
          notifyInput,
          'platform device_id message_title message_body image_url',
        ),
      })
      .set({
        'x-tenant-id': '2b4bde18-8177-4947-9df4-23a5fcf65973',
        'x-user-id': '2b4bde18-8177-4947-9df4-23a5fcf65973',
      })
      .expect(({ body }) => {
        const data = body.data.sendPushNotification;
        expect(data.platform).toBe(notifyInput.platform);
        expect(data.device_id).toBe(notifyInput.device_id);
        expect(data.message_title).toBe(notifyInput.message_title);
        expect(data.message_body).toBe(notifyInput.message_body);
        expect(data.image_url).toBe(notifyInput.image_url);
      })
      .expect(200)
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
