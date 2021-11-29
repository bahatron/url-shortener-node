import { Link } from "../interfaces/link.interface";
import { $postgres } from "./postgres";

export const LINK_TABLE = "links";

export const $links = {
    knex: (session = $postgres) => session.table<Link>(LINK_TABLE),
};
