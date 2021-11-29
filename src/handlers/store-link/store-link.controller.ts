import { asyncRoute } from "../../server/middleware/async-route";
import { $error } from "../../utils/error";
import { $validator } from "../../utils/validator";
import { storeLink } from "./store-link";
import StoreLinkRequest from "./store-link.request.schema";

export const storeLinkController = asyncRoute(async (req, res) => {
    let errors = $validator.json(req.body, StoreLinkRequest);

    if (errors.length) {
        throw $error.BadRequest(`Invalid request payload`, { errors });
    }

    return res.json(await storeLink(req.body?.url));
});
