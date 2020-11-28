import * as Bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Encrypter {
  private saltRounds: any;

  constructor() {
    this.saltRounds = Bcrypt.genSaltSync(10);
  }

  encryptPassword(password: string): string {
    return Bcrypt.hashSync(password, this.saltRounds);
  }

  comparePassword(password: string, hash: string): boolean {
    return Bcrypt.compareSync(password, hash);
  }
}
