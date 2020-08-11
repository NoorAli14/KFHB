import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';

@Module({
  imports: [],
  controllers: [EvaluationController],
  providers: [EvaluationController],
})
export class EvaluationModule {}
