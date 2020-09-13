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
import { IHEADER } from '@common/interfaces/';
@Injectable()
export class GqlClientService {
  private readonly logger: Logger = new Logger(GqlClientService.name);
  private __header: IHEADER;
  constructor(private readonly http: HttpService) {}

  public setHeaders(header: IHEADER): GqlClientService {
    this.__header = header;
    return this;
  }
  public async send(input: string): Promise<any> {
    return this.http
      .post(
        '/graphql',
        {
          query: input,
        },
        { headers: this.__header || {} },
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
