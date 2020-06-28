import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
function createdocument(
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
  // for (const tag of SWAGGER_CONFIG.tags) {
  //   builder.addTag(tag);
  // }
  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
export function setupSwagger(app: INestApplication): void {
  const config: ConfigurationService = app
    .select(CommonModule)
    .get(ConfigurationService);

  SwaggerModule.setup(config.SWAGGER.ROUTE, app, createdocument(app, config), {
    swaggerUrl: `${config.APPLICATION_HOST}/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
}
