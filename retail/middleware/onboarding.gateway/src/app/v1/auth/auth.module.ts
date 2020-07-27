import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from '@common/common.module';
import { ServiceRegistry } from '@common/service.registry';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (serviceRegistry: ServiceRegistry) =>
        serviceRegistry.get('CUSTOMER'),
      inject: [ServiceRegistry],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthController],
})
export class AuthModule {}
