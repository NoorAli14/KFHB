import { HttpException } from '@nestjs/common';
export class BaseException extends HttpException {
  constructor(status: number, error?: { [key: string]: string }) {
    super(error, status);
  }
}
