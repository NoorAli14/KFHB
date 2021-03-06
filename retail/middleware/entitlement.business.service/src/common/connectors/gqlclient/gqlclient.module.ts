import { HttpService, Logger, Module, OnModuleInit, HttpModule as BaseHttpModule } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { GqlClientService } from './gqlclient.service';

@Module({
  imports: [
    BaseHttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async () => {
        return {
          timeout: 5000,
          maxRedirects: 4
        };
      },
    }),
  ],
  providers: [GqlClientService],
  exports: [GqlClientService, BaseHttpModule],
})
export class GqlClientModule { }


@Module({
  imports: [
    // I prefer temporarily aliasing the homonymous module rather than naming my module MyHttpModule
    BaseHttpModule,
  ],
  exports: [
    BaseHttpModule, GqlClientService
  ],
})
export class Htp implements OnModuleInit {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  public onModuleInit(): any {
    const logger = new Logger('Axios');

    // Add request interceptor and response interceptor to log request infos
    const axios = this.httpService.axiosRef;
    axios.interceptors.request.use(function (config) {
      // Please don't tell my Typescript compiler...
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();

        // Log some request infos (you can actually extract a lot more if you want: the content type, the content size, etc.)
        logger.log(`${config.method.toUpperCase()} ${config.url} ${duration}ms`);

        return response;
      },
      (err) => {
        logger.error(err);

        // Don't forget this line like I did at first: it makes your failed HTTP requests resolve with "undefined" :-(
        return Promise.reject(err);
      });
  }
}