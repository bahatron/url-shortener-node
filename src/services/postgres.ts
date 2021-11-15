import knex, { Knex } from "knex";
import { resolve } from "path";

export const CONFIG: Knex.Config = {
    client: "pg",
    connection: {
        host: "postgres",
        port: 5432,
        user: "admin",
        password: "secret",
        database: "postgres",
    },
    migrations: {
        tableName: "migrations",
        directory: resolve(__dirname, "../migrations"),
        extension: "ts",
    },
};

export const $postgres = knex(CONFIG);
