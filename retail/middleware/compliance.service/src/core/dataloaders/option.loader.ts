import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { OptionsService } from '../../app/v1/options/options.service';
import { Option } from '../../app/v1/options/option.model';

@Injectable()
export class OptionLoaderForQuestion implements NestDataLoader<string, Option> {
  constructor(private readonly optionsService: OptionsService) {}

  generateDataLoader(): DataLoader<string, Option> {
    return new DataLoader<string, Option>((keys, columns) =>
      this.optionsService.findByQuestionId(keys, columns),
    );
  }
}
