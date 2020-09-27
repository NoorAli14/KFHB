import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { Swagger } from '@core/providers/swagger.provider';
import { CorsMiddleware } from './cors.middleware';
import { CorrelationMiddleware } from './correlation.middleware';

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
    if (config.CORS.ENABLE) {
      app = CorsMiddleware.init(app, config.CORS.ORIGIN);
    }

    if (config.IS_SWAGGER_ENABLED) {
      app = Swagger.init(app, config);
    }
    return app;
  }
}
