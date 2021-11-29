import { RunInContext } from "@bahatron/utils/lib/context";
import { randomUUID } from "crypto";
import { RequestHandler } from "express";

export const setRequestContextMiddleware: RequestHandler = (req, nes, next) => {
    RunInContext(() => next(), {
        requestId: req.headers["x-request-id"]?.toString() || randomUUID(),
    });
};
