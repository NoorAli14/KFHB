import * as Knex from "knex";
import {TABLE} from "@common/constants";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.LEAVE, table =>  {
    table.dropIndex(['calendar_day'], 'leave_calendar_day_index');
    table.dropIndex(['holiday_type'], 'leave_holiday_type_index');

    table.dropColumn('calendar_day');
    table.dropColumn('holiday_type');
    table.dropColumn('holiday_details');

    table.timestamp('leave_date');
    table.string('leave_duration');
    table.string('leave_type');
    table.uuid('leave_type_id');

    table.foreign('leave_type_id').references(`${TABLE.LEAVE_TYPE}.id`).onDelete('CASCADE');

    table.index(['leave_date'], 'leave_leave_date_index');
    table.index(['leave_type'], 'leave_leave_type_index');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table(TABLE.LEAVE, table =>  {
    table.string('calendar_day');
    table.string('holiday_type');
    table.string('holiday_details');

    table.index(['calendar_day'], 'leave_calendar_day_index');
    table.index(['holiday_type'], 'leave_holiday_type_index');

    table.dropForeign(['leave_type_id']);

    table.dropIndex(['leave_date'], 'leave_leave_date_index');
    table.dropIndex(['leave_type'], 'leave_leave_type_index');

    table.dropColumn('leave_date');
    table.dropColumn('leave_duration');
    table.dropColumn('leave_type');
    table.dropColumn('leave_type_id');


  });
}
