import { asyncRoute } from "../../server/middleware/async-route";
import { $links } from "../../services/link.repository";
import { $error } from "../../utils/error";

export const redirectToOriginalUrlController = asyncRoute(async (req, res) => {
    let shortenedUrl = req.params.shortenedUrl;

    let link = await $links.knex().where({ shortenedUrl }).first();

    if (!link) {
        throw $error.NotFound(`url not found`);
    }

    return res.status(301).header({ Location: link.originalUrl }).send();
});
