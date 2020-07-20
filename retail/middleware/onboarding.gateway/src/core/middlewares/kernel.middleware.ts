import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { Swagger } from '@core/providers/swagger.provider';
import { RateLimiterMiddleware } from './rate-limiter.middleware';
import { CorrelationMiddleware } from './correlation.middleware';
import { CorsMiddleware } from './cors.middleware';
export class KernelMiddleware {
  public static init(
    app: INestApplication,
    config: ConfigurationService,
  ): INestApplication {
    app.use(CorrelationMiddleware());
    app.use(helmet());
    app.use(compression());
    if (config.CORS.ENABLE) {
      app = CorsMiddleware.init(app, config.CORS.ORIGIN);
    }
    if (config.SWAGGER.ENABLE) {
      app = Swagger.init(app, config);
    }

    if (config.RATE_LIMITER.ENABLE) {
      app = RateLimiterMiddleware.init(app, config);
    }

    return app;
  }
}
