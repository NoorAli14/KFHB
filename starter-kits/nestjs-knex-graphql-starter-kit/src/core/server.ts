import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { ApplicationModule } from '@app/';
import { CommonModule } from '@common/common.module';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { KernelMiddleware } from '@core/middlewares/';
class Server {
  private _app: INestApplication;
  private _config: ConfigurationService;

  constructor(app: INestApplication) {
    this._app = app;
    this.mountConfig();
    this.mountMiddlewares();
  }
  get app() {
    return this._app;
  }
  get Config() {
    return this._config;
  }

  private mountConfig(): void {
    this._config = this.app.select(CommonModule).get(ConfigurationService);
  }

  /**
   * Mounts all the defined middlewares
   */
  private mountMiddlewares(): void {
    this._app = KernelMiddleware.init(this.app, this.Config);
  }

  /**
   * Starts the express server
   */
  public async init(): Promise<INestApplication> {
    const PORT: number = this.Config.APP.PORT;

    // Registering Hooks, logger, validators, pipes and Exception / Error Handlers
    this.app.enableShutdownHooks();
    this.app.useGlobalInterceptors(new LoggingInterceptor());
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useGlobalPipes(new ValidationPipe());

    // Start the server on the specified port
    this.app.listen(PORT, () => {
      this.onStartUp();
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error(reason);
      console.log(promise);
    });

    process.on('uncaughtException', err => {
      console.error(err);
    });

    process.on('SIGTERM', async () => {
      await this.app.close();
      process.exit(0);
    });
    return this.app;
  }

  /**
   * Setup the Nest Factory
   */
  public static async setup(): Promise<INestApplication> {
    const app = await NestFactory.create(ApplicationModule);
    const server = new Server(app);
    return server.init();
  }

  /**
   * Print stats on startup
   */
  private onStartUp(): void {
    Logger.log(``);
    Logger.log(
      `Application start listing on ${this.Config.APP.HOST}${this.Config.APP.API_URL_PREFIX}`,
    );
    Logger.log(``);
    Logger.log('-------------------------------------------------------');
    Logger.log(`Environment  : ${this.Config.APP.ENVIRONMENT}`);
    Logger.log(
      `Database     : ${this.Config.DATABASE.DIALECT}://${this.Config.DATABASE.USERNAME}:<password>@${this.Config.DATABASE.HOST}/${this.Config.DATABASE.DB_NAME}`,
    );
    Logger.log(`Version      : ${this.Config.APP.VERSION}`);
    // this.log.debug(``);
    // if (Environment.isTruthy(process.env.API_INFO_ENABLED)) {
    //     this.log.debug(`API Info     : ${app.get('host')}:${app.get('port')}${ApiInfo.getRoute()}`);
    // }
    if (this.Config.IS_SWAGGER_ENABLED) {
      Logger.log(
        `Swagger      : ${this.Config.APP.HOST}${this.Config.SWAGGER.ROUTE}`,
      );
    }
    // if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
    //     this.log.debug(`Monitor      : ${app.get('host')}:${app.get('port')}${ApiMonitor.getRoute()}`);
    // }
    Logger.log('-------------------------------------------------------');
    Logger.log(`To shut it down, press <CTRL> + C at any time.`);
    Logger.log('');
  }
}
export default Server;
