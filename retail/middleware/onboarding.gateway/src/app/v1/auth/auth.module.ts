import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from '@common/common.module';
import { ConfigurationService } from '@common/configuration/configuration.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigurationService) => ({
        baseURL: 'http://localhost:4000',
        timeout: 5000,
        maxRedirects: 5,
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthController],
})
export class AuthModule {}
