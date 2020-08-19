import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";

@Injectable()
export class WorkingDaysRepository extends BaseRepository {
  constructor() {
    super(TABLE.WORKING_WEEK);
  }
}
