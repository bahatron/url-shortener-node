import { Request, RequestHandler, Response } from "express";

export function asyncRoute(
    controller: (req: Request, res: Response) => void,
): RequestHandler {
    return (req, res, next) => {
        Promise.resolve(controller(req, res))
            .then(() => next())
            .catch(next);
    };
}
