import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { setupSwagger } from './swagger';
import { ApplicationModule } from '@app/index';
async function onStartUp(Config) {
  Logger.log(``);
  Logger.log(
    `Application start listing on ${Config.APP.APPLICATION_HOST}${Config.APP.API_URL_PREFIX}`,
  );
  Logger.log(``);
  Logger.log('-------------------------------------------------------');
  Logger.log(`Environment  : ${Config.APP.ENVIRONMENT}`);
  Logger.log(
    `Database     : ${Config.DATABASE.DIALECT}://${Config.DATABASE.USERNAME}:<password>@${Config.DATABASE.HOST}/${Config.DATABASE.DB_NAME}`,
  );
  Logger.log(`Version      : ${Config.APP.VERSION}`);
  // this.log.debug(``);
  // if (Environment.isTruthy(process.env.API_INFO_ENABLED)) {
  //     this.log.debug(`API Info     : ${app.get('host')}:${app.get('port')}${ApiInfo.getRoute()}`);
  // }
  if (Config.IS_SWAGGER_ENABLED) {
    Logger.log(
      `Swagger      : ${Config.APP.APPLICATION_HOST}${Config.SWAGGER.ROUTE}`,
    );
  }
  // if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
  //     this.log.debug(`Monitor      : ${app.get('host')}:${app.get('port')}${ApiMonitor.getRoute()}`);
  // }
  Logger.log('-------------------------------------------------------');
  Logger.log(`To shut it down, press <CTRL> + C at any time.`);
  Logger.log('');
}
export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(ApplicationModule);
  const config: ConfigurationService = app
    .select(CommonModule)
    .get(ConfigurationService);

  if (config.IS_SWAGGER_ENABLED) {
    setupSwagger(app);
  }
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.listen(config.APP.PORT, '0.0.0.0', () => {
    onStartUp(config);
  });
  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', err => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
  return app;
}
