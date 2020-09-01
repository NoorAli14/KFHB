import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";

@Injectable()
export class HolidayRepository extends BaseRepository {
  constructor() {
    super(TABLE.HOLIDAY);
  }
}
