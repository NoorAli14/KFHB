import {
  Injectable,
  HttpService,
  HttpException,
  RequestTimeoutException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { map, timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { HttpHeaders } from '@core/context';

@Injectable()
export class GqlClientService {
  private readonly logger: Logger = new Logger(GqlClientService.name);
  constructor(private readonly http: HttpService) {}

  public async send(input: string): Promise<any> {
    this.logger.log(
      `Current Context Headers: ${JSON.stringify(HttpHeaders(), null, 2)}`,
    );

    return this.http
      .post(
        '/graphql',
        {
          query: input,
        },
        {
          headers: HttpHeaders() || {},
          //   transformRequest: [
          //     function(data, headers) {
          //       // Do whatever you want to transform the data
          //       this.logger.log(headers);
          //       this.logger.log(data);
          //       return data;
          //     },
          //   ],
        },
      )
      .pipe(
        map(response => {
          if (response.data?.errors) {
            const err: any = response.data?.errors[0].extensions;
            if (err.exception?.response) {
              return throwError(
                new HttpException(
                  err.exception?.error,
                  err.exception?.response.status,
                ),
              );
            }
            this.logger.log(
              `GQL Response Error: ${JSON.stringify(err, null, 2)}`,
            );
            return throwError(err.exception);
          }
          this.logger.log(
            `GQL Response: ${JSON.stringify(response.data, null, 2)}`,
          );
          return response.data?.data?.result || response.data?.data;
        }),
        timeout(5000),
        catchError(err => {
          this.logger.log(`GQL Error: ${JSON.stringify(err, null, 2)}`);
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(new BadRequestException(err));
        }),
      )
      .toPromise();
  }
}
