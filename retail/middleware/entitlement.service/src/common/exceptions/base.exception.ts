import { HttpException } from '@nestjs/common';
interface IError {
  name: string;
  message: string;
  developerMessage?: string;
}
export class BaseException extends HttpException {
  constructor(status: number, error?: IError) {
    super(Array.isArray(error) ? error : [error], status);
    this.name = error.name;
  }
}
