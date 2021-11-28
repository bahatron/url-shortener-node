import knex, { Knex } from "knex";
import { resolve } from "path";

export const CONFIG: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || ""),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
    migrations: {
        tableName: "migrations",
        directory: resolve(__dirname, "../migrations"),
        extension: "ts",
    },
};

export const $postgres = knex(CONFIG);
