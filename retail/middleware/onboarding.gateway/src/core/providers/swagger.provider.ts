import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigurationService } from '@common/configuration/configuration.service';
export class Swagger {

  /**
  * Build the Swagger Defination
  * @param app: INestApplication | Express Instance
  * @param config: ConfigurationService | Config service Instance
  * @return Swagger Options
  */
  private static createDocument(
    app: INestApplication,
    config: ConfigurationService,
  ): OpenAPIObject {
    const builder = new DocumentBuilder()
      .setTitle(config.APP.NAME)
      .setDescription(config.APP.DESCRIPTION)
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .setVersion(config.APP.VERSION)
      .setBasePath(config.APP.API_URL_PREFIX);
    const options = builder.build();
    return SwaggerModule.createDocument(app, options);
  }

  /**
  * Initiailize Swagger Instance
  * @param app: INestApplication | Express Instance
  * @param config: ConfigurationService | Config service Instance
  * @return Express Instance
  */
  public static init(
    _app: INestApplication,
    _config: ConfigurationService,
  ): INestApplication {
    SwaggerModule.setup(
      _config.SWAGGER.ROUTE,
      _app,
      Swagger.createDocument(_app, _config),
      {
        swaggerUrl: `${_config.APPLICATION_HOST}/api/docs-json`,
        explorer: true,
        swaggerOptions: {
          docExpansion: 'list',
          filter: true,
          showRequestDuration: true,
        },
      },
    );
    return _app;
  }
}
