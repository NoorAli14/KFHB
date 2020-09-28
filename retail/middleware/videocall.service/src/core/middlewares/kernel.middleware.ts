import { NextFunction, Response, Request } from 'express';
import { INestApplication } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { Swagger } from '@core/providers/swagger.provider';
import { RequestContextMiddleware, setContext } from '@core/context';
import { formattedHeader } from '@common/utilities';

export class KernelMiddleware {
  public static init(
    app: INestApplication,
    config: ConfigurationService,
  ): INestApplication {
    if (config.IS_SWAGGER_ENABLED) {
      app = Swagger.init(app, config);
    }

    /** Express.js middleware that is responsible for initializing the context for each request. */
    app.use(RequestContextMiddleware());

    /** Set HttpHeader is Request Context Lifecycle */
    app.use((req: Request, res: Response, next: NextFunction): void => {
      setContext('HttpHeaders', formattedHeader(req));
      next();
    });
    return app;
  }
}
