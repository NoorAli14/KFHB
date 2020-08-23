import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
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
    /*
     * Middleware: Bind the correlation Id with the request and response header.
     */
    app.use(CorrelationMiddleware());

    /*
     * Middleware: Helmet is a collection of 11 smaller middleware functions that set HTTP response headers.
     */
    app.use(helmet());

    /*
     * Middleware: Compress response bodies for all request
     */
    app.use(compression());

    /*
     * Middleware: protect against HTTP Parameter Pollution attacks
     */
    app.use(hpp());

    /*
     * Middleware: protect against cross-origin HTTP requests.
     */
    console.log(`CORS: ${JSON.stringify(config.CORS, null, 2)}`);
    if (config.CORS.ENABLE) {
      app = CorsMiddleware.init(app, config.CORS.ORIGIN);
    }

    /*
     * Middleware: Server OPEN API Swagger Documentation
     */
    if (config.SWAGGER.ENABLE) {
      app = Swagger.init(app, config);
    }

    /*
     * Middleware: Use to limit repeated requests to public APIs and/or endpoints.
     */
    if (config.RATE_LIMITER.ENABLE) {
      app = RateLimiterMiddleware.init(app, config);
    }

    return app;
  }
}
