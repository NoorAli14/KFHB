import DataLoader from '../../lib/dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { OptionsService } from '../../app/v1/options/options.service';
import { OptionGQL } from '../../app/v1/options/option.model';

@Injectable()
export class OptionLoaderForQuestion
  implements NestDataLoader<string, OptionGQL> {
  constructor(private readonly optionsService: OptionsService) {}

  generateDataLoader(): DataLoader<string, OptionGQL> {
    return new DataLoader<string, OptionGQL>((keys, columns) =>
      this.optionsService.findByQuestionId(keys, columns),
    );
  }
}
