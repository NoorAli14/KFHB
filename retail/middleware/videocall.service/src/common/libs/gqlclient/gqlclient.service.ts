import {
  Injectable,
  HttpService,
  RequestTimeoutException,
} from '@nestjs/common';
import { map, timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { HttpHeaders } from '@core/context';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Injectable()
export class GqlClientService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigurationService,
  ) {}
  private __baseUrl: string;

  public client(serviceName: string): GqlClientService {
    this.__baseUrl = `${this.configService.get(serviceName)}/graphql`;
    return this;
  }

  public async send(input: string): Promise<any> {
    const params = {
      query: input,
    };
    return this.http
      .post(this.__baseUrl, params, { headers: HttpHeaders() })
      .pipe(
        map(response => response.data?.data?.result),
        timeout(5000),
        catchError(err => {
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
