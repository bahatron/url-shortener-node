import { Knex } from "knex";
import { LINK_TABLE } from "../services/link.repository";

export async function up(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {
        await trx.schema.createTable(LINK_TABLE, (table) => {
            table.string("originalUrl").primary();
            table.string("shortenedUrl");

            table.index("shortenedUrl");
        });
    });
}

export async function down(knex: Knex): Promise<void> {}
