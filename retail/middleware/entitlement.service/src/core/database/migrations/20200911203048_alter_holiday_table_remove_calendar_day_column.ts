import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.HOLIDAY, table =>  {
    table.dropIndex(['calendar_day'], 'holiday_calendar_day_index');
    table.dropIndex(['holiday_type'], 'holiday_holiday_type_index');
    table.dropIndex(['is_repetitive'], 'holiday_is_repetitive_index');

    table.dropColumn('calendar_day');
    table.dropColumn('is_repetitive');
    table.dropColumn('holiday_type');
    table.dropColumn('holiday_details');

    table.timestamp('holiday_date');
    table.string('holiday_description');

    table.index(['holiday_date'], 'holiday_holiday_date_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.HOLIDAY, table =>  {
    table.string('calendar_day');
    table.string('holiday_type');
    table.string('holiday_details');
    table.integer('is_repetitive');

    table.index(['calendar_day'], 'holiday_calendar_day_index');
    table.index(['holiday_type'], 'holiday_holiday_type_index');
    table.index(['is_repetitive'], 'holiday_is_repetitive_index');

    table.dropIndex(['holiday_date'], 'holiday_holiday_date_index');

    table.dropColumn('holiday_date');
    table.dropColumn('holiday_description');
  });
}
