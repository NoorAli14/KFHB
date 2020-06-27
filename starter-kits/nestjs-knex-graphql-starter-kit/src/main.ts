import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { EnvService } from './config/env/env.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function onStartUp(app, ENV) {
  Logger.log(``);
  Logger.log(
    `${ENV.APP.NAME}, your app is ready on http://localhost:${ENV.APP.PORT}${ENV.APP.API_URL_PREFIX}`,
  );
  Logger.log(``);
  Logger.log('-------------------------------------------------------');
  Logger.log(`Environment  : ${ENV.APP.ENV}`);
  Logger.log(
    `Database     : ${ENV.DATABASE.DIALECT}://${ENV.DATABASE.USERNAME}:<password>@${ENV.DATABASE.HOST}/${ENV.DATABASE.DB_NAME}`,
  );
  // this.log.debug(`Version      : ${Environment.getPkg().version}`);
  // this.log.debug(``);
  // if (Environment.isTruthy(process.env.API_INFO_ENABLED)) {
  //     this.log.debug(`API Info     : ${app.get('host')}:${app.get('port')}${ApiInfo.getRoute()}`);
  // }
  // if (Environment.isTruthy(process.env.SWAGGER_ENABLED)) {
  //     this.log.debug(`Swagger      : ${app.get('host')}:${app.get('port')}${SwaggerUI.getRoute()}`);
  // }
  // if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
  //     this.log.debug(`Monitor      : ${app.get('host')}:${app.get('port')}${ApiMonitor.getRoute()}`);
  // }
  Logger.log('-------------------------------------------------------');
  Logger.log(`To shut it down, press <CTRL> + C at any time.`);
  Logger.log('');
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const ENV: EnvService = app.get('EnvService');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.listen(ENV.get().APP.PORT, () => {
    onStartUp(app, ENV.get());
  });
}
bootstrap();
