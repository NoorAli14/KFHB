import {
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { KnexFactory } from './knex.factory';
import { EnvService } from 'src/config/env/env.service';
@Module({
  imports: [],
  providers: [EnvService],
})
export class DatabaseModule
  implements OnApplicationBootstrap, OnApplicationShutdown {
  private connection: any;
  constructor(private readonly configService: EnvService) {}
  async onApplicationBootstrap() {
    try {
      const config = this.configService.get();
      const instance: KnexFactory = KnexFactory.getInstance(config.DATABASE);
      this.connection = instance.initConnection();
      await this.connection.raw(instance.getSQL());
      console.log(
        `Successful connected with ${config.DATABASE.DIALECT} database.`,
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async onApplicationShutdown() {
    await this.connection.destroy();
  }
}
