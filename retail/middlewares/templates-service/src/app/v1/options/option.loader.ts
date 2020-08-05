import DataLoader = require("dataloader");
import { Injectable } from "@nestjs/common";
import { NestDataLoader } from 'nestjs-dataloader';
import { OptionsService } from "./options.service";
import { OptionGQL } from "./option.model";

@Injectable()
export class OptionLoader implements NestDataLoader<string, OptionGQL> {
  constructor(private readonly optionsService: OptionsService) {}

  generateDataLoader(): DataLoader<string, OptionGQL> {
    return new DataLoader<string, OptionGQL>(keys =>
      this.optionsService.findByIds(keys)
    );
  }
}