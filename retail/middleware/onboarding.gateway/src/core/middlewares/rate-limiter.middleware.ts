import * as rateLimit from 'express-rate-limit';
import { INestApplication } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';

export class RateLimiterMiddleware {
  public static init(
    app: INestApplication,
    config: ConfigurationService,
  ): INestApplication {
    app.use(
      rateLimit({
        windowMs: config.RATE_LIMITER.INTERVAL * 60 * 1000, // 15 minutes
        max: config.RATE_LIMITER.MAX_REQUEST, // limit each IP to 100 requests per windowMs
      }),
    );
    return app;
  }
}
