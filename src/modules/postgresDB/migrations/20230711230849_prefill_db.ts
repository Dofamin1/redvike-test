import { Knex } from 'knex';
//just for testing purposes;
export async function up(knex: Knex): Promise<void> {
  await knex('user').insert({ name: 'Orange' });

  await knex('amenity').insert({ name: 'Gym' });

  await knex('reservation').insert({ amenity_id: 1, user_id: 1, start_time: 100, end_time: 200, date: 1593648000000 });
}

export async function down(knex: Knex): Promise<void> {
  await knex('user').truncate();
  await knex('amenity').truncate();
  await knex('reservation').truncate();
}
