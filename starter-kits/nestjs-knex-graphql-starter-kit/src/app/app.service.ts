import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';

@Injectable()
export class AppService {
  getInfo(configService: ConfigurationService): Record<string, any> {
    const links = {
      links: {},
    };
    links.links[
      'health'
    ] = `${configService.APPLICATION_HOST}/${configService.APP.API_URL_PREFIX}/health`;
    if (configService.SWAGGER.ENABLE) {
      links.links[
        'swagger'
      ] = `${configService.APPLICATION_HOST}${configService.SWAGGER.ROUTE}`;
    }
    if (configService.GRAPHQL.PLAYGROUND) {
      links.links[
        'graphql'
      ] = `${configService.APPLICATION_HOST}${configService.GRAPHQL.ROUTE}`;
    }
    return {
      name: configService.APP.NAME,
      version: configService.APP.VERSION,
      environment: configService.APP.ENVIRONMENT,
      description: configService.APP.DESCRIPTION,
      ...links,
    };
  }
}
