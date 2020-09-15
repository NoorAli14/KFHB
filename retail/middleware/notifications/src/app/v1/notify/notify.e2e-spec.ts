import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { NotifyModule } from './notify.module'
import { NotifyService } from './notify.service'
import Server from '@rubix/core/server';

describe('Notify', () => {
  let app: INestApplication;
  const notifyService = { notify: () => 
    [{
        "device_id": "4947-9df4-23a5fcf659",
        "message_title": "AION Digital",
        "message_body": " this sample message is going to send.",
        "image_url":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZELk_VnIIulq0wOTiIXsyhXh0GNXfMInuJg&usqp=CAU"
    }] 
    };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NotifyModule],
    })
      .overrideProvider(NotifyService)
      .useValue(notifyService)
      .compile();

    app = moduleRef.createNestApplication();
    const server = new Server(app);
    await server.init();
  });

  it(`Send Push Notification using FCM Token to IOS Device`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-tenant-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .set('x-user-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .send(`mutation {
        sendPushNotification(
          input: {
            platform: "ios"
            device_id: "4947-9df4-23a5fcf659"
            token: "dr4qn-2yxUhEv6hW6PJ5A3:APA91bG3Y1rVLTmuVlYKxb82P4LUEnYO45dqffuFTouAZSVDsCl05sO0OWNIgZPpubC7lsv8Sf5g9pI6yTuvRd8cMU1UU-z4ZQafH8EIVZxx4xmI0US3TkO2EUl6I6pg2KK8UCUPZUfK"
            message_title: "AION Digital"
            message_body: " this sample message is going to send."
            image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZELk_VnIIulq0wOTiIXsyhXh0GNXfMInuJg&usqp=CAU"
          }
        ) {
          platform
          device_id
          message_title
          message_body
          image_url
        }
      }
      `)
      .expect(200)
        .expect({
            data: notifyService.notify(),
        },)
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });

  it(`Send Push Notification using FCM Token to Android Device`, () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-tenant-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .set('x-user-id', '2b4bde18-8177-4947-9df4-23a5fcf65973')
      .send(`mutation {
        sendPushNotification(
          input: {
            platform: "android"
            device_id: "4947-9df4-23a5fcf659"
            token: "dr4qn-2yxUhEv6hW6PJ5A3:APA91bG3Y1rVLTmuVlYKxb82P4LUEnYO45dqffuFTouAZSVDsCl05sO0OWNIgZPpubC7lsv8Sf5g9pI6yTuvRd8cMU1UU-z4ZQafH8EIVZxx4xmI0US3TkO2EUl6I6pg2KK8UCUPZUfK"
            message_title: "AION Digital"
            message_body: " this sample message is going to send."
            image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZELk_VnIIulq0wOTiIXsyhXh0GNXfMInuJg&usqp=CAU"
          }
        ) {
          id
          platform
          device_id
          message_title
          message_body
          image_url
          created_on
          created_by
        }
      }
      `)
      .expect(200)
        .expect({
            data: notifyService.notify(),
        },)
      .end((err,res) => {
        console.log(res)
        console.log(err)
    })
  });


  afterAll(async () => {
    await app.close();
  });
});