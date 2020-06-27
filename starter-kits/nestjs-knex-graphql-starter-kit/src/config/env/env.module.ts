import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EnvService } from './env.service';

const EnvFactory = {
  provide: EnvService,
  useFactory: () => {
    dotenv.config();
    const env = new EnvService();
    env.load();
    return env;
  },
};

@Module({
  imports: [],
  controllers: [],
  providers: [EnvFactory],
  exports: [EnvFactory],
})
export class EnvModule {}
