export interface ICreateWorkingDayInput {
  created_by: string;
  updated_by: string;
  week_day: string;
  full_day?: number;
  start_time_local?: string;
  end_time_local?: string;
  tenant_id: string;
  remarks?: string;
}
