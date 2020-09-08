import { INestApplication } from '@nestjs/common';
import {
  X_CORRELATION_KEY,
  X_ACCESS_TOKEN,
  X_REFRESH_TOKEN,
} from '@common/constants';

export class CorsMiddleware {
  public static init(
    app: INestApplication,
    origins?: string,
  ): INestApplication {
    const corsOptions = {
      optionsSuccessStatus: 200,
      origin: (origin, callback) => {
        const whitelist = origins.split(',') || [];
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          const msg = `The CORS policy for this site does not allow access from the specified Origin ${origin}.`;
          callback(new Error(msg), false);
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: [
        X_REFRESH_TOKEN,
        X_ACCESS_TOKEN,
        X_CORRELATION_KEY,
        'Set-Cookie',
      ],
    };
    app.enableCors(corsOptions);
    return app;
  }
}
