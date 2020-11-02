import { Injectable } from '@nestjs/common';

import { KeyValInput } from '@common/inputs/key-val.input';
import { HolidayRepository } from '@core/repository/holiday.repository';
import { ICurrentUser } from '@common/interfaces';
import { HolidayInput } from '@app/v1/holiday/holiday.dto';
import { Holiday, HolidaysWithPagination } from '@app/v1/holiday/holiday.model';
import { STATUS } from '@common/constants';
import { PaginationParams, SortingParam } from '@common/dtos';
import { CreatedOnStartShouldBeLessThanEndException } from '@common/exceptions';
import { HolidaysFilterParams } from '@app/v1/holiday/dtos';

@Injectable()
export class HolidaysService {
  constructor(private holidayRepository: HolidayRepository) {}

  async list(
    current_user: ICurrentUser,
    paginationParams: PaginationParams,
    filteringParams: HolidaysFilterParams,
    sortingParams: SortingParam,
    output: string[],
  ): Promise<HolidaysWithPagination> {
    if (
      filteringParams?.created_on &&
      new Date(filteringParams?.created_on.start).getTime() >
        new Date(filteringParams?.created_on.end).getTime()
    ) {
      throw new CreatedOnStartShouldBeLessThanEndException(
        filteringParams?.created_on.start,
        filteringParams?.created_on.end,
      );
    }
    return this.holidayRepository.list(
      paginationParams,
      filteringParams,
      sortingParams,
      { deleted_on: null, tenant_id: current_user.tenant_id },
      output,
    );
  }

  async findById(
    current_user: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<Holiday> {
    return this.holidayRepository.findOne(
      { id: id, deleted_on: null, tenant_id: current_user.tenant_id },
      output,
    );
  }

  async findByProperty(
    current_user: ICurrentUser,
    checks: KeyValInput[],
    output?: string[],
  ): Promise<Holiday[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.holidayRepository.findBy(conditions, output);
  }

  async update(
    current_user: ICurrentUser,
    id: string,
    input: HolidayInput,
    output?: string[],
  ): Promise<Holiday> {
    const [result] = await this.holidayRepository.update(
      { id: id, deleted_on: null, tenant_id: current_user.tenant_id },
      { ...input, ...{ updated_by: current_user.id } },
      output,
    );
    return result;
  }

  async create(
    currentUser: ICurrentUser,
    input: HolidayInput,
    output?: string[],
  ): Promise<Holiday> {
    const [result] = await this.holidayRepository.create(
      {
        ...input,
        ...{
          tenant_id: currentUser.tenant_id,
          created_by: currentUser.id,
          updated_by: currentUser.id,
        },
      },
      output,
    );
    return result;
  }

  async delete(current_user: ICurrentUser, id: string): Promise<any> {
    const result = await this.holidayRepository.markAsDelete(
      current_user.tenant_id,
      current_user.id,
      id,
    );
    return !!result;
  }

  async isHoliday(tenant_id: string, date: string): Promise<boolean> {
    const conditions = {
      tenant_id: tenant_id,
      holiday_date: date,
      status: STATUS.ACTIVE,
      deleted_on: null,
    };
    const holidays: Holiday[] = await this.holidayRepository.findBy(
      conditions,
      ['id', 'holiday_date'],
    );
    return !!holidays?.length;
  }
}
