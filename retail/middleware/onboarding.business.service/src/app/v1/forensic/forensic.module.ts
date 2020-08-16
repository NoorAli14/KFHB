import { Module } from '@nestjs/common';
import { ForensicController } from './forensic.controller';

@Module({
  imports: [],
  controllers: [ForensicController],
  providers: [ForensicController],
})
export class ForensicModule {}
