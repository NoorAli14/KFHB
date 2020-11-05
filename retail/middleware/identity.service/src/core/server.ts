import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as bodyParser from 'body-parser';
import { INestApplication, ValidationPipe, Logger, ValidationError } from '@nestjs/common';
import { ApplicationModule } from '@rubix/app/index';
import { KernelMiddleware } from '@rubix/core/middlewares/index';
import {
  CommonModule,
  ConfigurationService,
  HttpExceptionFilter,
  LoggingInterceptor,
  ValidationException,
  ValidationExceptionFilter,
} from '@common/index';
class Server {
  private _app: INestApplication;
  private _config: ConfigurationService;

  constructor(app: INestApplication) {
    this._app = app;
    this.mountConfig();
    this.mountGlobals();
    this.mountMiddlewares();
  }
  get app(): INestApplication {
    return this._app;
  }
  get Config(): any {
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
    this._app.use(bodyParser.json({ limit: '50mb' }));
    this._app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  }

  /**
   * Mounts all the defined globals
   */
  private mountGlobals(): void {
    // Registering Hooks, logger, validators, pipes and Exception / Error Handlers
    this.app.enableShutdownHooks();
    this.app.useGlobalInterceptors(new LoggingInterceptor());
    this.app.useGlobalFilters(new HttpExceptionFilter(), new ValidationExceptionFilter());
    this.app.useGlobalPipes(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[] | any[]) => new ValidationException(errors)
    }));
    this.app.setGlobalPrefix(this.Config.APP.API_URL_PREFIX);
  }

  /** Microservices use the TCP transport layer by default and other options are:
   * Options: NATS, REDIS, gPRC, RabbitMQ, Kafka and MQTT
   */
  private get transporter(): any {
    return {
      transport: Transport.TCP,
    };
  }

  /**
   * Binds the app server with microservice transporter
   */
  private async connectMicroservice(): Promise<any> {
    this.app.connectMicroservice(this.transporter);
    await this.app.startAllMicroservicesAsync();
  }

  /**
   * Starts the express server
   */
  public async init(): Promise<INestApplication> {
    const PORT: number = this.Config.APP.PORT;
    // bind to microservices
    //await this.connectMicroservice();
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
      `Application start listing on ${this.Config.APPLICATION_HOST}/${this.Config.APP.API_URL_PREFIX}`,
    );
    Logger.log(``);
    Logger.log('-------------------------------------------------------');
    Logger.log(`Service      : ${this.Config.APP.NAME}`);
    Logger.log(`Environment  : ${this.Config.APP.ENVIRONMENT}`);
    Logger.log(`Version      : ${this.Config.APP.VERSION}`);
    Logger.log(
      `Database     : ${this.Config.DATABASE.DIALECT}://${this.Config.DATABASE.USERNAME}:<password>@${this.Config.DATABASE.HOST}/${this.Config.DATABASE.DB_NAME}`,
    );
    // this.log.debug(``);
    // if (Environment.isTruthy(process.env.API_INFO_ENABLED)) {
    //     this.log.debug(`API Info     : ${app.get('host')}:${app.get('port')}${ApiInfo.getRoute()}`);
    // }
    if (this.Config.IS_SWAGGER_ENABLED) {
      Logger.log(
        `Swagger      : ${this.Config.APPLICATION_HOST}${this.Config.SWAGGER.ROUTE}`,
      );
    }
    if (this.Config.GRAPHQL.PLAYGROUND) {
      Logger.log(
        `GraphQL      : ${this.Config.APPLICATION_HOST}${this.Config.GRAPHQL.ROUTE}`,
      );
    }
    Logger.log(`Health Check : ${this.Config.APPLICATION_HOST}/health`);
    // if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
    //     this.log.debug(`Monitor      : ${app.get('host')}:${app.get('port')}${ApiMonitor.getRoute()}`);
    // }
    Logger.log('-------------------------------------------------------');
    Logger.log(`To shut it down, press <CTRL> + C at any time.`);
    Logger.log('');
  }
}
export default Server;
