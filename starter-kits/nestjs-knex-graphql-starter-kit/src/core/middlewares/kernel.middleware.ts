import { INestApplication } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { Swagger } from '@core/providers/swagger.provider';

export class KernelMiddleware {
  public static init(
    app: INestApplication,
    config: ConfigurationService,
  ): INestApplication {
    if (config.IS_SWAGGER_ENABLED) {
      app = Swagger.init(app, config);
    }
    return app;
  }
}
