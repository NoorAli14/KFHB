import { INestApplication } from '@nestjs/common';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { Swagger } from '@core/providers/swagger.provider';

export class KernelMiddleware {
  public static init(
    _app: INestApplication,
    _config: ConfigurationService,
  ): INestApplication {
    if (_config.IS_SWAGGER_ENABLED) {
      _app = Swagger.init(_app, _config);
    }
    return _app;
  }
}
