import * as Knex from 'knex';
import { TABLE, GENDER, APPOINTMENT_STATUS } from '@common/constants';
import { uuidV4 } from '@common/utilities';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE.APPOINTMENT).del();

  const base_time = new Date();

  const appointments = [
    {
      id: uuidV4(),
      call_time: new Date(base_time.getTime() + 2 * 60 * 60 * 1000),
      gender: GENDER.MALE,
      status: APPOINTMENT_STATUS.SCHEDULED,
    },
    {
      id: uuidV4(),
      call_time: new Date(base_time.getTime() + 3 * 60 * 60 * 1000),
      gender: GENDER.FEMALE,
      status: APPOINTMENT_STATUS.SCHEDULED,
    },
    {
      id: uuidV4(),
      call_time: new Date(base_time.getTime() + 4 * 60 * 60 * 1000),
      gender: GENDER.MALE,
      status: APPOINTMENT_STATUS.SCHEDULED,
    },
    {
      id: uuidV4(),
      call_time: new Date(base_time.getTime() + 5 * 60 * 60 * 1000),
      gender: GENDER.FEMALE,
      status: APPOINTMENT_STATUS.SCHEDULED,
    },
  ];
  // Inserts seed entries
  await knex(TABLE.APPOINTMENT).insert(
    appointments.map(appointment => ({
      ...appointment,
      tenant_id: process.env.ENV_RBX_TENANT_ID,
      user_id: '7D55A5DB-739A-4B80-BD37-D3D30358D655',
    })),
  );
}
