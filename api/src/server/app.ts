import express from "express";
import { errorHandler } from "./middleware/error-handler";
import { setRequestContextMiddleware } from "./middleware/request-context";
import { requestLogger } from "./middleware/request-logger";
import { router } from "./router";
import cors from "cors";

export function Server() {
    const app = express();

    // pre router middleware
    app.use(cors());
    app.use(setRequestContextMiddleware);
    app.use(requestLogger);

    // routes
    app.use(router);

    // error handler
    app.use(errorHandler);

    return app;
}
