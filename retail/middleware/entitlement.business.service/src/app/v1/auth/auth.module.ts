import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '@app/v1/users/users.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService],
})
export class AuthModule {}
