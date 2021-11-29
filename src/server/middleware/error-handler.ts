import { Exception } from "@bahatron/utils/lib/error";
import { ErrorRequestHandler } from "express";
import { $logger } from "../../utils/logger";

export const errorHandler: ErrorRequestHandler = (
    err: Exception,
    req,
    res,
    next,
) => {
    let code = isNaN(parseInt(err.code as string))
        ? 500
        : parseInt(err.code as string);

    if (code >= 500) {
        $logger.error(err);
    } else {
        $logger.warning(err, "request failed");
    }

    return res
        .status(code)
        .json({ error: err.message, context: err.context ?? err });
};
