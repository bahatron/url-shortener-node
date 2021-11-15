import express from "express";

export function Server() {
    const app = express();

    app.get("/ping", (req, res) => res.json("pong"));

    return app;
}
