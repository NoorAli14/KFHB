import { NestFactory } from '@nestjs/core';
import * as cluster from 'cluster';
import * as os from 'os';
import Server from '@core/server';
import NativeEvent from '@core/native.event';
import { AppModule } from '@app/app.module';
if (cluster.isMaster) {
  /**
   * Catches the process events
   */
  NativeEvent.process();

  /**
   * Clear the console before the app runs
   */
  Server.clearConsole();

  /**
   * Find the number of available CPUS
   */
  const CPUS: any = os.cpus();

  /**
   * Fork the process, the number of times we have CPUs available
   */
  CPUS.forEach(() => cluster.fork());

  /**
   * Catches the cluster events
   */
  NativeEvent.cluster(cluster);
} else {
  //Server.setup();
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const server = new Server(app);
    server.init();
  }
  bootstrap();
}
