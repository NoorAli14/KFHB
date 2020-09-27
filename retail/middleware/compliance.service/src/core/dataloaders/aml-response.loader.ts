import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { AmlResponseRepository } from '@core/repository';
import { AmlResponse } from '../../app/v1/aml-response/aml-response-model';

@Injectable()
export class AmlResponseLoader implements NestDataLoader<string, AmlResponse> {
  constructor(private readonly amlResponseDB: AmlResponseRepository) {}

  generateDataLoader(): DataLoader<string, AmlResponse> {
    return new DataLoader<string, AmlResponse>(async (requestIds, columns) =>
      this.amlResponseDB.findByRequestId(requestIds, columns),
    );
  }
}
