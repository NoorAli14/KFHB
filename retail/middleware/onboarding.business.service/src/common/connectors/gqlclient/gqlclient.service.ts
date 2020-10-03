import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { map, timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { HttpHeaders } from '@core/context';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Injectable()
export class GqlClientService {
  private readonly logger: Logger = new Logger(GqlClientService.name);
  constructor(private readonly http: HttpService, private readonly config: ConfigurationService) { }

  public async send(input: string): Promise<any> {
    this.logger.log(
      `Current Context Headers: ${JSON.stringify(HttpHeaders(), null, 2)}`,
    );

    return this.http
      .post(
        `http://localhost:${this.config.APP.PORT}/graphql`,
        {
          query: input,
        },
        {
          headers: HttpHeaders() || {},
        },
      )
      .pipe(
        map(response => {
          if (response.data?.errors) {
            this.logger.log(
              `GQL Error: ${JSON.stringify(response.data.errors, null, 2)}`,
            );
            const err: any = response.data?.errors[0].extensions;
            let __err: any = { message: err.exception.message, stacktrace: err.exception?.stacktrace };
            if (err.exception?.response) {
              __err = { message: err.exception?.response.message || err.exception?.message, error: err.exception.response.error };
              if (process.env.NODE_ENV != 'production') {
                __err['context'] = {
                  serviceName: err?.serviceName,
                  developerMessage: err?.query
                };
              }
            }
            throw new HttpException(
              __err,
              err.exception?.response?.status || err.exception?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
            // return throwError(err.exception);
          }
          return response.data?.data?.result || response.data?.data;
        }),
        timeout(5000),
        catchError(err => {
          this.logger.log(`GQL Error: ${JSON.stringify(err, null, 2)}`);
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
