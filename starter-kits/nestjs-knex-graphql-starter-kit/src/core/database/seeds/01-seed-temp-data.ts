import * as Knex from "knex";
import * as Faker from "faker";
import { TABLE } from '@common/constants';
const TOTAL_ENTERIES = 10;
export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    //  await knex(TABLE.USER).del();
     for (let i = 0; i < 1000; i++) {
       const [user_id] = await knex(TABLE.USER).insert({first_name: Faker.name.firstName(), last_name: Faker.name.lastName(), email: Faker.internet.email(), password: Faker.internet.password()}, ['id'])
       for (let j = 0; j < TOTAL_ENTERIES; j++) {
            const [post_id] = await knex(TABLE.POST).insert({user_id: user_id, description: Faker.lorem.text(), }, ['id']);
            for (let k = 0; k < TOTAL_ENTERIES; k++) {
                await knex(TABLE.COMMENT).insert({post_id: post_id, message: Faker.lorem.text(), }, ['id'])
            }
        }
    }
    return knex(TABLE.USER).select(['id']);
};
