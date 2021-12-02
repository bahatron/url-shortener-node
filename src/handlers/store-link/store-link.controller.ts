import { asyncRoute } from "../../server/middleware/async-route";
import { $error } from "../../utils/error";
import { $validator } from "../../utils/validator";
import StoreLinkRequest from "./store-link.request.schema";

import { $links } from "../../services/link.repository";
import { $logger } from "../../utils/logger";
import { randomString } from "../../utils/random-string";

export const storeLinkController = asyncRoute(async (req, res) => {
    let errors = $validator.json(req.body, StoreLinkRequest);

    if (errors.length) {
        throw $error.BadRequest(`Invalid request payload`, { errors });
    }

    return res.json(await storeLink(req.body?.url));
});

export async function storeLink(originalUrl: string): Promise<string> {
    let record = await $links.knex().where({ originalUrl }).first();

    if (record) {
        return record.shortenedUrl;
    }

    let shortenedUrl = randomString();

    await $links.knex().insert({ originalUrl, shortenedUrl });

    $logger.debug({ originalUrl, shortenedUrl }, `link created`);

    return shortenedUrl;
}
