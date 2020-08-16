import * as DataLoader from 'dataloader';
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { OptionsService } from "../../app/v1/options/options.service";
import { OptionGQL } from "../../app/v1/options/option.model";

@Injectable()
export class OptionLoader implements NestDataLoader<string, OptionGQL> {
  constructor(private readonly optionsService: OptionsService) {}

  generateDataLoader(): DataLoader<string, OptionGQL> {
    return new DataLoader<string, OptionGQL>(keys =>
      this.optionsService.findByQuestionId(keys)
    );
  }
}