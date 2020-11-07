import {
  ArgumentsHost,
  Catch,
  HttpException,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
// @Catch(HttpExceptionFilter)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(error: HttpException | any, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = error.getStatus();

//     if (status === HttpStatus.UNAUTHORIZED) {
//       if (typeof error.response !== 'string') {
//         error.response['message'] =
//           error.response.message ||
//           'You do not have permission to access this resource';
//       }
//     }
//     response.status(status).json({
//       statusCode: status,
//       error: error.response.name || error.name,
//       message: error.response.message || error.message,
//       errors: error.response.errors || null,
//       timestamp: new Date().toISOString(),
//       path: request ? request.url : null,
//     });
//   }
// }

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
