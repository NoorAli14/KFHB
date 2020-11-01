import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigurationService, X_ACCESS_TOKEN, X_TENANT_ID, X_CHANNEL_KEY } from '@common/index';
export class Swagger {
  /**
   * Build the Swagger Defination
   * @param app: INestApplication | Express Instance
   * @param config: ConfigurationService | Config service Instance
   * @return Swagger Options
   */
  private static createDocument(app: INestApplication, config: ConfigurationService): OpenAPIObject {
    const builder = new DocumentBuilder()
      .setTitle(config.APP.NAME)
      .setDescription(config.APP.DESCRIPTION)
      .setVersion(config.APP.VERSION)
      .addServer(`/${config.APP.API_URL_PREFIX}`)
      .addApiKey({ type: 'apiKey', in: 'header', name: X_ACCESS_TOKEN }, X_ACCESS_TOKEN)
      .addApiKey({ type: 'apiKey', in: 'header', name: X_CHANNEL_KEY }, X_CHANNEL_KEY)
      .addApiKey({ type: 'apiKey', in: 'header', name: X_TENANT_ID }, X_TENANT_ID);
    const options = builder.build();
    return SwaggerModule.createDocument(app, options);
  }

  /**
   * Initiailize Swagger Instance
   * @param app: INestApplication | Express Instance
   * @param config: ConfigurationService | Config service Instance
   * @return Express Instance
   */
  public static init(_app: INestApplication, _config: ConfigurationService): INestApplication {
    const documentation: OpenAPIObject = Swagger.createDocument(_app, _config);
    SwaggerModule.setup(_config.SWAGGER.ROUTE, _app, documentation, {
      swaggerUrl: `${_config.APPLICATION_HOST}/api/docs-json`,
      explorer: true,
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
      },
    });
    return _app;
  }
}
