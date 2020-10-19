import { HttpException } from '@nestjs/common';
export class BaseException extends HttpException {
  constructor(status: number, error?: string | any) {
    super(error, status);
  }
}
