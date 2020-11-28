import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    GqlArgumentsHost.create(host);
    if (Array.isArray(exception['response'])) {
      exception['response'].map(validationError => {
        const property: string = validationError['property'];
        if (property?.includes('_')) {
          const constraints = validationError['constraints'];
          Object.keys(constraints).map(function (constraintKey) {
            constraints[constraintKey] = constraints[constraintKey].replace('_', ' ');
          });
        }
      });
    }
    return exception;
  }
}