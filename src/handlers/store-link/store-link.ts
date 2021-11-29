import { $links } from "../../services/link.repository";
import { $logger } from "../../utils/logger";
import { randomString } from "../../utils/random-string";

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
