import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('amenity', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('reservation', (table) => {
    table.increments('id').primary();
    table.integer('amenity_id').references('id').inTable('amenity').onDelete('cascade').notNullable();
    table.integer('user_id').references('id').inTable('user').onDelete('cascade').notNullable();

    table.integer('start_time').notNullable();
    table.integer('end_time').notNullable();
    table.bigint('date').notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('amenity');
  await knex.schema.dropTable('reservation');
  await knex.schema.dropTable('user');
}
