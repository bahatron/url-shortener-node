import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx.schema.createTable("links", (table) => {
            table.string("originalUrl");
            table.string("shortenedUrl");

            table.primary(["originalUrl", "shortenedUrl"]);
        });
    });
}

export async function down(knex: Knex): Promise<void> {}
